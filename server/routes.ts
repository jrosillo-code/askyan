import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { notifyFounders, confirmApplicant } from "./mail";
import { insertSubscriberSchema, insertContactSchema, insertPageViewSchema, insertAnalyticsEventSchema } from "../shared/schema";
import { z } from "zod";
import OpenAI from "openai";

// The concierge speaks the OpenAI wire protocol, but the provider is
// configurable — so it can run on the free tiers of Groq or Google Gemini
// (no card, no preloaded credits) through their OpenAI-compatible endpoints.
// Set AI_API_KEY and the provider is auto-detected from the key shape
// (gsk_… = Groq, AIza… = Gemini); override with AI_BASE_URL/AI_MODEL if
// needed. Lazy + guarded: with no key the server still boots and /api/chat
// degrades to a friendly 503.
let aiClient: OpenAI | null = null;
let aiModel = "gpt-4o-mini";
function getAI(): { client: OpenAI; model: string } | null {
  const apiKey =
    process.env.AI_API_KEY ?? process.env.OPENAI_API_KEY ?? process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
  if (!apiKey || apiKey === "_DUMMY_API_KEY_") return null;
  if (!aiClient) {
    let baseURL = process.env.AI_BASE_URL;
    let model = process.env.AI_MODEL;
    if (!baseURL && apiKey.startsWith("gsk_")) {
      baseURL = "https://api.groq.com/openai/v1";
      model ??= "llama-3.3-70b-versatile";
    } else if (!baseURL && apiKey.startsWith("AIza")) {
      baseURL = "https://generativelanguage.googleapis.com/v1beta/openai/";
      model ??= "gemini-2.0-flash";
    }
    aiClient = new OpenAI({ apiKey, baseURL: baseURL || undefined });
    aiModel = model ?? "gpt-4o-mini";
  }
  return { client: aiClient, model: aiModel };
}

// Admin-only reads (waitlist, contact messages, analytics) — these hold
// personal data and must never be public. Locked with ADMIN_SECRET: requests
// need an `x-admin-key` header (or ?key= for quick browser checks). With no
// ADMIN_SECRET configured they're locked entirely, never open by default.
function requireAdmin(req: { headers: Record<string, unknown>; query: Record<string, unknown> }, res: {
  status: (code: number) => { json: (body: unknown) => unknown };
}): boolean {
  const secret = process.env.ADMIN_SECRET;
  const provided = (req.headers["x-admin-key"] as string) ?? (req.query.key as string);
  if (!secret || !provided || provided !== secret) {
    res.status(secret ? 401 : 503).json({
      message: secret ? "Unauthorized" : "Admin access is not configured.",
    });
    return false;
  }
  return true;
}

// Tiny in-memory rate limiter (per serverless instance): enough to stop
// casual abuse of the write endpoints without any external dependency.
const hits = new Map<string, number[]>();
function rateLimit(req: { headers: Record<string, unknown> }, key: string, max: number, windowMs = 60_000): boolean {
  const ip = String(req.headers["x-forwarded-for"] ?? "local").split(",")[0].trim();
  const k = `${key}:${ip}`;
  const now = Date.now();
  const arr = (hits.get(k) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= max) return false;
  arr.push(now);
  hits.set(k, arr);
  if (hits.size > 5000) hits.clear(); // bound memory
  return true;
}

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});
const chatBodySchema = z.object({ messages: z.array(chatMessageSchema).min(1).max(20) });

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/subscribe", async (req, res) => {
    try {
      if (!rateLimit(req, "sub", 6)) return res.status(429).json({ message: "Too many attempts — try again in a minute." });
      if (typeof req.body?.email === "string") req.body.email = req.body.email.trim().toLowerCase();
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      if (existingSubscriber) {
        return res.status(400).json({ 
          message: "This email is already on our waitlist!" 
        });
      }
      
      const subscriber = await storage.createSubscriber(validatedData);
      notifyFounders("New waitlist signup — ASKYAN", { email: subscriber.email });
      res.status(201).json({ 
        message: "Successfully joined the waitlist!",
        subscriber: { id: subscriber.id, email: subscriber.email }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: error.errors[0]?.message || "Invalid email address" 
        });
      }
      res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  app.get("/api/subscribers", async (req, res) => {
    if (!requireAdmin(req as never, res)) return;
    try {
      const subscribers = await storage.getAllSubscribers();
      res.json({ subscribers, count: subscribers.length });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscribers" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      if (!rateLimit(req, "contact", 6)) return res.status(429).json({ message: "Too many attempts — try again in a minute." });
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContactSubmission(validatedData);
      notifyFounders(`New ${validatedData.inquiryType} message — ASKYAN`, {
        name: validatedData.name,
        email: validatedData.email,
        type: validatedData.inquiryType,
        message: validatedData.message,
      });
      if (validatedData.inquiryType === "expedition") {
        confirmApplicant(validatedData.email, validatedData.name);
      }
      res.status(201).json({ 
        message: "Your message has been sent! We'll be in touch soon.",
        contact: { id: contact.id }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: error.errors[0]?.message || "Invalid form data" 
        });
      }
      res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    if (!requireAdmin(req as never, res)) return;
    try {
      const contacts = await storage.getAllContactSubmissions();
      res.json({ contacts, count: contacts.length });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  app.post("/api/analytics/pageview", async (req, res) => {
    try {
      const validatedData = insertPageViewSchema.parse(req.body);
      await storage.createPageView(validatedData);
      res.status(201).json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data" });
      }
      res.status(500).json({ message: "Failed to track page view" });
    }
  });

  app.post("/api/analytics/event", async (req, res) => {
    try {
      const validatedData = insertAnalyticsEventSchema.parse(req.body);
      await storage.createAnalyticsEvent(validatedData);
      res.status(201).json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data" });
      }
      res.status(500).json({ message: "Failed to track event" });
    }
  });

  app.get("/api/analytics/summary", async (req, res) => {
    if (!requireAdmin(req as never, res)) return;
    try {
      const summary = await storage.getAnalyticsSummary();
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const ai = getAI();
      if (!ai) {
        return res.status(503).json({
          message: "The concierge is offline right now — please use the contact form.",
        });
      }
      if (!rateLimit(req, "chat", 12)) return res.status(429).json({ message: "The concierge needs a moment — try again shortly." });
      const { messages } = chatBodySchema.parse(req.body);

      const systemPrompt = `You are the ASKYAN Expeditions concierge. ASKYAN is a private media collective granting curated access to the unseen world — not a travel agency and not a booking site.

What is real today (never invent beyond this):
- Founding expeditions in development: The Steppe Awakening (Kazakhstan), The Celestial Mountains (Kyrgyzstan), The Gobi Crossing (Mongolia), The Thunder Dragon Path (Bhutan), plus concepts The Forbidden Kingdom and The Ring of Fire.
- "Cultural Scribes" are local guides who provide deep cultural understanding.
- The founding cohort is now forming; places are limited and allocated by application.
- No public prices or dates yet — if asked, say details are shared with accepted applicants.

Style: concise, warm, quietly confident; never salesy or breathless. Two short paragraphs at most. Guide interested visitors to request access via the form on the site.`;

      const completion = await ai.client.chat.completions.create({
        model: ai.model,
        max_tokens: 350,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-10),
        ],
      });

      res.json({ message: completion.choices[0].message.content });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ message: "Failed to get response" });
    }
  });

  return httpServer;
}

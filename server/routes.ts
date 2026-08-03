import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema, insertContactSchema, insertPageViewSchema, insertAnalyticsEventSchema } from "@shared/schema";
import { z } from "zod";
import OpenAI from "openai";

// On Replit this pointed at their internal AI proxy (localhost modelfarm with a
// dummy key) — that only exists on Replit. Off-platform, the chat concierge
// needs a real key: set OPENAI_API_KEY (the standard variable; base URL then
// defaults to api.openai.com). Lazy + guarded so the server boots fine and the
// rest of the site works even before a key is configured.
let openai: OpenAI | null = null;
function getOpenAI(): OpenAI | null {
  if (openai) return openai;
  const apiKey = process.env.OPENAI_API_KEY ?? process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
  if (!apiKey || apiKey === "_DUMMY_API_KEY_") return null;
  openai = new OpenAI({
    apiKey,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || undefined,
  });
  return openai;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      if (existingSubscriber) {
        return res.status(400).json({ 
          message: "This email is already on our waitlist!" 
        });
      }
      
      const subscriber = await storage.createSubscriber(validatedData);
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

  app.get("/api/subscribers", async (_req, res) => {
    try {
      const subscribers = await storage.getAllSubscribers();
      res.json({ subscribers, count: subscribers.length });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscribers" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContactSubmission(validatedData);
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

  app.get("/api/contacts", async (_req, res) => {
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

  app.get("/api/analytics/summary", async (_req, res) => {
    try {
      const summary = await storage.getAnalyticsSummary();
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const client = getOpenAI();
      if (!client) {
        return res.status(503).json({
          message: "The concierge is offline right now — please use the contact form.",
        });
      }
      const { messages } = req.body;

      const systemPrompt = `You are the ASKYAN Expeditions guide. ASKYAN is a private media collective that provides exclusive, transformative travel experiences. Key points:
- We are NOT a travel agency - we are a media collective granting access to the unseen world
- We connect intellectually curious individuals with authentic cultural experiences
- Our "Cultural Scribes" are local guides who provide deep cultural understanding
- We focus on emerging destinations and transformative experiences
- Currently accepting applications for our founding cohort
Keep responses concise and engaging. Encourage visitors to request access via the form on the site.`;

      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
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

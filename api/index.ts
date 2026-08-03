import express from "express";
import { createServer } from "http";
import { registerRoutes } from "../server/routes";

// Vercel serverless entry: the same Express app the standalone server runs,
// minus listen() and static serving (Vercel serves dist/public itself and
// routes /api/* here via vercel.json). registerRoutes takes an http.Server
// only to return it — the dummy one is never listened on.
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const ready = registerRoutes(createServer(app), app).then(() => {
  // Terminal JSON error handler — a thrown route error must never leak a
  // stack trace or hang the function.
  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("api error:", err);
    if (!res.headersSent) res.status(500).json({ message: "Internal error" });
  });
});

export default async function handler(req: unknown, res: unknown) {
  await ready;
  return (app as unknown as (req: unknown, res: unknown) => void)(req, res);
}

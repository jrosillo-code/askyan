# Askya Expeditions

"Curated Access to the Unseen World" — premium travel-brand teaser site with a
waitlist, contact form, built-in analytics, and an AI concierge.

Migrated from Replit (original build by @blazerevel with Replit Agent).

## Stack
- **Client**: React 18 + Vite, wouter, Tailwind, shadcn/Radix, framer-motion
- **Server**: Express (TypeScript, tsx in dev, esbuild bundle in prod)
- **Database**: Postgres via Drizzle ORM (`shared/schema.ts` — subscribers,
  contact_submissions, page_views, analytics_events, users[unused])
- **AI**: OpenAI chat completions for the concierge (`/api/chat`)

## Run
```bash
npm install
cp .env.example .env   # fill in DATABASE_URL at minimum
npm run db:push        # create tables in the database
npm run dev            # http://localhost:5000
```
`npm run build && npm start` for production.

## Deploy (Vercel)
The repo is Vercel-ready: `vercel.json` builds the client (`vite build` →
`dist/public`) and routes `/api/*` to the Express app running as a serverless
function (`api/index.ts`).

1. Vercel → Add New → Project → import `jrosillo-code/askyan` (defaults are
   read from vercel.json — change nothing).
2. Environment variables: `DATABASE_URL` (Supabase transaction-pooler URI) and
   `AI_API_KEY` (free Groq or Gemini key — see .env.example).
3. Deploy. Database tables: paste `supabase-setup.sql` into the Supabase SQL
   Editor once.

## Migration status (from Replit)
- Replit plugins/config removed; builds and typechecks clean off-platform.
- `attached_assets/` currently holds **branded placeholders** — the real
  images/videos (parked during export) must be dropped in over them, keeping
  the exact same filenames. Two runtime videos belong in `client/public/`:
  `films-popup-video.mp4`, `films-hero-video.mp4`.
- `DATABASE_URL` was Replit-injected and needs re-provisioning (plus a data
  export from the Replit database if the existing waitlist matters).
- The concierge runs on free OpenAI-compatible providers (Groq / Gemini) via
  `AI_API_KEY` — no paid account needed; auto-detected from the key shape.
- Brand/design docs from the original project live in the repo root
  (`ASKYAN_BRAND_PROFILE.md`, `design_guidelines.md`, `DESIGN_TOKENS.json`);
  Replit-agent notes preserved in `docs/REPLIT_NOTES.md`.

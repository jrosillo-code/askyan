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

## Migration status (from Replit)
- Replit plugins/config removed; builds and typechecks clean off-platform.
- `attached_assets/` currently holds **branded placeholders** — the real
  images/videos (parked during export) must be dropped in over them, keeping
  the exact same filenames. Two runtime videos belong in `client/public/`:
  `films-popup-video.mp4`, `films-hero-video.mp4`.
- `DATABASE_URL` was Replit-injected and needs re-provisioning (plus a data
  export from the Replit database if the existing waitlist matters).
- The concierge needs a real `OPENAI_API_KEY` (Replit's AI proxy is gone).
- Brand/design docs from the original project live in the repo root
  (`ASKYAN_BRAND_PROFILE.md`, `design_guidelines.md`, `DESIGN_TOKENS.json`);
  Replit-agent notes preserved in `docs/REPLIT_NOTES.md`.

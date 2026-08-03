# BLAZE AI CODEX - COMPLETE DOWNLOAD PACKAGE
## Everything Learned from ASKYAN EXPEDITIONS Project

**Created:** December 2024
**Project Value:** ~$100+ in AI-assisted development
**Purpose:** Train future AI systems, start new projects faster, maintain quality standards

---

# HOW TO USE THIS PACKAGE

## For Google Drive Storage
Copy these files to your Google Drive:
1. `DOWNLOAD_PACKAGE.md` (this file - master reference)
2. `BLAZE_AI_DEVELOPMENT_KIT.md` (complete development guide)
3. `UNIVERSAL_WEB_DEV_CODEX.md` (AI training document)
4. `LEARNINGS_LOG.md` (project lessons)
5. `TECH_STACK_EXPORT.json` (dependencies list)
6. `DESIGN_TOKENS.json` (color/typography system)
7. `PROMPT_LEARNINGS.md` (AI communication patterns)
8. `COMPONENT_TEMPLATES.md` (reusable code)
9. `CLIENT_INTAKE_TEMPLATE.md` (new client questionnaire)
10. `ASKYAN_BRAND_PROFILE.md` (reference example)

## For Training New AI Assistants
Paste contents of `UNIVERSAL_WEB_DEV_CODEX.md` into the system prompt of any AI to teach it your quality standards.

## For Starting New Projects
1. Fork the ASKYAN Replit project
2. Replace brand variables using `CLIENT_INTAKE_TEMPLATE.md`
3. Follow patterns in `BLAZE_AI_DEVELOPMENT_KIT.md`

---

# SECTION 1: PROJECT SUMMARY

## What Was Built
**ASKYAN EXPEDITIONS** - Premium travel website with:
- Cinematic video hero sections
- Multi-language support (EN, ES, FR, ZH)
- Email subscription system
- Contact form with validation
- Page analytics tracking
- Mobile-responsive design
- Dark theme "rugged luxury" aesthetic

## Pages Created
1. Home - Video hero with expedition showcase
2. About - Company story and philosophy
3. Expeditions - Destination listings
4. Expedition Detail - Individual trip pages
5. Films - Media/documentary section
6. Stories - Blog/content section
7. Conservation - Environmental mission
8. Sustainable - Sustainability practices
9. Community - Social/community features
10. Contact - Inquiry form
11. Month Detail - Seasonal content pages

## Key Features Implemented
- Framer Motion scroll animations
- Embla carousel for image galleries
- React Query for data fetching
- React Hook Form with Zod validation
- Toast notifications
- Responsive navigation with hamburger menu
- AI-powered chatbot component
- Analytics event tracking

---

# SECTION 2: COMPLETE TECH STACK

## Frontend
| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.3.1 | UI framework |
| react-dom | 18.3.1 | React rendering |
| wouter | 3.3.5 | Client-side routing |
| @tanstack/react-query | 5.60.5 | Data fetching/caching |
| framer-motion | 11.13.1 | Animations |
| react-hook-form | 7.55.0 | Form handling |
| @hookform/resolvers | 3.10.0 | Form validation |
| zod | 3.24.2 | Schema validation |
| embla-carousel-react | 8.6.0 | Carousels |
| lucide-react | 0.453.0 | Icons |
| react-icons | 5.4.0 | Additional icons |
| date-fns | 3.6.0 | Date formatting |
| recharts | 2.15.2 | Charts/graphs |
| next-themes | 0.4.6 | Theme switching |

## UI Components (Radix + Shadcn)
| Package | Purpose |
|---------|---------|
| @radix-ui/react-dialog | Modal dialogs |
| @radix-ui/react-dropdown-menu | Dropdown menus |
| @radix-ui/react-accordion | Collapsible sections |
| @radix-ui/react-tabs | Tab navigation |
| @radix-ui/react-toast | Toast notifications |
| @radix-ui/react-tooltip | Tooltips |
| @radix-ui/react-select | Select dropdowns |
| @radix-ui/react-checkbox | Checkboxes |
| @radix-ui/react-avatar | User avatars |
| @radix-ui/react-scroll-area | Custom scrollbars |
| class-variance-authority | Component variants |
| clsx | Class name utility |
| tailwind-merge | Tailwind class merging |
| cmdk | Command palette |
| vaul | Drawer component |

## Styling
| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | 3.4.17 | Utility-first CSS |
| tailwindcss-animate | 1.0.7 | Animation utilities |
| @tailwindcss/typography | 0.5.15 | Prose styling |
| autoprefixer | 10.4.20 | CSS vendor prefixes |
| postcss | 8.4.47 | CSS processing |

## Backend
| Package | Version | Purpose |
|---------|---------|---------|
| express | 4.21.2 | HTTP server |
| express-session | 1.18.1 | Session management |
| passport | 0.7.0 | Authentication |
| passport-local | 1.0.0 | Local auth strategy |
| drizzle-orm | 0.39.3 | Database ORM |
| drizzle-zod | 0.7.0 | Schema generation |
| pg | 8.16.3 | PostgreSQL client |
| connect-pg-simple | 10.0.0 | Session store |
| memorystore | 1.6.7 | Memory session store |
| ws | 8.18.0 | WebSockets |
| openai | 6.10.0 | AI integration |

## Development Tools
| Package | Version | Purpose |
|---------|---------|---------|
| typescript | 5.6.3 | Type safety |
| vite | 5.4.20 | Build tool |
| @vitejs/plugin-react | 4.7.0 | React plugin |
| tsx | 4.20.5 | TypeScript execution |
| esbuild | 0.25.0 | Fast bundling |
| drizzle-kit | 0.31.4 | DB migrations |

---

# SECTION 3: DATABASE SCHEMA

## Tables
```sql
-- Users (authentication)
CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Email Subscribers
CREATE TABLE subscribers (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE
);

-- Contact Form Submissions
CREATE TABLE contact_submissions (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  inquiry_type TEXT NOT NULL,
  message TEXT NOT NULL
);

-- Page View Analytics
CREATE TABLE page_views (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  timestamp TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Analytics Events
CREATE TABLE analytics_events (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_data TEXT,
  timestamp TIMESTAMP DEFAULT NOW() NOT NULL
);
```

---

# SECTION 4: API ENDPOINTS

## Implemented Routes
```
POST /api/subscribe     - Add email subscriber
POST /api/contact       - Submit contact form
POST /api/analytics/pageview  - Track page views
POST /api/analytics/event     - Track custom events
```

## Example API Pattern
```typescript
// server/routes.ts
app.post("/api/subscribe", async (req, res) => {
  try {
    const validatedData = insertSubscriberSchema.parse(req.body);
    const subscriber = await storage.createSubscriber(validatedData);
    res.json(subscriber);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});
```

---

# SECTION 5: KEY CODE PATTERNS

## Video Hero Section
```tsx
<div className="relative h-screen overflow-hidden">
  <div className="absolute inset-0 z-0">
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      src={heroVideo}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
  </div>
  <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
    {/* Content here */}
  </div>
</div>
```

## Scroll Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
  {/* Content */}
</motion.div>
```

## Form with Validation
```tsx
const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: { email: "" },
});

const mutation = useMutation({
  mutationFn: async (data) => apiRequest("POST", "/api/subscribe", data),
  onSuccess: () => {
    toast({ title: "Success!" });
    queryClient.invalidateQueries({ queryKey: ['/api/subscribers'] });
    form.reset();
  },
});
```

---

# SECTION 6: DESIGN SYSTEM

## Color Palette (HSL Format)
```css
--background: 0 0% 7%;           /* #111111 - Near black */
--foreground: 30 4% 92%;         /* #EAEAEA - Off-white */
--primary: 30 52% 64%;           /* #D4A373 - Amber/Gold */
--card: 0 0% 9%;                 /* Slightly lighter dark */
--muted-foreground: 0 0% 63%;   /* Gray for secondary text */
--border: 30 2% 16%;            /* Subtle border */
--accent: 30 6% 13%;            /* Accent background */
--destructive: 0 72% 42%;       /* Error red */
```

## Typography
```css
--font-sans: 'Inter', sans-serif;   /* Display/Headings */
--font-serif: 'Lora', Georgia, serif; /* Body text */
```

## Spacing Scale
- Small: 4px (p-1), 8px (p-2)
- Medium: 16px (p-4), 24px (p-6)
- Large: 32px (p-8), 48px (p-12)
- Section: 64px (py-16), 96px (py-24)

---

# SECTION 7: FILE STRUCTURE

```
project/
├── client/
│   ├── public/           # Static assets (videos, favicon)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/       # Shadcn components
│   │   │   ├── chatbot.tsx
│   │   │   ├── search-modal.tsx
│   │   │   └── shared-header.tsx
│   │   ├── contexts/     # React contexts
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # Utilities
│   │   ├── pages/        # Route pages
│   │   ├── App.tsx       # Main app component
│   │   ├── index.css     # Global styles
│   │   └── main.tsx      # Entry point
│   └── index.html
├── server/
│   ├── db.ts            # Database connection
│   ├── index.ts         # Server entry
│   ├── routes.ts        # API routes
│   ├── storage.ts       # Data layer
│   ├── static.ts        # Static file serving
│   └── vite.ts          # Vite integration
├── shared/
│   └── schema.ts        # Types & validation
├── attached_assets/     # User-provided assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

# SECTION 8: CRITICAL LEARNINGS

## Video Optimization (MOST IMPORTANT)
**Problem:** Large videos (60-73MB) caused mobile black screens
**Solution:** Compress ALL videos before use
```bash
ffmpeg -i input.mp4 -vf "scale=1920:1080" -c:v libx264 -preset slow -crf 26 -t 10 -an -movflags +faststart output.mp4
```
**Rules:**
- Maximum 6MB per video
- Maximum 1080p resolution
- Maximum 10 seconds for loops
- Remove audio track (-an flag)

## CSS Variable Format
**Problem:** Colors not working in Tailwind
**Solution:** Use space-separated HSL without wrapper
```css
/* CORRECT */
--primary: 30 52% 64%;

/* WRONG */
--primary: hsl(30, 52%, 64%);
```

## Never Add Hover States to Buttons
**Problem:** Custom hovers conflict with built-in elevations
**Solution:** Use built-in `hover-elevate` system, never `hover:bg-*`

## Always Include Gap with Justify-Between
**Problem:** Elements overlap on small screens
**Solution:** Always pair `justify-between` with `gap-*`
```tsx
// CORRECT
<div className="flex justify-between gap-2">

// WRONG
<div className="flex justify-between">
```

## Icon Button Sizing
**Solution:** Use `size="icon"`, never manual height/width
```tsx
// CORRECT
<Button size="icon"><Plus /></Button>

// WRONG
<Button className="h-8 w-8"><Plus /></Button>
```

---

# SECTION 9: QUICK START CHECKLIST

## Starting a New Project
- [ ] Fork ASKYAN as template
- [ ] Complete CLIENT_INTAKE_TEMPLATE.md
- [ ] Replace brand variables in index.css
- [ ] Compress all videos (under 6MB)
- [ ] Set up language context if multi-language
- [ ] Copy SharedHeader pattern
- [ ] Use established section padding (py-16/py-24)

## Before Delivering
- [ ] All videos under 6MB
- [ ] All images optimized
- [ ] No console errors
- [ ] Forms validate and submit
- [ ] Loading states present
- [ ] Mobile layout tested
- [ ] Dark theme looks premium
- [ ] All links work

---

# SECTION 10: VALUE EXTRACTED

## What You Now Have
1. **Battle-tested code patterns** - Copy-paste ready
2. **Complete tech stack** - Approved libraries list
3. **Design system** - Portable to any project
4. **API patterns** - Reusable backend templates
5. **Animation library** - Framer Motion patterns
6. **Component library** - Shadcn + custom components
7. **Error/Fix pairs** - Debugging knowledge
8. **Quality standards** - Checklist for every project
9. **AI training data** - Teach any AI your style
10. **Project template** - Fork and customize

## Estimated Value
- Development time saved: 20-40 hours per future project
- Bug prevention: Dozens of known issues avoided
- Quality consistency: Baseline standard for all work
- AI efficiency: Better prompts = faster results

---

**Remember:** Every project builds on this foundation. Keep updating the learnings log. The goal is faster, cheaper, higher-quality websites every time.

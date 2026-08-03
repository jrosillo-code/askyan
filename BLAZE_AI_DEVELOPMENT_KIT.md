# BLAZE AI DEVELOPMENT KIT
## Complete Website Development Knowledge Base

**Created from:** ASKYAN EXPEDITIONS Project (December 2024)
**Purpose:** Train AI systems to build premium websites faster, cheaper, with fewer revisions
**Value:** ~$100+ in development learnings captured

---

# TABLE OF CONTENTS

1. [AI EXECUTION INSTRUCTIONS](#section-1-ai-execution-instructions)
2. [NON-NEGOTIABLE QUALITY STANDARDS](#section-2-non-negotiable-quality-standards)
3. [CLIENT CUSTOMIZATION SYSTEM](#section-3-client-customization-system)
4. [SIGNATURE STYLE ELEMENTS](#section-4-signature-style-elements)
5. [ASKYAN BRAND PROFILE (Reference Example)](#section-5-askyan-brand-profile)
6. [CLIENT INTAKE TEMPLATE](#section-6-client-intake-template)
7. [LEARNINGS LOG & CORRECTIONS](#section-7-learnings-log)
8. [COMPLETE CODE TEMPLATES](#section-8-code-templates)
9. [TECH STACK REFERENCE](#section-9-tech-stack)
10. [CONTINUOUS IMPROVEMENT PROTOCOL](#section-10-continuous-improvement)

---

# SECTION 1: AI EXECUTION INSTRUCTIONS

## First Read Protocol
Before generating ANY code, read this entire document. The patterns here represent hundreds of manual corrections and refinements. Following them saves significant time and credits.

## Core Mindset
1. **Quality over speed** - A polished first generation requires fewer revisions
2. **Cinematic, not corporate** - We build experiences, not brochures
3. **Mobile-first, but desktop-gorgeous** - Both must be exceptional
4. **Dark themes by default** - Premium feel, easier on eyes
5. **No placeholders in production paths** - Real data or nothing

## Reference Standard
ASKYAN EXPEDITIONS is the MINIMUM quality baseline. Every website must match or exceed this level of polish. When in doubt, look at how ASKYAN handles it.

## Adaptation Protocol
For each new client:
1. Read their completed intake form
2. Identify which ASKYAN patterns apply
3. Swap brand variables (colors, fonts, content)
4. Maintain the same structural quality
5. Adjust vibe preset as needed

---

# SECTION 2: NON-NEGOTIABLE QUALITY STANDARDS

## Design Fundamentals

### Color Philosophy
- Dark backgrounds by default (#111111 or similar very dark)
- Off-white text for readability (#EAEAEA)
- Warm accent colors (amber, gold, earthy tones) - adjust per client
- Never pure black (#000000) or pure white (#FFFFFF) - too harsh
- CSS variables MUST use HSL format: `--color: 23 10% 23%;` (space-separated, no hsl wrapper)

### Typography
- Two font families maximum: Display (headings) + Body (content)
- Display: Sans-serif, bold, confident (Inter, Montserrat, etc.)
- Body: Serif or readable sans for content (Lora, Georgia, etc.)
- Generous line-height (1.6-1.8 for body text)
- Letter-spacing on uppercase text (tracking-wide or tracking-wider)

### Spacing
- Generous vertical rhythm - let content breathe
- Consistent padding patterns (small: 4-6, medium: 8-12, large: 16-24)
- No two bordered elements should touch - always gap between
- Sections need significant vertical padding (py-16 minimum, py-24 preferred)

### Borders & Shadows
- Border radius always small (rounded-md) unless perfect circles
- Shadows used sparingly - only for floating elements or modals
- Borders subtle - barely visible contrast difference

## Technical Standards

### Video Optimization (CRITICAL)
- ALL videos must be compressed before use
- Maximum file size: 6MB per video
- Resolution: 1080p maximum (not 4K)
- Duration: 10 seconds maximum for background loops
- Format: MP4 with web-optimized flags
- Command: `ffmpeg -i input.mp4 -vf "scale=1920:1080" -c:v libx264 -preset slow -crf 26 -t 10 -an -movflags +faststart output.mp4`
- Never use poster/fallback images - videos should load fast enough

### Image Optimization
- Compress all images before use
- Use appropriate formats (WebP preferred, JPG for photos, PNG for transparency)
- Lazy load images below the fold
- Always include alt text

### Performance
- No blocking resources
- Minimal JavaScript bundles
- CSS variables for theming
- Skeleton loading states for async content

## Component Standards

### Buttons
- Use built-in Button component variants only
- Never add custom hover states - built-in hover-elevate handles this
- Icon buttons use size="icon" - never manual h/w classes
- CTAs should use action-oriented language ("Request Access" not "Submit")

### Cards
- Use built-in Card component
- Never nest cards inside cards
- Apply hover-elevate for interactive cards
- Consistent padding inside all cards

### Forms
- Use react-hook-form with zod validation
- Show loading states during submission
- Clear error messages
- Success feedback via toast

### Navigation
- Transparent headers over hero sections
- Solid headers when scrolling
- Mobile hamburger menu
- Smooth scroll to sections

## Forbidden Patterns (NEVER DO)

- Use emojis anywhere - use icons from lucide-react instead
- Pure black or pure white colors
- Display: table (causes width issues)
- Layout changes on hover (use visibility toggle instead)
- Custom hover states on Buttons/Badges
- Nest buttons inside buttons
- Border on 1-3 sides of rounded elements
- Manual height/width on size="icon" buttons
- Placeholder/mock data in production
- Videos over 6MB

---

# SECTION 3: CLIENT CUSTOMIZATION SYSTEM

## Brand Variables (Required for each client)
```
CLIENT_NAME: [Company name]
TAGLINE: [Main headline/value prop]
PRIMARY_COLOR: [Main accent color - HSL format]
SECONDARY_COLOR: [Supporting color - HSL format]
FONT_DISPLAY: [Heading font family]
FONT_BODY: [Body text font family]
LOGO_PATH: [Path to logo file]
```

## Content Variables
```
HERO_HEADLINE: [Main hero text]
HERO_SUBHEADLINE: [Supporting hero text]
CTA_PRIMARY: [Main call-to-action text]
CTA_SECONDARY: [Secondary CTA text]
SECTIONS: [List of page sections needed]
```

## Industry-Specific Patterns
- **Travel/Hospitality:** Cinematic video backgrounds, destination cards, booking CTAs
- **Retail/E-commerce:** Product grids, cart functionality, category navigation
- **Professional Services:** Team bios, service cards, contact forms, testimonials
- **Healthcare:** Trust signals, provider profiles, appointment booking
- **Real Estate:** Property galleries, search filters, contact agents

## Vibe Presets
```
RUGGED_LUXURY: Dark theme, earthy accents, serif body, cinematic (ASKYAN default)
CLEAN_MINIMAL: Light theme, black accents, sans-serif, whitespace-heavy
BOLD_MODERN: Vibrant colors, geometric shapes, strong typography
ELEGANT_CLASSIC: Muted tones, serif throughout, traditional layouts
TECH_FORWARD: Dark theme, neon accents, monospace touches, gradients
```

---

# SECTION 4: SIGNATURE STYLE ELEMENTS

These elements define "our" website quality and should appear in every build:

## Hero Sections
- Full viewport height minimum
- Video or high-quality image background
- Dark gradient overlay for text readability (from-black/40 via-black/50 to-black/80)
- Animated text entrance (staggered word reveal)
- Subtle scroll indicator

## Section Transitions
- Generous padding between sections
- Alternating background colors (background, card, background)
- Smooth fade-in animations on scroll (framer-motion)

## Typography Hierarchy
- Uppercase small text for labels/categories (tracking-[0.3em])
- Bold display text for headlines
- Italic for taglines and quotes
- Muted foreground for secondary info

## Interactive Elements
- Subtle scale on hover (scale-105 maximum)
- Smooth transitions (duration-300 to duration-700)
- Color transitions on text links
- Arrow icons that animate on hover (gap increase)

## Mobile Excellence
- Touch-friendly tap targets (minimum 44px)
- Swipe gestures for carousels (without indicator dots cluttering UI)
- Collapsible navigation
- Optimized images for mobile bandwidth

---

# SECTION 5: ASKYAN BRAND PROFILE

## Use this as the REFERENCE EXAMPLE for quality and completeness

### Company Overview
**Company Name:** ASKYAN EXPEDITIONS
**Industry:** Premium Travel / Expeditions
**Tagline:** "Curated Access to the Unseen World"
**Website Purpose:** Lead generation teaser site for exclusive travel expeditions

### Brand Identity

**Core DNA:**
- Identity: Decentralized global media collective that monetizes through exclusive, story-driven expeditions
- NOT: A travel agency - we are publishers of authentic human stories
- Philosophy: Media is the primary asset, expeditions are the monetization

**Vibe - "Rugged Luxury":**
- Cinematic, intellectual, exclusive, authentic
- Like a Land Rover Defender - tough exterior, refined interior
- Mysterious and elemental
- Dark theme with earthy, firelight accents

**Target Customer - "The Sovereign in Training":**
- Successful, intellectually curious individuals
- Entrepreneurs, executives, creatives
- Achieved conventional success, now seeking meaning and transformation
- Inspired by Anthony Bourdain's authenticity
- Lacks time and access to find raw authentic experiences

**Value Proposition:**
- Solves the "Bourdain Deficit"
- Safe, efficient access to unreachable people, places, and understanding
- What conventional travel cannot provide

### Founders

**Blaze Potratz - "The Architect"**
- Location: Hawaii
- Role: Chief Creative & Philosophical Officer
- Domain: "The Art Foundry" - IP generation
- Background: Native Hawaiian heritage, family connections to private land
- Responsibilities: Architects the brand's soul, creates Culinary & Cinematic Blueprints, develops global media strategy
- Special Assets: Hub for ultra-premium "Inner Sanctum" expeditions on private Hawaiian land

**Jacobo Rosillo - "The Pathfinder"**
- Location: Madrid
- Role: Chief Expansion & Network Engineer
- Domain: "The System Forge" - network engineering
- Background: Engineering mindset, love for travel
- Responsibilities: Executes "Pathfinder Playbook" to launch new countries, builds global network from Central Asia to Europe

### Business Model - "Story-Asset Flywheel"

1. **INVEST:** Pathfinders travel to emerging frontiers, invest in local "Chroniclers" (storytellers) and "Lynchpin Guides" through Storytelling Grants + technology
2. **PRODUCE:** Raw authentic content flows to Art Foundry, refined into world-class media (YouTube, documentaries, articles)
3. **SELL ACCESS:** Media generates demand, enables selling limited premium expeditions
4. **FUND:** Expedition revenue reinvested via "Story Dividend" back into Grant program

### Visual Identity

**Colors (CSS Variables):**
```css
--background: 0 0% 7%;           /* Very dark gray #111111 */
--foreground: 30 4% 92%;         /* Off-white #EAEAEA */
--primary: 30 52% 64%;           /* Amber/Gold accent #D4A373 */
--card: 0 0% 9%;                 /* Slightly lighter dark */
--muted-foreground: 0 0% 63%;    /* Gray for secondary text */
```

**Typography:**
- Display Font: Inter (bold, confident, modern)
- Body Font: Lora (elegant serif for readability)
- Headings: Uppercase labels with letter-spacing
- Body: Generous line-height, italic for emphasis

**Imagery:**
- Cinematic landscape photography
- Video backgrounds over static images
- Dark gradient overlays for text readability
- Earthy, natural tones
- Cultural authenticity over stock polish

### Copy Guidelines

**Voice:**
- Intelligent but not academic
- Mysterious but not pretentious
- Confident but not arrogant
- Exclusive but welcoming to the right people

**Terminology:**
- Never say: Tour, Trip, Vacation, Package
- Always say: Expedition, Journey, Access, Experience
- CTAs: "Request Access", "Join the Waitlist", "Begin Your Journey"

**Example Headlines:**
- "This Is Not A Tour. It's An Invitation."
- "Where the Horizon Bends to Meet the Sky"
- "Curated Access to the Unseen World"
- "Sleep Where Eagles Nest"

---

# SECTION 6: CLIENT INTAKE TEMPLATE

## Complete this for each new website project

### Basic Information
```
Company Name: _____
Industry: [ ] Travel [ ] Retail [ ] Services [ ] Healthcare [ ] Real Estate [ ] Tech [ ] Other: ___
Website Purpose: [ ] Lead Gen [ ] E-commerce [ ] Portfolio [ ] Info [ ] Booking [ ] Other: ___
Target Launch Date: _____
```

### Brand Identity
```
Tagline: _____
Target Customer: _____
Brand Personality (1-5): Serious-Playful / Traditional-Modern / Accessible-Exclusive
Three Brand Words: _____, _____, _____
```

### Visual Preferences
```
Color Scheme: [ ] Dark (premium) [ ] Light (clean) [ ] Mixed
Primary Color: _____
Typography: [ ] Modern sans [ ] Elegant serif [ ] Mixed
Imagery: [ ] Photo-heavy [ ] Illustration [ ] Video [ ] Minimal
Reference Websites: _____, _____, _____
```

### Content & Structure
```
Pages Needed: [ ] Home [ ] About [ ] Services [ ] Portfolio [ ] Blog [ ] Contact [ ] Other: ___
Hero Style: [ ] Video [ ] Static Image [ ] Animated [ ] Text-only [ ] Carousel
Main CTA: _____
```

### Content Inventory
```
Logo: [ ] Have it [ ] Need to create [ ] Text-only
Photos: [ ] Have professional [ ] Need stock [ ] Will provide later
Videos: [ ] Have ready [ ] Need stock [ ] No videos [ ] Will create
Written Content: [ ] All ready [ ] Headlines ready [ ] Need all [ ] Will provide
```

### Functionality
```
Email Capture: [ ] Newsletter [ ] Waitlist [ ] Contact form [ ] None
User Accounts: [ ] Yes [ ] No
E-commerce: [ ] Products [ ] Services/Bookings [ ] None
Multi-language: [ ] English only [ ] Multiple: _____
```

### AI Developer Notes (Fill after intake)
```
Vibe Preset: [ ] RUGGED_LUXURY [ ] CLEAN_MINIMAL [ ] BOLD_MODERN [ ] ELEGANT_CLASSIC [ ] TECH_FORWARD
Complexity: [ ] Simple (3-5 pages) [ ] Medium (forms, some backend) [ ] Complex (accounts, integrations)
Reference ASKYAN patterns for: _____
```

---

# SECTION 7: LEARNINGS LOG

## Project 1: ASKYAN EXPEDITIONS
**Date:** December 2024
**Type:** Premium Travel Lead Generation Site
**Build Time:** Multiple sessions over several days
**Credits Used:** ~$100 over allocation
**Final Quality:** Baseline standard for all future projects

### Key Learnings (Apply These Proactively)

#### Video Optimization (CRITICAL)
- **Problem:** Large videos (60-73MB) caused black screens on mobile
- **Solution:** Compress ALL videos to 1080p, 10 seconds, under 6MB
- **Command:** `ffmpeg -i input.mp4 -vf "scale=1920:1080" -c:v libx264 -preset slow -crf 26 -t 10 -an -movflags +faststart output.mp4`
- **Impact:** Eliminated loading issues, faster page loads

#### Poster Images Unnecessary
- **Problem:** Poster fallback images added visual noise
- **Solution:** With proper compression, videos load instantly - no poster needed
- **Impact:** Cleaner code, better user experience

#### Mobile Carousel Indicators
- **Problem:** Dots cluttered mobile hero experience
- **Solution:** Remove dots, just enable swipe - users figure it out
- **Impact:** Cleaner mobile UI

#### Internationalization Architecture
- **Problem:** Hardcoded English text made translation difficult
- **Solution:** Centralized language context with translation keys from start
- **Files:** contexts/language-context.tsx with all strings
- **Impact:** Easy multi-language support (EN, ES, FR, ZH implemented)

#### CSS Variable Format
- **Problem:** HSL colors not working in Tailwind
- **Solution:** Use space-separated format WITHOUT hsl(): `--color: 23 10% 23%;`
- **Impact:** Proper dark/light theme switching

#### Button Hover States
- **Problem:** Custom hover states conflicted with built-in elevations
- **Solution:** Never add hover:bg-* to Buttons/Badges - use built-in hover-elevate
- **Impact:** Consistent interactions, less code

#### Icon Button Sizing
- **Problem:** Manual h/w classes on icon buttons broke layout
- **Solution:** Always use size="icon", never add height/width classes
- **Impact:** Consistent button sizes

#### Gap with Justify-Between
- **Problem:** justify-between without gap caused overlap on small screens
- **Solution:** Always pair justify-between with gap-* class
- **Impact:** Better responsive layouts

#### Loading States
- **Problem:** Forms submitted without feedback
- **Solution:** Always check isPending/isLoading and show loading indicator
- **Impact:** Better UX, fewer confused users

#### Form Validation Debugging
- **Problem:** Forms wouldn't submit, no visible error
- **Solution:** Log form.formState.errors to console
- **Impact:** Faster debugging

### Patterns That Worked Well
1. **SharedHeader component** - Reusable across all pages with variants
2. **Framer Motion whileInView** - Elegant scroll animations
3. **Dark gradient overlays** - Made text readable on any image/video
4. **Card hover-elevate** - Simple but effective interactive feedback
5. **Centralized design tokens** - Easy global style changes

### What Could Be Faster Next Time
1. Start with compressed videos from the beginning
2. Set up language context before any content
3. Copy SharedHeader pattern immediately
4. Use established section padding from start (py-16/py-24)
5. Follow color variable format exactly

## Quick Reference: DO'S AND DON'TS

### Always Do
- Compress videos first (under 6MB)
- Use HSL format for CSS variables (space-separated)
- Add gap with justify-between
- Use size="icon" for icon buttons
- Include loading states
- Set up language context early
- Test on mobile

### Never Do
- Use videos over 6MB
- Add hover states to Buttons/Badges
- Forget dark mode variants
- Use emojis
- Pure black or pure white
- Manual button sizing
- Skip video compression
- Nest cards inside cards

---

# SECTION 8: CODE TEMPLATES

## Project Structure
```
client/
  src/
    components/
      ui/          # shadcn components
      shared-*.tsx # reusable custom components
    pages/         # route pages
    contexts/      # React contexts (theme, language, etc.)
    hooks/         # custom hooks
    lib/           # utilities
server/
  routes.ts        # API endpoints
  storage.ts       # data layer
shared/
  schema.ts        # types and validation
```

## Animation Pattern (Framer Motion)
```tsx
import { motion } from "framer-motion";

// Fade in on scroll
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
  {/* Content */}
</motion.div>
```

## Video Background Pattern
```tsx
<div className="absolute inset-0 z-0">
  <video
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    src={videoSource}
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
</div>
```

## Card with Hover Effect
```tsx
<Card className="overflow-visible bg-card border-border hover-elevate cursor-pointer">
  {/* Card content */}
</Card>
```

## Staggered Text Animation
```tsx
function AnimatedText({ text, className, delay = 0 }) {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 50,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.h1 className={className} variants={container} initial="hidden" animate="visible">
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
```

## Form with React Hook Form + Zod
```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
});

function EmailForm() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data) => apiRequest("POST", "/api/subscribe", data),
    onSuccess: () => {
      toast({ title: "Success!", description: "You've been added." });
      form.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Submitting..." : "Subscribe"}
        </Button>
      </form>
    </Form>
  );
}
```

## CSS Variables (index.css)
```css
/* DARK THEME - Premium Default */
:root {
  --button-outline: rgba(0,0,0, .10);
  --badge-outline: rgba(0,0,0, .05);
  --elevate-1: rgba(0,0,0, .03);
  --elevate-2: rgba(0,0,0, .08);
  --background: 0 0% 7%;
  --foreground: 30 4% 92%;
  --border: 30 2% 16%;
  --card: 0 0% 9%;
  --card-foreground: 30 4% 92%;
  --primary: 30 52% 64%;
  --primary-foreground: 0 0% 7%;
  --secondary: 30 4% 16%;
  --secondary-foreground: 30 4% 92%;
  --muted: 30 4% 15%;
  --muted-foreground: 0 0% 63%;
  --accent: 30 6% 13%;
  --accent-foreground: 30 4% 92%;
  --destructive: 0 72% 42%;
  --ring: 30 52% 64%;
  --font-sans: 'Inter', sans-serif;
  --font-serif: 'Lora', Georgia, serif;
  --radius: .5rem;
}

.dark {
  --button-outline: rgba(255,255,255, .10);
  --badge-outline: rgba(255,255,255, .05);
  --elevate-1: rgba(255,255,255, .04);
  --elevate-2: rgba(255,255,255, .09);
  /* Same color values for dark-first design */
}

/* Custom Text Effects */
.hero-text-glow {
  text-shadow: 
    0 0 40px rgba(212, 163, 115, 0.3),
    0 0 80px rgba(212, 163, 115, 0.15),
    0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Font Classes */
.font-display {
  font-family: 'Inter', sans-serif;
}

.font-body {
  font-family: 'Lora', Georgia, serif;
}
```

## Tailwind Config
```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: ".5625rem",
        md: ".375rem",
        sm: ".1875rem",
      },
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        // ... other color definitions
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
```

## Database Schema (Drizzle)
```typescript
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const subscribers = pgTable("subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).pick({
  email: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;
```

---

# SECTION 9: TECH STACK

## Core Dependencies
```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-tooltip": "^1.2.0",
    "@tanstack/react-query": "^5.60.5",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "drizzle-orm": "^0.39.3",
    "drizzle-zod": "^0.7.0",
    "express": "^4.21.2",
    "framer-motion": "^11.13.1",
    "lucide-react": "^0.453.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.55.0",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "wouter": "^3.3.5",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.15",
    "@vitejs/plugin-react": "^4.7.0",
    "drizzle-kit": "^0.31.4",
    "tailwindcss": "^3.4.17",
    "typescript": "5.6.3",
    "vite": "^5.4.20"
  }
}
```

## Why These Choices
- **Radix UI + shadcn/ui:** Accessible primitives with full design control
- **Framer Motion:** Best-in-class animations with simple API
- **TanStack Query:** Server state management with caching
- **Drizzle ORM:** Type-safe, lightweight, close to SQL
- **Wouter:** Minimal router for simple needs
- **Zod:** Runtime validation that generates types

---

# SECTION 10: CONTINUOUS IMPROVEMENT PROTOCOL

## After Each Project

1. **Document Problems:**
   - What errors occurred?
   - What took longer than expected?
   - What did the client request changes to?

2. **Record Solutions:**
   - How was each problem fixed?
   - Can this be prevented next time?
   - Is there a pattern to copy?

3. **Update This Document:**
   - Add new learnings to Section 7
   - Add new code patterns to Section 8
   - Update forbidden patterns if needed

4. **Track Metrics:**
   | Project | Pages | Build Time | Revisions | Credits Used |
   |---------|-------|------------|-----------|--------------|
   | ASKYAN  | 7+    | Multi-day  | Many      | ~$100 over   |
   | Next    |       |            |           |              |

## Goal
Each project should show improvement:
- Faster build time
- Fewer revision requests
- Lower credit usage
- Higher initial quality

## Using with AI Agents

When creating a custom AI agent for website generation:
1. Include this entire document in the system prompt
2. Reference ASKYAN as the quality baseline
3. Use the Client Intake Template for each new project
4. Instruct the AI to update the Learnings Log after each project

---

# HOW TO USE THIS DOCUMENT

## For New Website Projects

1. **Copy this entire file** to your AI assistant or include as context
2. **Fill out the Client Intake Template** (Section 6) for the new client
3. **Reference ASKYAN patterns** for implementation guidance
4. **Follow Non-Negotiable Standards** (Section 2) exactly
5. **Use Code Templates** (Section 8) as starting points
6. **Update Learnings Log** (Section 7) after project completion

## To Download Everything

All files are in the project root:
- `BLAZE_AI_DEVELOPMENT_KIT.md` (this file - the master document)
- `UNIVERSAL_WEB_DEV_CODEX.md`
- `ASKYAN_BRAND_PROFILE.md`
- `CLIENT_INTAKE_TEMPLATE.md`
- `LEARNINGS_LOG.md`

Download individually or download the entire project as a ZIP.

---

**This document represents $100+ in development learnings. Use it wisely. Each website you build should make the next one faster, cheaper, and better.**

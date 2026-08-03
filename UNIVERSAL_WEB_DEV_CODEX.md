# UNIVERSAL WEB DEVELOPMENT CODEX
## AI Training Document for Premium Website Generation

**Purpose:** This document trains any AI to build premium websites matching the quality standards established by ASKYAN EXPEDITIONS. Use this as your primary reference for all future website projects.

**Reference Standard:** ASKYAN EXPEDITIONS (askyan-expeditions.replit.app) is the minimum quality baseline. Every website must match or exceed this level of polish.

---

## SECTION 1: AI EXECUTION INSTRUCTIONS

### First Read
Before generating ANY code, read this entire document. The patterns here represent hundreds of manual corrections and refinements. Following them saves significant time and credits.

### Core Mindset
1. **Quality over speed** - A polished first generation requires fewer revisions
2. **Cinematic, not corporate** - We build experiences, not brochures
3. **Mobile-first, but desktop-gorgeous** - Both must be exceptional
4. **Dark themes by default** - Premium feel, easier on eyes
5. **No placeholders in production paths** - Real data or nothing

### Continuous Improvement Protocol
After each website project:
1. Document any new corrections made in LEARNINGS_LOG.md
2. Update this codex with new patterns discovered
3. The goal: Each build faster and cheaper than the last

---

## SECTION 2: NON-NEGOTIABLE QUALITY STANDARDS

### Design Fundamentals

**Color Philosophy:**
- Dark backgrounds by default (#111111 or similar very dark)
- Off-white text for readability (#EAEAEA)
- Warm accent colors (amber, gold, earthy tones)
- Never pure black (#000000) or pure white (#FFFFFF) - too harsh
- CSS variables must use HSL format: `--color: 23 10% 23%;` (space-separated)

**Typography:**
- Two font families maximum: Display (headings) + Body (content)
- Display: Sans-serif, bold, confident (Inter, Montserrat, etc.)
- Body: Serif or readable sans for content (Lora, Georgia, etc.)
- Generous line-height (1.6-1.8 for body text)
- Letter-spacing on uppercase text (tracking-wide or tracking-wider)

**Spacing:**
- Generous vertical rhythm - let content breathe
- Consistent padding patterns (small: 4-6, medium: 8-12, large: 16-24)
- No two bordered elements should touch - always gap between
- Sections need significant vertical padding (py-16 minimum, py-24 preferred)

**Borders & Shadows:**
- Border radius always small (rounded-md) unless perfect circles
- Shadows used sparingly - only for floating elements or modals
- Borders subtle - barely visible contrast difference

### Technical Standards

**Video Optimization (Critical):**
- ALL videos must be compressed before use
- Maximum file size: 6MB per video
- Resolution: 1080p maximum (not 4K)
- Duration: 10 seconds maximum for background loops
- Format: MP4 with web-optimized flags
- Command: `ffmpeg -i input.mp4 -vf "scale=1920:1080" -c:v libx264 -preset slow -crf 26 -t 10 -an -movflags +faststart output.mp4`
- Never use poster/fallback images - videos should load fast enough

**Image Optimization:**
- Compress all images before use
- Use appropriate formats (WebP preferred, JPG for photos, PNG for transparency)
- Lazy load images below the fold
- Always include alt text

**Performance:**
- No blocking resources
- Minimal JavaScript bundles
- CSS variables for theming
- Skeleton loading states for async content

### Component Standards

**Buttons:**
- Use built-in Button component variants only
- Never add custom hover states - built-in hover-elevate handles this
- Icon buttons use size="icon" - never manual h/w classes
- CTAs should use action-oriented language ("Request Access" not "Submit")

**Cards:**
- Use built-in Card component
- Never nest cards inside cards
- Apply hover-elevate for interactive cards
- Consistent padding inside all cards

**Forms:**
- Use react-hook-form with zod validation
- Show loading states during submission
- Clear error messages
- Success feedback via toast

**Navigation:**
- Transparent headers over hero sections
- Solid headers when scrolling
- Mobile hamburger menu
- Smooth scroll to sections

### Forbidden Patterns

**Never Do:**
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

## SECTION 3: CLIENT CUSTOMIZATION VARIABLES

When building for a new client, gather and apply these variables:

### Brand Variables (Required)
```
CLIENT_NAME: [Company name]
TAGLINE: [Main headline/value prop]
PRIMARY_COLOR: [Main accent color - HSL format]
SECONDARY_COLOR: [Supporting color - HSL format]
FONT_DISPLAY: [Heading font family]
FONT_BODY: [Body text font family]
LOGO_PATH: [Path to logo file]
```

### Content Variables
```
HERO_HEADLINE: [Main hero text]
HERO_SUBHEADLINE: [Supporting hero text]
CTA_PRIMARY: [Main call-to-action text]
CTA_SECONDARY: [Secondary CTA text]
SECTIONS: [List of page sections needed]
```

### Industry-Specific Patterns
- **Travel/Hospitality:** Cinematic video backgrounds, destination cards, booking CTAs
- **Retail/E-commerce:** Product grids, cart functionality, category navigation
- **Professional Services:** Team bios, service cards, contact forms, testimonials
- **Healthcare:** Trust signals, provider profiles, appointment booking
- **Real Estate:** Property galleries, search filters, contact agents

### Vibe Presets
```
RUGGED_LUXURY: Dark theme, earthy accents, serif body, cinematic
CLEAN_MINIMAL: Light theme, black accents, sans-serif, whitespace-heavy
BOLD_MODERN: Vibrant colors, geometric shapes, strong typography
ELEGANT_CLASSIC: Muted tones, serif throughout, traditional layouts
TECH_FORWARD: Dark theme, neon accents, monospace touches, gradients
```

---

## SECTION 4: SIGNATURE STYLE ELEMENTS

These elements define "our" website quality and should appear in every build:

### Hero Sections
- Full viewport height minimum
- Video or high-quality image background
- Dark gradient overlay for text readability (from-black/40 via-black/50 to-black/80)
- Animated text entrance (staggered word reveal)
- Subtle scroll indicator

### Section Transitions
- Generous padding between sections
- Alternating background colors (background, card, background)
- Smooth fade-in animations on scroll (framer-motion)

### Typography Hierarchy
- Uppercase small text for labels/categories (tracking-[0.3em])
- Bold display text for headlines
- Italic for taglines and quotes
- Muted foreground for secondary info

### Interactive Elements
- Subtle scale on hover (scale-105 maximum)
- Smooth transitions (duration-300 to duration-700)
- Color transitions on text links
- Arrow icons that animate on hover (gap increase)

### Mobile Excellence
- Touch-friendly tap targets (minimum 44px)
- Swipe gestures for carousels (without indicator dots cluttering UI)
- Collapsible navigation
- Optimized images for mobile bandwidth

---

## SECTION 5: IMPLEMENTATION PATTERNS

### Project Structure
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

### Starting a New Page
1. Create page component in pages/
2. Import SharedHeader with appropriate variant
3. Structure: Hero > Content Sections > CTA > Footer
4. Add route in App.tsx
5. Add to navigation

### Adding Animations
```tsx
import { motion } from "framer-motion";

// Fade in on scroll
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
```

### Video Background Pattern
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

### Card with Hover Effect
```tsx
<Card className="overflow-visible bg-card border-border hover-elevate cursor-pointer">
  {/* Card content */}
</Card>
```

---

## SECTION 6: COMMON CORRECTIONS LOG

These are fixes we made repeatedly during ASKYAN development. Apply proactively:

1. **Video too large** - Always compress to under 6MB, 1080p, 10 seconds
2. **Poster images before video** - Remove them, videos load fast when compressed
3. **Mobile dots on carousel** - Remove, just allow swipe
4. **Hover states on buttons** - Remove custom ones, use built-in
5. **Pure black backgrounds** - Change to very dark gray (#111111)
6. **Missing gap with justify-between** - Always add gap-* class
7. **Emojis in UI** - Replace with lucide-react icons
8. **Nested cards** - Flatten structure
9. **Manual button sizes** - Use size variants only
10. **Missing dark mode variants** - Always include dark: classes
11. **Text on images unreadable** - Add dark gradient overlay
12. **Inconsistent section padding** - Standardize to py-16/py-24
13. **Missing loading states** - Add isPending/isLoading checks
14. **Form validation invisible** - Log form.formState.errors

---

## SECTION 7: QUALITY CHECKLIST

Before delivering any website:

### Visual
- [ ] Dark theme looks premium
- [ ] Light theme (if applicable) has proper contrast
- [ ] All text readable on all backgrounds
- [ ] Consistent spacing throughout
- [ ] Animations smooth, not janky
- [ ] Mobile layout polished

### Technical
- [ ] All videos under 6MB
- [ ] All images optimized
- [ ] No console errors
- [ ] Forms validate and submit
- [ ] Loading states present
- [ ] 404 page exists

### Content
- [ ] No placeholder text
- [ ] No lorem ipsum
- [ ] All links work
- [ ] Images have alt text
- [ ] CTAs are action-oriented

---

## SECTION 8: FUTURE AUTOMATION VISION

### Current State
- Manual AI-assisted development
- This codex as training document
- Copy/paste of patterns

### Next Steps for Automation
1. **Template Repository** - Fork ASKYAN as starting point
2. **Variable Injection** - Script to replace brand variables
3. **Component Library** - Pre-built section components
4. **AI Agent Integration** - Custom GPT/Claude trained on this codex

### Using with AI Agents
When creating a custom AI agent for website generation:
1. Include this entire codex in the system prompt
2. Include CLIENT_INTAKE_TEMPLATE.md for gathering requirements
3. Reference ASKYAN as the quality baseline
4. Instruct to update LEARNINGS_LOG.md after each project

---

**Remember:** Every website we build should make the next one faster and better. Document what you learn. Improve this codex. The goal is premium quality at maximum efficiency.

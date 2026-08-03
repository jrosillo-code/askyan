# PROMPT LEARNINGS
## How to Communicate Effectively with AI for Web Development

**Purpose:** Document the prompting patterns that produced the best results during the ASKYAN project. Use these patterns to work more efficiently with any AI assistant.

---

# SECTION 1: PROMPTING PRINCIPLES

## What Worked

### 1. Be Specific About Quality Standards
**Good:** "Build a premium travel website with cinematic video backgrounds, dark theme, amber accents"
**Bad:** "Build a travel website"

**Why:** Specific aesthetic guidance reduces revision cycles.

### 2. Reference Known Examples
**Good:** "Make it feel like Anthony Bourdain's travel style - authentic, intellectual, exclusive"
**Bad:** "Make it look nice"

**Why:** References give the AI a concrete target to aim for.

### 3. Define What NOT to Do
**Good:** "Never use emojis, never pure black/white, no corporate stock photos"
**Bad:** Only describing what you want

**Why:** Preventing mistakes is as important as requesting features.

### 4. Provide Context About the Business
**Good:** "This is for wealthy, intellectually curious travelers seeking transformation"
**Bad:** "This is a travel site"

**Why:** Understanding the audience shapes every design decision.

### 5. Front-load Critical Technical Requirements
**Good:** "All videos must be under 6MB, compressed to 1080p"
**Bad:** Mentioning video optimization after problems occur

**Why:** Technical requirements prevent costly rework.

---

# SECTION 2: EFFECTIVE PROMPT TEMPLATES

## Initial Project Brief

```
PROJECT: [Name]
TYPE: [Lead gen / E-commerce / Portfolio / etc.]
INDUSTRY: [Travel / Retail / Services / etc.]

TARGET AUDIENCE:
- Demographics: [Age, income, location]
- Psychographics: [Values, desires, pain points]
- Comparable brands they admire: [List 2-3]

AESTHETIC DIRECTION:
- Theme: [Dark premium / Light minimal / Bold modern]
- Colors: [Primary accent, secondary, background tones]
- Typography: [Sans for headers / Serif for body]
- Imagery: [Cinematic videos / Professional photos / Illustrations]

PAGES NEEDED:
- [List all pages]

KEY FEATURES:
- [Email capture / Contact form / Booking / etc.]

NON-NEGOTIABLES:
- [Must-have requirements]
- [Things to absolutely avoid]

REFERENCE SITES:
- [URL 1 - what I like about it]
- [URL 2 - what I like about it]
```

## Feature Request

```
FEATURE: [Name]
PURPOSE: [What problem it solves for the user]
LOCATION: [Which page/section]

BEHAVIOR:
- When user does X, show Y
- Edge cases to handle: [List]

VISUAL REQUIREMENTS:
- [Animation type]
- [Color scheme]
- [Responsive behavior]

TECHNICAL NOTES:
- [Any API integration]
- [Data to capture/store]
- [Validation rules]
```

## Bug Fix Request

```
ISSUE: [Brief description]

STEPS TO REPRODUCE:
1. [Step 1]
2. [Step 2]
3. [Step 3]

EXPECTED: [What should happen]
ACTUAL: [What happens instead]

DEVICE/BROWSER: [Where it occurs]
PRIORITY: [Critical / High / Medium / Low]

ADDITIONAL CONTEXT:
- [Error messages]
- [Screenshots if helpful]
```

## Design Refinement

```
ELEMENT: [Button / Card / Hero / etc.]
CURRENT STATE: [Link or description]

ISSUES:
- [Problem 1]
- [Problem 2]

DESIRED CHANGES:
- [Specific adjustment 1]
- [Specific adjustment 2]

REFERENCE: [Optional - show what you want it to look like]
```

---

# SECTION 3: PROMPTS THAT SAVED TIME

## Setting Quality Baseline

> "ASKYAN EXPEDITIONS is the MINIMUM quality baseline. Every website must match or exceed this level of polish. When in doubt, look at how ASKYAN handles it."

**Why it works:** Gives AI a concrete reference point for all future decisions.

## Technical Constraints Upfront

> "ALL videos must be compressed before use:
> - Maximum file size: 6MB per video
> - Resolution: 1080p maximum (not 4K)
> - Duration: 10 seconds maximum for background loops
> - Command: ffmpeg -i input.mp4 -vf 'scale=1920:1080' -c:v libx264 -preset slow -crf 26 -t 10 -an -movflags +faststart output.mp4"

**Why it works:** Prevents the #1 issue we faced (mobile video playback).

## Design System Direction

> "Dark backgrounds by default (#111111 or similar very dark). Off-white text for readability (#EAEAEA). Warm accent colors (amber, gold, earthy tones). Never pure black (#000000) or pure white (#FFFFFF)."

**Why it works:** Specific color guidance prevents generic-looking results.

## Forbidden Patterns

> "NEVER DO:
> - Use emojis anywhere (use lucide-react icons instead)
> - Pure black or pure white colors
> - Custom hover states on Buttons/Badges
> - Videos over 6MB
> - Manual height/width on size='icon' buttons"

**Why it works:** Explicit prohibitions prevent common mistakes.

## Component Standards

> "Use built-in Button component variants only. Never add custom hover states - built-in hover-elevate handles this. Icon buttons use size='icon' - never manual h/w classes."

**Why it works:** Enforces consistency without micromanaging.

---

# SECTION 4: ITERATION PATTERNS

## When Something Isn't Right

### Level 1: Minor Adjustment
> "The hero text is good but needs more visual impact. Add a subtle text-shadow glow effect in amber tones."

### Level 2: Significant Change
> "The card layout isn't working. Let's try a different approach - use a grid of 3 columns on desktop, single column on mobile, with hover effects that scale slightly."

### Level 3: Complete Rethink
> "This section isn't capturing the brand feel at all. Let's step back. ASKYAN is 'rugged luxury' - like a Land Rover Defender. Tough exterior, refined interior. Mysterious and elemental. How would you rebuild this section with that in mind?"

## Building on Success

> "The hero section is exactly right. Now apply the same visual treatment to the About page - video background, dark gradient overlay, staggered text animation."

## Debugging Together

> "The form isn't submitting. I've checked the console and see a 400 error. Can you log form.formState.errors to see what validation is failing?"

---

# SECTION 5: PROMPT CHAINS FOR COMPLEX TASKS

## New Page Creation

1. **Structure:** "Create the [Page] page with: Hero section with video background, [Sections list], CTA section, consistent footer"

2. **Content:** "Use these content blocks: [Paste content]"

3. **Animation:** "Add scroll animations - fade in from bottom, stagger the cards, subtle scale on hover"

4. **Mobile:** "Optimize for mobile - stack columns, adjust text sizes, ensure tap targets are 44px minimum"

## Feature Implementation

1. **Data Model:** "First, add the schema for [feature] in shared/schema.ts with these fields: [list]"

2. **Backend:** "Now add the API endpoint in server/routes.ts for [POST/GET] /api/[endpoint]"

3. **Frontend:** "Create the form component using react-hook-form with zod validation, toast notifications on success/error"

4. **Integration:** "Connect the form to the API using useMutation from react-query, invalidate cache on success"

## Debugging Flow

1. **Identify:** "I'm seeing [problem]. What could cause this?"

2. **Diagnose:** "Let me check [specific thing]. Can you show me the code in [file]?"

3. **Fix:** "The issue is [cause]. Update [file] to [fix]."

4. **Verify:** "Rebuild and confirm the fix works on mobile/desktop."

---

# SECTION 6: PROMPTS TO AVOID

## Too Vague
**Bad:** "Make it better"
**Good:** "Increase the contrast between the card background and text, and add more vertical padding between sections"

## Too Many Changes at Once
**Bad:** "Redo the entire page with different colors, layout, and content"
**Good:** "Let's update the colors first, then we'll adjust the layout"

## Assuming AI Remembers
**Bad:** "Use the same pattern as before"
**Good:** "Use the video hero pattern with dark gradient overlay like we used on the home page"

## No Success Criteria
**Bad:** "Improve the performance"
**Good:** "Compress this video to under 6MB while maintaining visual quality at 1080p"

## Emotional Without Direction
**Bad:** "This doesn't feel right"
**Good:** "This feels too corporate. Add more texture - try a subtle grain overlay, use the serif font for body text, and reduce the brightness of the background"

---

# SECTION 7: META-LEARNING

## Training AI Over a Session

As you work with an AI on a project, you're training it through:
1. **Positive reinforcement:** "Perfect, exactly what I wanted"
2. **Corrections:** "Not quite - the colors need to be darker"
3. **Context building:** Each prompt adds to the AI's understanding

## Creating AI Training Documents

This is exactly what we're doing with BLAZE_AI_DEVELOPMENT_KIT.md:
1. Capture all successful patterns
2. Document all corrections made
3. Create explicit rules for future sessions
4. Reference concrete examples

## Using Codex with New AI

When starting fresh with a new AI:
1. Paste the UNIVERSAL_WEB_DEV_CODEX.md first
2. Reference ASKYAN as the quality baseline
3. Apply the CLIENT_INTAKE_TEMPLATE for new projects
4. Update LEARNINGS_LOG with new discoveries

---

# SECTION 8: PROMPT LIBRARY

## Quick Commands

| Goal | Prompt |
|------|--------|
| Add animation | "Add a fade-in animation on scroll using framer-motion whileInView" |
| Fix mobile | "Make this responsive - single column on mobile, adjust text sizes" |
| Add form | "Create a form with react-hook-form, zod validation, and toast feedback" |
| Compress video | "Compress this video: ffmpeg -i input.mp4 -vf 'scale=1920:1080' -c:v libx264 -preset slow -crf 26 -t 10 -an -movflags +faststart output.mp4" |
| Check colors | "Verify all colors use HSL format: '--color: H S% L%;' (space-separated)" |
| Debug form | "Log form.formState.errors to console to see validation issues" |
| Add loading | "Add isPending check and show loading state during mutation" |

---

**Remember:** The best prompts are specific, reference examples, include constraints, and anticipate problems. Document what works so you can replicate success.

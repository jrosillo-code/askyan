# LEARNINGS LOG
## Continuous Improvement Tracker

This document tracks lessons learned from each website project. Review before starting new projects. Add entries after completing each build.

---

## HOW TO USE THIS LOG

After each website project:
1. Document problems encountered
2. Note solutions that worked
3. Record time-saving discoveries
4. Update UNIVERSAL_WEB_DEV_CODEX.md with new patterns

---

## PROJECT 1: ASKYAN EXPEDITIONS
**Date:** December 2024
**Type:** Premium Travel Lead Generation Site
**Build Time:** Multiple sessions over several days
**Final Quality:** Baseline standard for all future projects

### Key Learnings

#### Video Optimization (Critical)
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

---

## PROJECT 2: [NEXT PROJECT]
**Date:** 
**Type:** 
**Build Time:** 
**Final Quality:** 

### Key Learnings
(Add after project completion)

---

## QUICK REFERENCE: DO'S AND DON'TS

### Always Do
- Compress videos first (under 6MB)
- Use HSL format for CSS variables
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

## METRICS TRACKING

| Project | Pages | Build Time | Revisions | Credits Used |
|---------|-------|------------|-----------|--------------|
| ASKYAN  | 7+    | Multi-day  | Many      | ~$100 over   |
| Next    |       |            |           |              |

**Goal:** Each project should show improvement in build time and revision count.

---

**REMEMBER:** This log is your competitive advantage. The more you document, the faster and cheaper future builds become.

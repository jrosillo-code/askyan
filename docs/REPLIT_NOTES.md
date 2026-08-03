# ASKYAN EXPEDITIONS

## Overview

ASKYAN EXPEDITIONS is a premium travel brand building a decentralized global media collective that monetizes through exclusive, high-margin travel expeditions. The project is currently in its initial phase (v0.1) - a single-page teaser website designed to establish brand legitimacy and capture email leads through a waitlist form.

**Core Value Proposition:** "Curated Access to the Unseen World" - providing transformative travel experiences through access to emerging destinations, local guides ("Cultural Scribes"), and deep cultural understanding.

**Target Audience:** "The Sovereign in Training" - successful, intellectually curious individuals (entrepreneurs, executives, creatives) seeking transformative experiences rather than conventional vacations.

**Current Phase:** This is NOT a booking platform. It's a "digital flag in the ground" focused on brand establishment and lead generation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React with TypeScript using Vite as the build tool
- Single-page application (SPA) architecture
- Client-side routing via Wouter (lightweight router)
- Component library: Radix UI primitives with shadcn/ui styling system
- Animation library: Framer Motion for cinematic transitions

**Styling Approach:**
- Tailwind CSS for utility-first styling with extensive customization
- Custom design tokens defined in CSS variables for the "rugged luxury" aesthetic
- Dark mode by default to support the cinematic, premium brand identity
- Typography: Inter (sans-serif) for headings/navigation, Lora (serif) for body content

**Key Design Principles:**
- **Color Palette:** Very dark background (#111111), off-white text (#EAEAEA), earthy amber/gold accent (#D4A373) for CTAs
- **Visual Identity:** Premium, rugged, minimalist, cinematic
- **Layout:** Generous vertical spacing, full-viewport hero section, centered content with max-width constraints

**State Management:**
- TanStack Query (React Query) for server state management
- React Hook Form with Zod for form validation
- Local component state via React hooks

### Backend Architecture

**Server Framework:** Express.js on Node.js
- RESTful API design pattern
- Type-safe with TypeScript throughout
- Session-based architecture (infrastructure in place, not currently utilized)

**API Endpoints:**
- `POST /api/subscribe` - Email subscription endpoint with validation
- `GET /api/subscribers` - Retrieve all subscribers (admin functionality)

**Middleware Stack:**
- Express JSON body parser with raw body preservation
- Custom logging middleware for request/response tracking
- Static file serving for production builds

**Development vs Production:**
- Development: Vite dev server with HMR (Hot Module Replacement)
- Production: Pre-built static assets served via Express

### Data Storage

**Database:** PostgreSQL (configured via Drizzle ORM)
- Schema-first approach using Drizzle's type-safe ORM
- Migration system via Drizzle Kit
- Currently implements two tables: `users` and `subscribers`

**Schema Design:**
- **Users Table:** Basic authentication structure (id, username, password) - prepared for future use
- **Subscribers Table:** Email capture (id, email with unique constraint)
- UUID primary keys generated via PostgreSQL's `gen_random_uuid()`

**Fallback Storage:**
- In-memory storage implementation (MemStorage class) for development without database
- Implements same interface as database storage for seamless switching

**Data Validation:**
- Zod schemas derived from Drizzle table definitions (drizzle-zod integration)
- Email validation with custom error messages
- Duplicate prevention via unique constraints and application-level checks

### External Dependencies

**UI Component Libraries:**
- @radix-ui/* - Accessible, unstyled UI primitives (accordion, dialog, dropdown, etc.)
- shadcn/ui pattern - Pre-styled Radix components with Tailwind
- Lucide React - Icon library for consistent iconography
- Embla Carousel - Touch-enabled carousel component

**Form Management:**
- react-hook-form - Performant form state management
- @hookform/resolvers - Zod schema resolver integration
- zod - Runtime type validation and schema definition

**Database & ORM:**
- drizzle-orm - TypeScript ORM with PostgreSQL dialect
- drizzle-kit - Migration management and schema push tooling
- pg - PostgreSQL client driver
- connect-pg-simple - PostgreSQL session store (prepared for authentication)

**Build Tools:**
- Vite - Fast build tool with HMR for development
- esbuild - JavaScript bundler for production server build
- TypeScript - Static typing across entire stack
- Tailwind CSS - Utility-first CSS framework with PostCSS

**Development Tools:**
- @replit/vite-plugin-runtime-error-modal - Enhanced error reporting in Replit
- @replit/vite-plugin-cartographer - Development tooling for Replit
- tsx - TypeScript execution for development server

**Fonts:**
- Google Fonts integration (Inter & Lora) loaded via CDN

**Rationale for Key Decisions:**

1. **Drizzle ORM over Prisma/TypeORM:** Chosen for lighter weight, closer-to-SQL approach while maintaining type safety
2. **Radix UI + shadcn/ui:** Provides accessible primitives with full design control, avoiding opinionated component libraries
3. **TanStack Query:** Industry-standard for server state with built-in caching and refetching strategies
4. **Wouter over React Router:** Minimal footprint for simple single-page routing needs
5. **Dark-first design:** Aligns with premium, cinematic brand identity from the start rather than as an afterthought
6. **PostgreSQL:** Prepared for future scalability and complex queries as the platform grows beyond email capture
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Design Banana is a SaaS application for AI-powered image editing. Users can upload images and edit them using text prompts, with the AI processing powered by OpenRouter's Google Gemini 2.5 Flash Image model.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Supabase authentication, Creem.io payments.

## Commands

Use `pnpm` as the package manager (evidenced by `pnpm-lock.yaml`).

```bash
pnpm install          # Install dependencies
pnpm dev              # Start Next.js dev server with hot reload
pnpm build            # Create production build
pnpm start            # Run production server (after build)
pnpm lint             # Run ESLint
```

**Testing:** No test framework is currently configured. If adding tests, use `*.test.tsx` or `*.spec.tsx` naming and add test commands to `package.json`.

## Architecture

### Directory Structure

```
app/                    # Next.js App Router
├── api/               # API routes (generate, checkout, webhook)
├── auth/              # Supabase auth pages (sign-in, callback, sign-out)
├── billing/           # Subscription billing pages
├── layout.tsx         # Root layout with theme provider
├── page.tsx           # Landing page
└── globals.css        # Global styles (Tailwind v4)
components/            # React components
├── ui/               # shadcn/ui primitives (Radix UI)
└── [feature].tsx     # Feature-specific components (hero, image-editor, etc.)
hooks/                # Custom React hooks
lib/                  # Shared utilities and Supabase client
```

### Key Integration Points

**Authentication (Supabase SSR):**
- Auth flow implemented in `app/auth/` with Google OAuth
- Supabase client configured in `lib/supabase/`
- Server-side session management via `createServerClient`

**Payment (Creem.io):**
- Checkout flow: `app/checkout/` → `app/api/checkout/route.ts`
- Webhook handler: `app/api/webhook/route.ts` processes subscription events
- Billing portal: `app/billing/`

**AI Image Generation:**
- API endpoint: `app/api/generate/route.ts`
- Uses OpenRouter API with Google Gemini 2.5 Flash Image model
- Frontend: `components/image-editor.tsx` handles uploads and displays results

### Environment Variables

Required in `.env.local`:

```env
OPENROUTER_API_KEY=              # OpenRouter API key for AI image generation
NEXT_PUBLIC_SUPABASE_URL=        # Supabase project URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=  # Supabase anon key
NEXT_PUBLIC_SITE_URL=            # Your site URL (for auth callbacks)
CREEM_API_KEY=                   # Creem.io payment API key
CREEM_WEBHOOK_SECRET=            # Webhook signature secret
CREEM_TEST_MODE=false            # Set to true for testing
```

## Code Conventions

**Style (match existing code):**
- 2-space indentation, double quotes, no semicolons
- Trailing commas where already used
- TypeScript strict mode enabled

**Import aliases** (configured in `components.json` and `tsconfig.json`):
- `@/components` → `components/`
- `@/components/ui` → `components/ui/`
- `@/lib` → `lib/`
- `@/hooks` → `hooks/`

**Component organization:**
- Keep shadcn/ui primitives in `components/ui/`
- Page sections and feature components in `components/`
- Use React functional components with hooks

**Styling:**
- Tailwind CSS v4 with CSS variables in oklch color space
- Dark mode via `:is(.dark *)` custom variant
- shadcn/ui "new-york" style with neutral base color
- Icons from Lucide React

## Important Notes

- This is a rebranded project (formerly "Nano Banana") – update legal pages if changing branding
- The codebase has no git history available in the workspace
- For commits, consider Conventional Commits format (`feat:`, `fix:`, `chore:`, etc.)
- API routes include proper error handling and type validation
- The app uses modern React patterns – Server Components where appropriate, Client Components for interactivity

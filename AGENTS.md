# Repository Guidelines

This file provides guidance for AI coding agents working in this repository.

## Build, Test, and Development Commands

Use **pnpm** as the package manager (see `pnpm-lock.yaml`).

```bash
pnpm install          # Install dependencies
pnpm dev              # Start Next.js dev server with hot reload
pnpm build            # Create production build
pnpm start            # Run production server (after build)
pnpm lint             # Run ESLint across the repo
```

### Testing

No test framework is currently configured. If adding tests:
- Use Vitest or Jest as the test runner
- Name test files `*.test.tsx` or `*.spec.tsx` near the module or in `__tests__/` folders
- Add test scripts to `package.json` (e.g., `"test": "vitest"`, `"test:single": "vitest run <path>"`)
- Mock external API calls (OpenRouter, Resend, Supabase) in tests

## Project Structure

```
app/                    # Next.js App Router
├── api/               # API routes (generate, checkout, webhook, contact)
├── auth/              # Supabase auth pages (sign-in, callback, sign-out)
├── billing/           # Subscription billing pages
├── layout.tsx         # Root layout
├── page.tsx           # Landing page
└── globals.css        # Global styles (Tailwind v4)
components/            # React components
├── ui/               # shadcn/ui primitives (Radix UI)
└── [feature].tsx     # Feature components (hero, image-editor, etc.)
hooks/                # Custom React hooks (use-mobile, use-toast)
lib/                  # Shared utilities, types, and Supabase client
├── supabase/         # Supabase client configuration
└── utils.ts          # cn() utility for className merging
public/               # Static assets
styles/               # Additional global styling
```

## Code Style & Formatting

- **Indentation**: 2 spaces
- **Quotes**: Double quotes for strings
- **Semicolons**: None (no semicolons)
- **Trailing commas**: Use where already present in the codebase
- **TypeScript**: Strict mode enabled

### Imports

```typescript
// Type-only imports use `import type`
import type React from "react"
import type { Metadata } from "next"

// Regular imports
import { NextResponse } from "next/server"
import { Button } from "@/components/ui/button"
```

**Import aliases** (from `tsconfig.json` and `components.json`):
- `@/components` - React components
- `@/components/ui` - shadcn/ui primitives
- `@/lib` - Utilities and shared code
- `@/hooks` - Custom React hooks
- `@/app` - App router files

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ImageEditor`, `Button` |
| Functions | camelCase | `handleGenerate`, `cn` |
| Types | PascalCase | `GenerateRequest`, `PricingProduct` |
| Files | kebab-case | `image-editor.tsx`, `contact-form.tsx` |

### Component Directives

```typescript
"use client"  // Add at top of client components (interactivity)
"use server"  // Add at top of server action files
```

## TypeScript Patterns

```typescript
// Prefer `type` over `interface` for simple shapes
type GenerateRequest = {
  prompt?: string
  image?: string
}

// Explicit type casting
const data = (await response.json()) as OpenRouterResponse

// Optional chaining and nullish coalescing
const email = data?.user?.email ?? "default"

// Union types for nullable values
let text: string | null = null

// Typed function parameters
const compressImage = (file: File): Promise<string> => { ... }

// Typed event handlers
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }

// Typed refs
const inputRef = useRef<HTMLInputElement | null>(null)
```

## Error Handling

### API Routes

```typescript
export async function POST(request: Request) {
  // 1. Check environment variables early
  if (!process.env.API_KEY) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 })
  }
  // 2. Validate input
  const { name, email } = await request.json()
  if (!name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  // 3. Wrap operations in try-catch
  try {
    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error("Operation failed:", error)
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
```

### Client Components

```typescript
const [error, setError] = useState<string | null>(null)
const [isLoading, setIsLoading] = useState(false)
try {
  setIsLoading(true)
  // ... async operation
} catch (err) {
  setError(err instanceof Error ? err.message : "An error occurred")
} finally {
  setIsLoading(false)
}
```

## Styling

- **Framework**: Tailwind CSS v4 with CSS variables in oklch color space
- **Class merging**: Use `cn()` utility from `@/lib/utils`
- **Variants**: Use `class-variance-authority` for complex UI components
- **Icons**: Lucide React (`lucide-react`)
- **shadcn/ui style**: "new-york" with neutral base color

```typescript
import { cn } from "@/lib/utils"
<div className={cn("base-classes", conditional && "conditional-class")} />
```

## Environment Variables

**Public** (accessible in browser) - prefix with `NEXT_PUBLIC_`:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SITE_URL`

**Server-only** (API routes and server actions only):
`OPENROUTER_API_KEY`, `RESEND_API_KEY`, `CREEM_API_KEY`, `CREEM_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`

## Security

- Never commit secrets or API keys
- Validate and sanitize all user input
- Use Supabase Row Level Security (RLS) for database access
- Ensure API routes have proper authentication checks

## Additional Notes

- `next.config.mjs` has `typescript.ignoreBuildErrors: true` - ensure type safety locally
- Images are unoptimized (`images.unoptimized: true`)
- Use Conventional Commits format: `feat:`, `fix:`, `chore:`, etc.

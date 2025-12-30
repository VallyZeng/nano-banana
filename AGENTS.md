# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router entry points (e.g., `layout.tsx`, `page.tsx`) and app-scoped CSS in `app/globals.css`.
- `components/`: page sections and feature components; `components/ui/` holds reusable UI primitives (shadcn/ui).
- `hooks/`: shared React hooks such as `use-mobile` and `use-toast`.
- `lib/`: shared utilities (for example, `lib/utils.ts`).
- `public/`: static assets served from the site root.
- `styles/`: additional global styling in `styles/globals.css`.
- `components.json`: shadcn/ui configuration and import aliases.

## Build, Test, and Development Commands
Use pnpm (see `pnpm-lock.yaml`).
- `pnpm install`: install dependencies.
- `pnpm dev`: start the Next.js dev server with hot reload.
- `pnpm build`: create a production build.
- `pnpm start`: run the production server after a build.
- `pnpm lint`: run ESLint across the repo.

## Coding Style & Naming Conventions
- TypeScript + React (TSX) with the Next.js App Router.
- Match the existing style: 2-space indentation, double quotes, no semicolons, and trailing commas where already used.
- Use import aliases from `components.json`/`tsconfig.json`: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`.
- Keep UI primitives in `components/ui` and page/section components in `components/`.

## Testing Guidelines
- No test framework or test scripts are configured yet.
- If you add tests, prefer `*.test.tsx` or `*.spec.tsx` near the module (or a `__tests__/` folder) and add the new test command to `package.json`.

## Commit & Pull Request Guidelines
- This workspace does not include git history, so no commit convention can be inferred.
- If you are introducing conventions, consider Conventional Commits (e.g., `feat: add hero section`) and keep messages imperative and scoped.
- PRs should describe user-visible changes and include screenshots for UI updates.

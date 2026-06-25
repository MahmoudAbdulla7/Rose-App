# Rose App

A Next.js storefront for discovering and ordering flowers and gifts. Supports English and Arabic (RTL) via [next-intl](https://next-intl.dev/).

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- npm (comes with Node)

## Setup

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template (no variables are required for local development yet):

   ```bash
   cp .env.example .env.local
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000). Locale-prefixed routes are used automatically (`/en`, `/ar`).

## Scripts

| Command                          | Description                                         |
| -------------------------------- | --------------------------------------------------- |
| `npm run dev`                    | Start the dev server                                |
| `npm run build`                  | Production build (runs config security check first) |
| `npm run start`                  | Serve the production build                          |
| `npm run lint`                   | Run ESLint                                          |
| `npm run type-check`             | Run TypeScript without emitting                     |
| `npm run format`                 | Format files with Prettier                          |
| `npm run format:check`           | Check formatting with Prettier                      |
| `npm run verify:config-security` | Scan critical config files for tampering or malware |

## Project structure

The codebase uses a **feature-based** layout: `app/` handles routing only, each product domain lives under `features/`, and cross-cutting code stays in `shared/`.

```
src/
  app/[locale]/              # App Router — thin route files only
  features/
    landing-page/            # Landing feature
      components/            # Feature-specific UI (e.g. header)
  i18n/                      # next-intl routing, messages, navigation
  shared/
    components/                # Reusable components used across features
    hooks/                   # Shared React hooks
    providers/               # React Query, i18n, and app-level providers
    ui/                      # shadcn/ui primitives
    lib/                     # Shared utilities and types
  proxy.ts                   # Locale middleware (next-intl)
```

### Conventions

- **`app/`** — Route files import from `features/`; avoid business logic here.
- **`features/<name>/`** — One folder per domain. Keep components, hooks, services, and types that belong to that feature together.
- **`shared/`** — Code used by two or more features (UI primitives, providers, utilities).
- **`i18n/messages/`** — Translation files per locale (`en`, `ar`).

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, shadcn/ui
- **Data:** TanStack Query (React Query)
- **i18n:** next-intl (`en`, `ar`)
- **Forms:** react-hook-form, Zod

## Security

This project uses a layered security model to reduce supply-chain risk, prevent accidental secret leaks, and catch bad changes before they reach production.

### Config integrity (`verify:config-security`)

Critical build and tooling configs are high-value targets for injected malware. A dedicated guard runs before every commit and production build:

```bash
npm run verify:config-security
```

**Watched files:** `postcss.config.mjs`, `next.config.ts`, `eslint.config.mjs`

**Checks performed:**

| Check              | Purpose                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------- |
| File size ceiling  | Detects bloated configs that may hide payloads                                               |
| Forbidden patterns | Blocks known obfuscation markers (`eval`, `Function`, `fromCharCode`, hex identifiers, etc.) |
| PostCSS structure  | Ensures required Tailwind plugin exports and no duplicate `export default` blocks            |

If a check fails, the commit or build stops with a `[config-security]` error. Review the diff for those files before retrying.

### Secrets and environment variables

- `.env*` files are gitignored; only `.env.example` is committed as a template.
- Never commit API keys, tokens, or credentials. Use `.env.local` for local overrides.
- Copy the template when setting up: `cp .env.example .env.local`

### Git hooks (Husky)

| Hook           | What runs                                                             |
| -------------- | --------------------------------------------------------------------- |
| **pre-commit** | Config security scan + lint-staged (ESLint, Prettier on staged files) |
| **commit-msg** | Conventional commit format via commitlint                             |
| **pre-push**   | `type-check` (TypeScript)                                             |

Fix lint, format, type, and config-security errors locally before pushing. Hooks are registered automatically when you run `npm install` (via the `prepare` script).

### Auth (planned)

`src/auth.ts` is reserved for authentication. Route guards and session handling will be wired here as auth is implemented.

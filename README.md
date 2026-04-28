# AnimoriX

AnimoriX is a Next.js 16 anime discovery and streaming interface built with the App Router, React 19, and TypeScript. It brings together public anime metadata, artwork enrichment, episode source resolution, authentication, and lightweight user features such as profiles and bookmarks in a single responsive app.

The project is already usable as an anime browsing and watch experience, while some product areas are still evolving. This README is meant to work both as a public project overview and as the main onboarding guide for running the app locally.

## Highlights

- Discovery-focused landing and home experience with hero content, sidebars, curated columns, and latest episode sections
- Search and browse flows through `/browser`, genre pages, type pages, and category-style listing routes
- Watch page with episode playback, season navigation, synopsis, related anime, recommendations, comments, and sharing tools
- Authentication with credentials plus Google provider support through NextAuth
- User profiles, profile editing, and bookmark persistence backed by Prisma and PostgreSQL
- Theme switching and responsive layouts across desktop and mobile
- Internal API routes for stream resolution, media proxying, and app-specific user lookup
- `watch2gether` route already exists in the app shell, but is currently a placeholder for future work

## Tech Stack

| Layer              | Tools                        | Purpose                                                        |
| ------------------ | ---------------------------- | -------------------------------------------------------------- |
| App framework      | Next.js 16, React 19         | App Router pages, layouts, API routes, rendering               |
| Language           | TypeScript                   | Typed UI, data mappers, route handlers, and shared models      |
| Styling            | Tailwind CSS v4              | Utility-first styling and layout                               |
| UI primitives      | shadcn/ui, Radix UI, Base UI | Shared building blocks for forms, dialogs, menus, and controls |
| Motion and visuals | Motion, Aceternity UI        | Animated sections, effects, and richer presentation components |
| Data fetching      | TanStack Query, Axios        | Client-side queries, mutations, caching, and API access        |
| Auth               | NextAuth v5 beta, bcryptjs   | Credentials auth, Google sign-in, and session handling         |
| Database           | Prisma, PostgreSQL           | Users, sessions, accounts, reset tokens, and bookmarks         |
| Anime metadata     | Jikan REST API               | Catalog, details, search, seasonal data, and recommendations   |
| Enrichment         | AniList GraphQL              | Banner images and relation-based season traversal              |
| Streaming          | Consumet, HLS.js             | Episode lookup, stream source resolution, and playback         |

## What the App Includes Today

### Discovery and catalog

- Landing page with branded intro sections and entry points into the app
- Home page with top anime hero content, latest episodes, featured columns, and sidebar browsing
- Search and keyword browsing through `/browser`
- Dedicated listing routes for:
  - `/new-releases`
  - `/updates`
  - `/ongoing`
  - `/recent`
  - `/genres/[genre]`
  - `/types/[type]`
- Random anime redirect flow through `/random`

### Watch experience

- Detail and watch page at `/watch/[id]`
- Episode player with stream source resolution
- Episode and season navigation
- Synopsis, recommendations, relations, comments, and share UI
- Image and media proxy routes to support external assets and stream playback

### User features

- Credentials-based sign up and sign in
- Google-based sign in through NextAuth provider support
- Current-user profile page at `/user/profile`
- Public-ish profile route at `/user/[userId]/profile`
- Edit-profile flow wired into database-backed user data
- Bookmark create/remove behavior with optimistic UI updates

## Project Structure

| Path                   | Role                                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| `src/app`              | App Router routes, layouts, loading states, global styles, and internal API handlers           |
| `src/views`            | Route-level page composition for landing, home, browser, profile, watch, and listing pages     |
| `src/widgets`          | Large UI sections such as headers, sidebars, hero blocks, players, comments, and content bands |
| `src/features`         | Focused product functionality such as auth, bookmarks, search, and sharing                     |
| `src/entities`         | Domain-level anime and user APIs, queries, mappers, and reusable entity UI                     |
| `src/shared`           | Shared UI primitives, providers, config, hooks, helpers, constants, and types                  |
| `prisma`               | Prisma schema and database modeling                                                            |
| `src/generated/prisma` | Generated Prisma client output                                                                 |
| `public`               | Static assets such as images and icons                                                         |

## Routes

| Route                    | Status      | Purpose                                                           |
| ------------------------ | ----------- | ----------------------------------------------------------------- |
| `/`                      | Active      | Landing page                                                      |
| `/home`                  | Active      | Main discovery hub                                                |
| `/browser?keyword=`      | Active      | Search results and keyword browsing                               |
| `/watch/[id]`            | Active      | Anime detail and episode watch page                               |
| `/genres/[genre]`        | Active      | Browse anime by genre                                             |
| `/types/[type]`          | Active      | Browse anime by type such as `tv`, `movie`, or `ova`              |
| `/new-releases`          | Active      | Newly released anime listing                                      |
| `/updates`               | Active      | Recently updated anime listing                                    |
| `/ongoing`               | Active      | Ongoing anime listing                                             |
| `/recent`                | Active      | Recently surfaced anime listing                                   |
| `/random`                | Active      | Redirect flow to a random anime                                   |
| `/user/profile`          | Active      | Current signed-in user profile/edit entry point                   |
| `/user/[userId]/profile` | Active      | Profile page resolved from database user data with Jikan fallback |
| `/watch2gether`          | Placeholder | Present in routing, but not implemented yet                       |

## Data and Request Flow

- Jikan is the primary source for anime catalog data, details, seasonal content, search results, and recommendations.
- AniList is used to enrich parts of the viewing experience with banner imagery and relation-based season data.
- Consumet is used for provider-specific episode lookup and stream source resolution.
- Prisma and PostgreSQL power the app's user-facing persistence layer:
  - users
  - OAuth accounts
  - sessions
  - reset tokens
  - bookmarks
- TanStack Query is used on the client for caching, async state, and optimistic updates.

### Internal API routes

| Route                     | Purpose                                                                  |
| ------------------------- | ------------------------------------------------------------------------ |
| `/api/anime/search`       | Resolve provider-specific anime and episode search results               |
| `/api/anime/stream`       | Resolve playable episode sources from supported providers                |
| `/api/proxy`              | Proxy HLS playlists and related media requests for playback support      |
| `/api/image-proxy`        | Proxy remote images with app-controlled response handling                |
| `/api/users`              | Resolve profile data from the app database, with Jikan username fallback |
| `/api/auth/[...nextauth]` | NextAuth route handlers                                                  |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

The repo already uses `.env` for Prisma-related configuration. For local development, make sure the variables below are present in your environment file.

Minimal browsing setup:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.jikan.moe/v4/
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000/
```

To enable database-backed user features as well:

```bash
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
```

To enable Google sign-in in addition to credentials auth, also provide the Google OAuth environment variables expected by your NextAuth provider configuration. In a typical setup, these are:

```bash
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the app

Visit `http://127.0.0.1:3000`.

## Environment Variables

| Variable                   | Required                                              | Purpose                                                        |
| -------------------------- | ----------------------------------------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Yes                                                   | Base URL for Jikan REST requests used by the client data layer |
| `NEXT_PUBLIC_SITE_URL`     | Yes                                                   | Canonical/public site URL used by share-related UI             |
| `DATABASE_URL`             | Required for auth, bookmarks, and profile persistence | PostgreSQL connection string used by Prisma                    |
| `AUTH_SECRET`              | Required for auth                                     | Secret used by NextAuth session/token handling                 |
| `AUTH_GOOGLE_ID`           | Optional                                              | Google OAuth client ID for Google sign-in                      |
| `AUTH_GOOGLE_SECRET`       | Optional                                              | Google OAuth client secret for Google sign-in                  |

### Setup notes

- Core anime browsing is mostly driven by public upstream APIs.
- Database-backed features such as credentials auth, sessions, profile editing, and bookmarks require a working PostgreSQL connection.
- Prisma client generation runs automatically on `postinstall`.
- The current Prisma setup uses the generated client from `src/generated/prisma`.

## Scripts

| Script                   | What it does                                                            |
| ------------------------ | ----------------------------------------------------------------------- |
| `npm run dev`            | Starts the Next.js development server                                   |
| `npm run build`          | Builds the production bundle                                            |
| `npm run start`          | Starts the production server after a build                              |
| `npm run lint`           | Runs ESLint                                                             |
| `npm run generate:types` | Regenerates Jikan API TypeScript types from the upstream OpenAPI schema |
| `postinstall`            | Runs `prisma generate` automatically after install                      |

## Current Limitations

- Streaming depends on third-party providers exposed through Consumet, so source availability and playback stability can change without notice.
- Public upstream services such as Jikan and AniList may rate-limit requests or be temporarily unavailable.
- `/watch2gether` is still a placeholder route and should be treated as planned work, not a completed feature.
- Some app metadata is still using default values in the root layout, so repository branding is ahead of the shipped runtime metadata.
- The repository currently does not include an automated test suite, so verification is mainly static checking plus manual runtime testing.

## Notes for Contributors

- This codebase follows a layered structure: routes compose views, views compose widgets, widgets consume features/entities/shared primitives.
- If you add or change routes, env requirements, or public-facing features, update this README so it remains the source of truth.
- When documenting features, prefer the current shipped behavior over planned behavior.

## Credits

- [Jikan](https://jikan.moe/) for public anime metadata
- [AniList GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/) for banner and relation enrichment
- [Consumet](https://github.com/consumet/consumet.ts) for anime provider integrations
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Prisma](https://www.prisma.io/)
- Repository origin: [BronzerSeal/AnimoraX](https://github.com/BronzerSeal/AnimoraX.git)

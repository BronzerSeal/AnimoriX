# AnimoriX

AnimoriX is a Next.js 16 anime discovery and watch platform built with the App Router, React 19, and TypeScript. It combines public anime metadata, banner art, and streaming source resolution into a single responsive interface for browsing titles, opening detail pages, and playing episodes.

## Features

- Landing page with a dedicated hero, about section, and social sharing entry points
- Home hub with top anime hero content, expandable sidebar, latest episodes, curated columns, and share widgets
- Search flow via the header input plus alphabetical browsing through `/browser?keyword=`
- Genre and type browsing for catalog exploration
- Dedicated pages for new releases, updates, ongoing series, and recent titles
- Random anime redirect flow through `/random`
- Watch page with episode player, episode list, sequel/prequel season navigation, synopsis, relations, recommendations, comments, and share UI
- Theme switching and responsive layouts for desktop and mobile screens

## Tech Stack

| Layer | Tools | Purpose |
| --- | --- | --- |
| App framework | Next.js 16, React 19 | App Router application shell, routing, API routes, rendering |
| Language | TypeScript | Static typing across UI, data mapping, and API integration |
| Styling | Tailwind CSS v4 | Utility-first styling and layout |
| UI primitives | shadcn/ui, Radix UI, Base UI | Reusable UI building blocks |
| Visual effects | Aceternity UI, Motion | Decorative backgrounds, animated inputs, and motion-heavy sections |
| Data fetching | TanStack Query, Axios | Client-side queries, caching, pagination, and HTTP requests |
| Persistence prep | Prisma, PostgreSQL | Prepared database layer and generated Prisma client |
| Anime metadata | Jikan REST API | Catalog, search, full anime info, reviews, seasonal and top-anime data |
| Enrichment | AniList GraphQL | Banner images and sequel/prequel season graph traversal |
| Streaming providers | Consumet | Episode lookup and playable source resolution |

## Project Structure

| Path | Role |
| --- | --- |
| `src/app` | App Router pages, layouts, global styles, and internal API route handlers |
| `src/views` | Route-level page composition for landing, home, watch, browser, and listing pages |
| `src/widgets` | Large UI sections such as headers, hero blocks, sidebars, players, and content sections |
| `src/features` | Focused product features like search and social sharing |
| `src/entities` | Domain-level anime models, queries, API clients, mappers, and reusable entity UI |
| `src/shared` | Shared config, hooks, UI primitives, constants, and utility helpers |
| `prisma` | Prisma schema and migration configuration |
| `generated` | Generated Prisma client output |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/home` | Main discovery hub with hero, latest episodes, and side content |
| `/browser?keyword=` | Search results and alphabetical browsing |
| `/watch/[id]` | Anime detail and episode watch page |
| `/genres/[genre]` | Browse anime by genre slug |
| `/types/[type]` | Browse anime by type such as `tv`, `movie`, or `ova` |
| `/new-releases` | Newly released anime listing |
| `/updates` | Recently updated anime listing |
| `/ongoing` | Ongoing anime listing |
| `/recent` | Recently added or surfaced anime listing |
| `/random` | Redirects to a random anime watch page |

## Data Flow

- Jikan is the primary catalog source for top anime, search results, full anime details, recommendations, reviews, seasonal data, and list pages.
- AniList GraphQL is used to enrich top anime cards with banner art and to resolve sequel/prequel relationships into a season navigation list.
- Internal Next.js API routes document the app-specific backend surface:
  - `/api/anime/search` resolves provider-specific episode lists from a title search.
  - `/api/anime/stream` resolves playable episode sources across multiple streaming providers.
  - `/api/proxy` proxies HLS playlists and media requests, rewrites playlist references, and helps with CORS-sensitive playback.
  - `/api/image-proxy` proxies remote images with caching headers.
- Prisma and PostgreSQL are prepared in the repository as infrastructure for future or adjacent workflows, but they are not the center of the current user-facing feature set.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file for the public runtime variables:

   ```bash
   NEXT_PUBLIC_API_BASE_URL=https://api.jikan.moe/v4/
   NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000/
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://127.0.0.1:3000` in your browser.

## Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Yes | Base URL for Jikan REST requests used by the client data layer |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL used by share-related UI |
| `DATABASE_URL` | Optional | PostgreSQL connection string used mainly for Prisma workflows and prepared database infrastructure |

Prisma CLI reads variables from `.env` through `prisma.config.ts`, so if you plan to run Prisma commands you can mirror `DATABASE_URL` there even when the app itself uses `.env.local` for public variables.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Builds the production bundle |
| `npm run start` | Starts the production server after a build |
| `npm run lint` | Runs ESLint |
| `npm run generate:types` | Regenerates Jikan API TypeScript types from the upstream OpenAPI schema |
| `postinstall` | Runs `prisma generate` automatically after install |

## Limitations

- Streaming depends on third-party providers exposed through Consumet, so episode source availability and playback stability can change without notice.
- Public upstream services such as Jikan and AniList may rate-limit requests or experience downtime, which can affect browsing, enrichment, or watch flows.
- The repository currently does not include an automated test suite, so validation is primarily based on static checks and manual runtime verification.

## Credits

- [Jikan](https://jikan.moe/) for public anime metadata
- [AniList GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/) for banner and relation enrichment
- [Consumet](https://github.com/consumet/consumet.ts) for anime provider integrations
- [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [TanStack Query](https://tanstack.com/query/latest), and [Prisma](https://www.prisma.io/)
- Repository origin: [BronzerSeal/AnimoraX](https://github.com/BronzerSeal/AnimoraX.git)

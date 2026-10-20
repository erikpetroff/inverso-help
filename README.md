# Inverso Help Center

A rebuild of [help.inverso.bg](https://help.inverso.bg) (currently hosted on Intercom) as a Next.js site with content managed in [Sanity](https://www.sanity.io). It's ready to deploy on Vercel.

- **Next.js 16** (App Router, Cache Components), **Tailwind CSS v4**, **shadcn/ui**
- **Sanity Studio** hosted by Sanity at [inverso-help.sanity.studio](https://inverso-help.sanity.studio) (not part of the Vercel site), with Bulgarian labels and a "Статии по колекции" desk structure
- **Bulgarian and English**: `/bg/...` and `/en/...`, with a language switcher in the header (and in the mobile menu) that links to the same page in the other language. `/` redirects based on the browser language.
- All **12 collections and 46 articles** from the live site, in Bulgarian and English, as Portable Text in `content/seed.json`
- **SEO**: per-page titles and descriptions, canonical URLs, `hreflang` alternates (incl. `x-default`), Open Graph and Twitter cards, JSON-LD (`WebSite` + search action, `BreadcrumbList`, `CollectionPage`, `TechArticle`), and a multilingual `sitemap.xml`
- **Open Graph images** generated per page (home, collection, article) in both languages; editors can upload a custom share image in Sanity instead
- Live search (title, description and full text), table of contents, related articles, article feedback
- Redirects for old Intercom URLs (`/bg/articles/11018442-…` → `/bg/articles/1-dostap-do-modula-fakturi`), so links keep working after you move the DNS

## Run locally

```bash
npm install
npm run dev        # http://localhost:4317
```

Without any environment variables the site reads `content/seed.json`, so it works out of the box. Open [/bg](http://localhost:4317/bg) or [/en](http://localhost:4317/en).

## Connect Sanity

The Sanity project is `nvshhh54` (dataset `production`).

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SANITY_PROJECT_ID=nvshhh54`.
2. Create an **Editor** token at [sanity.io/manage](https://www.sanity.io/manage) under **API → Tokens**, set it as `SANITY_API_WRITE_TOKEN`, and import the existing articles:

   ```bash
   npm run seed            # creates missing documents and leaves existing edits alone
   npm run seed -- --force # overwrites everything with the seed content
   ```

3. Restart `npm run dev`.

### Studio

Editors work in the Studio hosted by Sanity at [inverso-help.sanity.studio](https://inverso-help.sanity.studio); the Vercel site has no `/studio` route. Its configuration (`sanity.config.ts`, `sanity.cli.ts`, `src/sanity/`) lives in this repo. After changing the schema or desk structure, redeploy it:

```bash
npx sanity login        # once
npm run studio:deploy
```

`npm run studio` runs it locally at [localhost:3333](http://localhost:3333). Invite editors under **Members** at [sanity.io/manage](https://www.sanity.io/manage).

### Content model

| Type | Purpose |
| --- | --- |
| `siteSettings` (singleton) | Per language: name, homepage headline, meta description, search placeholder, footer. Shared: logo, default share image, main site URL |
| `helpCollection` | Per language: title, slug, description. Shared: icon, order |
| `article` | Per language: title, slug, description, body (headings, lists, links, images, dividers), optional SEO title. Shared: collection, order, author, share image |
| `author` | Name and avatar shown in article bylines |

Every article, collection and the site settings have a **Български** tab and an **English** tab in the Studio. A document only appears on the English site once its English title and slug are filled in; the **Missing English translation** list in the Studio shows what still needs translating. Slugs are generated from the title of each language, with Bulgarian transliterated (`Фактури` → `fakturi`).

### Instant updates after publishing

Pages are cached for up to an hour. To refresh them as soon as an editor publishes:

1. Set `SANITY_REVALIDATE_SECRET` to a random string, both locally and in Vercel.
2. In Sanity, go to **API → Webhooks** and add a webhook:
   - URL: `https://<your-domain>/api/revalidate`
   - Dataset: `production`, trigger on create, update and delete
   - Filter: `_type in ["article", "helpCollection", "siteSettings", "author"]`
   - Secret: the same value as `SANITY_REVALIDATE_SECRET`

## Deploy to Vercel

1. Import the repository in Vercel. The framework is detected as Next.js, so no extra configuration is needed.
2. Add the environment variables from `.env.example` (everything except `SANITY_API_WRITE_TOKEN`).
3. When you're ready to switch over, point `help.inverso.bg` at Vercel. Old Intercom links under `/bg/...` are redirected automatically.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server on port 4317 |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` / `npm run typecheck` | ESLint and TypeScript |
| `npm run seed` | Import `content/seed.json` into Sanity |
| `npm run studio` / `npm run studio:deploy` | Run the Studio locally / deploy it to inverso-help.sanity.studio |

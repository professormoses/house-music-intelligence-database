# Deploying to Vercel (and connecting it to House Music LA Radar)

This app is configured to deploy exactly like your **House Music LA Radar** app:
the Prisma datasource auto-switches to Postgres in production
(`scripts/set-db-provider.mjs`), the build runs `prisma db push` + seed, and a
daily Vercel cron refreshes the data.

The code is ready. These steps happen in **your** GitHub + Vercel accounts.

---

## 1. Push the code to GitHub

A git repo is already initialized and committed. Create a repo and push:

```bash
cd ~/Desktop/Agent0/house-music-intelligence-db
# create an empty repo at github.com/professormoses/house-music-intelligence-db (no README)
git branch -M main
git remote add origin https://github.com/professormoses/house-music-intelligence-db.git
git push -u origin main
```

## 2. Create the project on Vercel

1. Vercel dashboard → **Add New… → Project** → import `house-music-intelligence-db`.
2. Framework preset: **Next.js** (auto-detected). Leave build/output defaults.
3. Don't deploy yet — add the database + env vars first (next steps).

## 3. Add a Postgres database

In the new Vercel project → **Storage → Create Database → Postgres** (Neon).
Vercel automatically injects `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED`
(direct). That's all the DB config the app needs — the provider switches itself.

> Or reuse the LA Radar database if you want one shared DB — just paste the same
> `DATABASE_URL` / `DATABASE_URL_UNPOOLED` here. (Tables are namespaced by model,
> so they won't collide, but a separate DB is cleaner.)

## 4. Set environment variables (Project → Settings → Environment Variables)

| Key | Value |
| --- | --- |
| `SITE_URL` | your final URL, e.g. `https://artists.YOURDOMAIN.com` (or the `*.vercel.app` URL for now) |
| `ADMIN_TOKEN` | a long random string (your admin password) |
| `CRON_SECRET` | a long random string (authenticates the nightly cron) |
| `LA_RADAR_URL` | your LA Radar URL, e.g. `https://YOURDOMAIN.com` (adds an "LA Radar" nav link) |
| `MUSICBRAINZ_CONTACT` | your email (polite crawler header) |
| *(optional)* `SPOTIFY_CLIENT_ID/SECRET`, `DISCOGS_TOKEN`, `YOUTUBE_API_KEY` | unlock more connectors |

`DATABASE_URL` + `DATABASE_URL_UNPOOLED` are added automatically by step 3.

## 5. Deploy

Click **Deploy**. The build runs `set-db-provider → prisma db push → seed → next
build`, so the live database is created and **seeded with ~200 artists + the
knowledge graph automatically** on first deploy. You'll get a live URL like
`house-music-intelligence-database.vercel.app` — open it and test.

Admin: `https://<your-url>/admin` → sign in with your `ADMIN_TOKEN`.

---

## 6. Make it "one site" with LA Radar

Two clean options — pick one:

### Option A — Subdomain (recommended, simplest)
Point a subdomain at this project. In **this** Vercel project → Settings →
Domains → add `artists.YOURDOMAIN.com` (LA Radar keeps `YOURDOMAIN.com`).
Set `SITE_URL=https://artists.YOURDOMAIN.com`. Cross-links already work via
`LA_RADAR_URL`. Independent deploys, zero routing complexity.

### Option B — Same domain, under a path (e.g. `/artists`)
Keep one domain (LA Radar) and proxy a path to this app. In the **LA Radar**
repo's `next.config.mjs` add:

```js
async rewrites() {
  return [
    { source: '/artists', destination: 'https://<this-app>.vercel.app/' },
    { source: '/artists/:path*', destination: 'https://<this-app>.vercel.app/:path*' },
  ];
}
```

(Tell me if you want Option B — the artist app needs a `basePath: '/artists'`
set so its internal links/assets resolve under the path. I'll wire that up.)

---

## 7. Daily auto-refresh (already configured)
`vercel.json` runs `GET /api/repopulate?cron=1` daily at 12:00 UTC, authenticated
by `CRON_SECRET`. It refreshes a batch of artists from the live connectors.

## Notes
- File-based export is disabled on Vercel (read-only FS); use the live
  `/datasets/*.csv|json|ndjson` endpoints or Google Sheets export instead.
- To re-run a full seed/grow against the prod DB locally:
  `DATABASE_URL="<prod unpooled url>" npm run db:seed`.

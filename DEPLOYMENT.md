# Deployment Guide

## 1. Choose a database

**Local / small:** SQLite (default). Nothing to do.

**Production:** Postgres.

1. In `prisma/schema.prisma`, change the datasource provider:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Set `DATABASE_URL="postgresql://user:pass@host:5432/hmid?schema=public"`.
3. Run `npx prisma db push` then `npm run db:seed`.

## 2. Set environment variables

Copy `.env.example` → `.env` (or set in your host's dashboard). Required:
`DATABASE_URL`, `SITE_URL` (your public origin, e.g. `https://housemusicdb.com`), `ADMIN_TOKEN`.
Optional API keys unlock more connectors.

## 3. Deploy the app

### Vercel (easiest)
- Import the repo. Build command `npm run build`, output is automatic.
- Add env vars. Use a hosted Postgres (Neon/Supabase/RDS) — Vercel is serverless, so SQLite won't persist.
- After first deploy, run `prisma db push` + seed via a one-off job or locally pointed at the prod DB.

### Render / Fly / Railway
- Web service: build `npm run build`, start `npm start`.
- Add a managed Postgres. Run migrations on first boot.

### Docker
```bash
docker compose up --build      # app + postgres + redis
```
The compose file runs `prisma db push && db:seed && start` for the app on first boot.

## 4. Verify agent-readiness after deploy

```bash
curl -s https://YOURDOMAIN/llms.txt
curl -s https://YOURDOMAIN/sitemap.xml
curl -s https://YOURDOMAIN/api/artists/black-coffee.json | jq .confidence_score
curl -s https://YOURDOMAIN/artist/black-coffee.md | head
```

Then validate JSON-LD (Google Rich Results Test) and submit `sitemap.xml` in Google/Bing webmaster
tools. Confirm `robots.txt` welcomes `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`.

## 5. Schedule refresh

Cron (host) or a platform scheduler:
```cron
0 3 * * *  cd /app && npm run repopulate >> repopulate.log 2>&1
30 3 * * * cd /app && npm run export:sheets >> export.log 2>&1
```
For high volume, move the pipeline behind a queue (BullMQ + Redis) — the `redis` service is already
in `docker-compose.yml`.

## 6. Scaling notes

- `llms-full.txt` inlines the whole corpus; shard or paginate it past a few thousand artists.
- Add caching/CDN in front of the read-only routes (they send `cache-control` already).
- Promote more JSON fields to real columns if you need to filter on them at scale.

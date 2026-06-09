// Auto-configures the Prisma datasource from DATABASE_URL so the SAME codebase
// runs on local SQLite AND hosted Postgres (Vercel/Neon/Supabase) with no
// manual edits. Mirrors the House Music LA Radar pattern so both apps deploy
// identically.
//
//   DATABASE_URL starts with "file:"  -> sqlite   (local dev), no directUrl
//   anything else (postgres://...)    -> postgresql (production) + directUrl
//
// On Postgres we also add `directUrl = env("DATABASE_URL_UNPOOLED")` so Prisma
// uses the DIRECT (non-pooled) connection for `db push` / migrations, while the
// app runtime uses the pooled DATABASE_URL. Vercel's Neon/Postgres integration
// injects both vars automatically.
//
// Runs automatically on predev / prebuild / postinstall.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'prisma', 'schema.prisma');

const url = process.env.DATABASE_URL || 'file:./dev.db';
const provider = url.startsWith('file:') ? 'sqlite' : 'postgresql';

let schema = readFileSync(schemaPath, 'utf8');
schema = schema.replace(/provider\s*=\s*"(sqlite|postgresql)"/, `provider = "${provider}"`);

const directLine = `  directUrl = env("DATABASE_URL_UNPOOLED")`;
const hasDirect = /\n\s*directUrl\s*=\s*env\("DATABASE_URL_UNPOOLED"\)/.test(schema);

if (provider === 'postgresql' && !hasDirect) {
  schema = schema.replace(/(url\s*=\s*env\("DATABASE_URL"\))/, `$1\n${directLine}`);
} else if (provider === 'sqlite' && hasDirect) {
  schema = schema.replace(/\n\s*directUrl\s*=\s*env\("DATABASE_URL_UNPOOLED"\)/, '');
}

writeFileSync(schemaPath, schema);
console.log(`[set-db-provider] provider=${provider}${provider === 'postgresql' ? ' (+directUrl)' : ''}`);

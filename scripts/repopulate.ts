// Headless repopulate — run via `npm run repopulate` or a cron job.
import { loadEnv } from './_env';
loadEnv();

async function main() {
  const { repopulate } = await import('../src/lib/pipeline');
  const limitArg = process.argv.find((a) => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : undefined;
  console.log('Repopulating', limit ? `(limit ${limit})` : '(all artists)…');
  const summary = await repopulate({ limit });
  console.log(JSON.stringify(summary, null, 2));
  const { prisma } = await import('../src/lib/db');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

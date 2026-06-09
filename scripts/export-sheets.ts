// Export the whole database to Google Sheets (if configured) and/or local files.
import { loadEnv } from './_env';
loadEnv();

async function main() {
  const { exportToGoogleSheets, exportToFiles } = await import('../src/lib/sheets');
  const sheets = await exportToGoogleSheets();
  console.log('Google Sheets:', JSON.stringify(sheets));
  const files = await exportToFiles();
  console.log('Local files:', JSON.stringify(files));
  const { prisma } = await import('../src/lib/db');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

// Tiny .env loader so standalone scripts (tsx) get the same env as Next.
import { readFileSync } from 'fs';
import { resolve } from 'path';

export function loadEnv(file = '.env') {
  try {
    const txt = readFileSync(resolve(process.cwd(), file), 'utf8');
    for (const line of txt.split('\n')) {
      const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const key = m[1];
      let val = m[2];
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
        val = val.slice(1, -1);
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {
    /* no .env — rely on real environment */
  }
}

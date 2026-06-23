/**
 * TURSO DATABASE CLIENT
 * Singleton instance of the LibSQL client for server-side data access.
 * NOTE: file: URLs are only supported by Node.js (seed scripts).
 * Cloudflare Workers runtime requires libsql://, wss://, https://, or http:// URLs.
 */

import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';
import { DB_URL, DB_TOKEN } from './env';
import * as schema from './schema';

if (!DB_URL) {
  throw new Error(
    'TURSO_DATABASE_URL is required. Please set it in your environment variables or .env file.'
  );
}

const client = createClient({
  url: DB_URL,
  authToken: DB_TOKEN,
});

export const db = drizzle(client, { schema });

/**
 * TURSO DATABASE CLIENT
 * Singleton instance of the LibSQL client for server-side data access.
 * NOTE: file: URLs are only supported by Node.js (seed scripts).
 * Cloudflare Workers runtime requires libsql://, wss://, https://, or http:// URLs.
 */

import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';
import { getEnv } from './env';
import * as schema from './schema';

let _db: any = null;

function getDb() {
  if (_db) return _db;

  const url = getEnv('TURSO_DATABASE_URL');
  const token = getEnv('TURSO_AUTH_TOKEN');

  if (!url) {
    throw new Error(
      'TURSO_DATABASE_URL is required. Please set it in your environment variables or .env file.'
    );
  }

  const client = createClient({
    url: url,
    authToken: token,
  });

  _db = drizzle(client, { schema });
  return _db;
}

export const db = new Proxy({} as any, {
  get(_target, prop, receiver) {
    const instance = getDb();
    const value = Reflect.get(instance, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  }
}) as unknown as ReturnType<typeof drizzle<typeof schema>>;

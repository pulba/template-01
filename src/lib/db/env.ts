/**
 * DATABASE ENVIRONMENT CONFIGURATION
 * Centralized access to Turso credentials with validation.
 * Supports both Astro (import.meta.env) and Node.js (process.env) environments.
 */

const getEnv = (key: string) => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  // Cloudflare Workers global scope
  if (typeof globalThis !== 'undefined' && (globalThis as any)[key]) {
    return (globalThis as any)[key];
  }
  return undefined;
};

export const DB_URL = getEnv('TURSO_DATABASE_URL');
export const DB_TOKEN = getEnv('TURSO_AUTH_TOKEN');

if (!DB_URL) {
  console.warn('TURSO_DATABASE_URL is not defined in environment variables.');
}

if (!DB_TOKEN) {
  console.warn('TURSO_AUTH_TOKEN is not defined in environment variables.');
}

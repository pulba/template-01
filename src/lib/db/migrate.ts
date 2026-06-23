/**
 * DIRECT MIGRATION SCRIPT
 * Creates all tables in the remote Turso database using raw SQL.
 * This bypasses drizzle-kit push interactive prompts.
 * Run: npx tsx src/lib/db/migrate.ts
 */

import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error('❌ TURSO_DATABASE_URL is not set in .env');
  process.exit(1);
}

const client = createClient({ url, authToken });

const migrations = [
  `CREATE TABLE IF NOT EXISTS school_profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    school_name TEXT NOT NULL,
    school_logo TEXT DEFAULT '',
    school_favicon TEXT DEFAULT '',
    short_description TEXT,
    terminology TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    social_facebook TEXT,
    social_instagram TEXT,
    social_youtube TEXT,
    accreditation TEXT,
    npsn TEXT,
    founded_year TEXT,
    curriculum TEXT,
    history_text TEXT,
    history_image TEXT,
    profile_hero_title TEXT,
    profile_hero_subtitle TEXT,
    profile_hero_image TEXT,
    google_maps_embed_url TEXT,
    vision_text TEXT NOT NULL,
    mission_items TEXT NOT NULL,
    principal_name TEXT NOT NULL,
    principal_message TEXT NOT NULL,
    principal_signature TEXT NOT NULL,
    principal_image TEXT NOT NULL,
    principal_quote TEXT,
    ppdb_is_active INTEGER DEFAULT 0,
    ppdb_title TEXT,
    ppdb_description TEXT,
    theme_color_primary TEXT DEFAULT '#00288e',
    theme_color_background TEXT DEFAULT '#f8fafc',
    theme_color_surface TEXT DEFAULT '#ffffff',
    theme_color_text TEXT DEFAULT '#334155',
    theme_color_heading TEXT DEFAULT '#0f172a',
    theme_color_link TEXT DEFAULT '#00288e',
    theme_color_link_hover TEXT DEFAULT '#001a5c',
    theme_color_border TEXT DEFAULT '#e2e8f0',
    theme_color_accent TEXT DEFAULT '#3b82f6',
    theme_color_badge TEXT DEFAULT '#eff6ff',
    theme_color_secondary TEXT DEFAULT '#855300',
    theme_color_tertiary TEXT DEFAULT '#4b1c00',
    theme_color_neutral TEXT DEFAULT '#64748b',
    theme_font_family TEXT DEFAULT 'Inter',
    theme_radius TEXT DEFAULT 'md',
    theme_shadow_level TEXT DEFAULT 'md'
  )`,
  `CREATE TABLE IF NOT EXISTS banners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    primary_cta_text TEXT,
    primary_cta_href TEXT,
    primary_cta_icon TEXT,
    secondary_cta_text TEXT,
    secondary_cta_href TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1
  )`,
  `CREATE TABLE IF NOT EXISTS school_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stat_value TEXT NOT NULL,
    stat_label TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT,
    excerpt TEXT,
    status TEXT DEFAULT 'draft',
    author_id TEXT,
    featured_image TEXT,
    tags TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    view_count INTEGER DEFAULT 0,
    created_at TEXT,
    updated_at TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS agendas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    event_date TEXT NOT NULL,
    event_time TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS gallery_albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    cover_image_url TEXT,
    created_at TEXT,
    updated_at TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS galleries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_id INTEGER,
    image_url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    category TEXT DEFAULT 'Umum',
    span TEXT DEFAULT 'small',
    sort_order INTEGER DEFAULT 0,
    is_featured INTEGER DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    subject TEXT,
    image_url TEXT NOT NULL,
    bio TEXT,
    sort_order INTEGER DEFAULT 0,
    category TEXT DEFAULT 'Guru'
  )`,
  `CREATE TABLE IF NOT EXISTS inbox (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL,
    is_read INTEGER DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS osis_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT,
    photo TEXT,
    description TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS extracurriculars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT DEFAULT 'Umum',
    short_description TEXT,
    description TEXT,
    coach_name TEXT,
    contact_person TEXT,
    contact_whatsapp TEXT,
    schedule TEXT,
    image_url TEXT,
    achievements_count INTEGER DEFAULT 0,
    achievements_list TEXT,
    is_active INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at TEXT,
    updated_at TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS menus (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    parent_id INTEGER,
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at TEXT,
    updated_at TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS majors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    thumbnail TEXT,
    seo_title TEXT,
    seo_description TEXT,
    is_active INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at TEXT,
    updated_at TEXT
  )`,
  // Migrations for existing databases
  `ALTER TABLE galleries ADD COLUMN album_id INTEGER`,
];

async function runMigrations() {
  console.log('🚀 Starting database migration to Turso...\n');
  
  for (const sql of migrations) {
    const tableName = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1];
    const alterMatch = sql.match(/ALTER TABLE (\w+) ADD COLUMN (\w+)/);
    try {
      await client.execute(sql);
      if (tableName) {
        console.log(`  ✅ Table "${tableName}" OK`);
      } else if (alterMatch) {
        console.log(`  ✅ Added column "${alterMatch[2]}" to "${alterMatch[1]}"`);
      }
    } catch (err: any) {
      if (alterMatch && err.message?.includes('duplicate column')) {
        console.log(`  ⏭️  Column "${alterMatch[2]}" already exists in "${alterMatch[1]}", skipping.`);
      } else {
        console.error(`  ❌ Failed for "${tableName || alterMatch?.[1]}": ${err.message}`);
      }
    }
  }
  
  console.log('\n✅ Migration complete!');
}

runMigrations().catch(console.error);

import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

/**
 * SCHOOL PROFILE (Singleton)
 * Stores institutional settings and high-level content.
 */
export const schoolProfile = sqliteTable('school_profile', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  schoolName: text('school_name').notNull(),
  schoolLogo: text('school_logo').default(''),
  schoolFavicon: text('school_favicon').default(''),
  shortDescription: text('short_description'), // For footer
  terminology: text('terminology'),
  
  // Identity & Contact
  address: text('address'),
  phone: text('phone'),
  email: text('email'),
  socialFacebook: text('social_facebook'),
  socialInstagram: text('social_instagram'),
  socialYoutube: text('social_youtube'),
  
  // Accreditation & Legal
  accreditation: text('accreditation'),
  npsn: text('npsn'),
  foundedYear: text('founded_year'),
  curriculum: text('curriculum'),
  
  // Content: Profil Page
  historyText: text('history_text'),
  historyImage: text('history_image'),
  profileHeroTitle: text('profile_hero_title'),
  profileHeroSubtitle: text('profile_hero_subtitle'),
  profileHeroImage: text('profile_hero_image'),
  
  // Content: Kontak Page
  googleMapsEmbedUrl: text('google_maps_embed_url'),
  
  // Content: Home Page Features
  visionText: text('vision_text').notNull(),
  missionItems: text('mission_items').notNull(), // JSON string array
  principalName: text('principal_name').notNull(),
  principalMessage: text('principal_message').notNull(), // JSON string array
  principalSignature: text('principal_signature').notNull(),
  principalImage: text('principal_image').notNull(),
  principalQuote: text('principal_quote'),
  ppdbIsActive: integer('ppdb_is_active', { mode: 'boolean' }).default(false),
  ppdbTitle: text('ppdb_title'),
  ppdbDescription: text('ppdb_description'),
  ppdbNotes: text('ppdb_notes'),

  // Visual Skin / Theme Tokens
  // 10 Human Color Controls
  themeColorPrimary: text('theme_color_primary').default('#00288e'), // 1. Warna Utama
  themeColorBackground: text('theme_color_background').default('#f8fafc'), // 2. Warna Latar Belakang
  themeColorSurface: text('theme_color_surface').default('#ffffff'), // 3. Warna Permukaan Card
  themeColorText: text('theme_color_text').default('#334155'), // 4. Font Color
  themeColorHeading: text('theme_color_heading').default('#0f172a'), // 5. Heading Color
  themeColorLink: text('theme_color_link').default('#00288e'), // 6. Warna Link
  themeColorLinkHover: text('theme_color_link_hover').default('#001a5c'), // 7. Link Hover
  themeColorBorder: text('theme_color_border').default('#e2e8f0'), // 8. Warna Border
  themeColorAccent: text('theme_color_accent').default('#3b82f6'), // 9. Blockquote / Accent Border
  themeColorBadge: text('theme_color_badge').default('#eff6ff'), // 10. Warna Badge Pendukung

  // Deprecated Tokens (Kept for safe migration)
  themeColorSecondary: text('theme_color_secondary').default('#855300'),
  themeColorTertiary: text('theme_color_tertiary').default('#4b1c00'),
  themeColorNeutral: text('theme_color_neutral').default('#64748b'),
  
  themeFontFamily: text('theme_font_family').default('Inter'),
  themeRadius: text('theme_radius').default('md'),
  themeShadowLevel: text('theme_shadow_level').default('md'),
});

/**
 * BANNERS (Hero Slider)
 */
export const banners = sqliteTable('banners', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  primaryCtaText: text('primary_cta_text'),
  primaryCtaHref: text('primary_cta_href'),
  primaryCtaIcon: text('primary_cta_icon'),
  secondaryCtaText: text('secondary_cta_text'),
  secondaryCtaHref: text('secondary_cta_href'),
  sortOrder: integer('sort_order').default(0),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

/**
 * SCHOOL STATS
 */
export const schoolStats = sqliteTable('school_stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  statValue: text('stat_value').notNull(),
  statLabel: text('stat_label').notNull(),
  iconName: text('icon_name').notNull(),
  sortOrder: integer('sort_order').default(0),
});

/**
 * POSTS (News)
 */
export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content'),
  excerpt: text('excerpt'),
  status: text('status', { enum: ['draft', 'published', 'archived'] }).default('draft'),
  authorId: text('author_id'),
  featuredImage: text('featured_image'),
  tags: text('tags'),
  metaDescription: text('meta_description'),
  metaKeywords: text('meta_keywords'),
  viewCount: integer('view_count').default(0),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});

/**
 * AGENDAS (Events)
 */
export const agendas = sqliteTable('agendas', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  eventDate: text('event_date').notNull(), // ISO Date String
  eventTime: text('event_time').notNull(),
  location: text('location').notNull(),
  description: text('description'),
});

/**
 * GALLERIES (Media)
 */
export const galleries = sqliteTable('galleries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  albumId: integer('album_id'),
  imageUrl: text('image_url').notNull(),
  altText: text('alt_text').notNull(),
  category: text('category').default('Umum'),
  span: text('span', { enum: ['large', 'small'] }).default('small'),
  sortOrder: integer('sort_order').default(0),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false),
});

/**
 * STAFF (Teachers & Staff)
 */
export const staff = sqliteTable('staff', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  title: text('title').notNull(), // e.g., "Kepala Sekolah", "Guru Mata Pelajaran"
  subject: text('subject'), // e.g., "Matematika", "Bahasa Inggris"
  imageUrl: text('image_url').notNull(),
  bio: text('bio'),
  sortOrder: integer('sort_order').default(0),
  category: text('category').default('Guru'), // e.g., "Guru", "Staff", "Pimpinan"
});

/**
 * INBOX (Contact Messages)
 */
export const inbox = sqliteTable('inbox', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  createdAt: text('created_at').notNull(), // ISO Date String
  isRead: integer('is_read', { mode: 'boolean' }).default(false),
});

/**
 * OSIS MEMBERS
 */
export const osisMembers = sqliteTable('osis_members', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  position: text('position'),
  photo: text('photo'),
  description: text('description'),
});

/**
 * EXTRACURRICULARS (Ekskul)
 */
export const extracurriculars = sqliteTable('extracurriculars', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  category: text('category').default('Umum'),
  shortDescription: text('short_description'),
  description: text('description'),
  coachName: text('coach_name'),
  contactPerson: text('contact_person'),
  contactWhatsapp: text('contact_whatsapp'),
  schedule: text('schedule'),
  imageUrl: text('image_url'),
  achievementsCount: integer('achievements_count').default(0),
  achievementsList: text('achievements_list'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});

/**
 * GALLERY ALBUMS
 */
export const galleryAlbums = sqliteTable('gallery_albums', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  coverImageUrl: text('cover_image_url'),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});

/**
 * MENUS (Website Navigation)
 */
export const menus = sqliteTable('menus', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  label: text('label').notNull(),
  href: text('href').notNull(),
  parentId: integer('parent_id'),
  sortOrder: integer('sort_order').default(0),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});

/**
 * MAJORS (Program Keahlian / Jurusan)
 */
export const majors = sqliteTable('majors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content'),
  thumbnail: text('thumbnail'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});

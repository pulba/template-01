CREATE TABLE `agendas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`event_date` text NOT NULL,
	`event_time` text NOT NULL,
	`location` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `agendas_slug_unique` ON `agendas` (`slug`);--> statement-breakpoint
CREATE TABLE `banners` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`subtitle` text NOT NULL,
	`description` text NOT NULL,
	`image_url` text NOT NULL,
	`primary_cta_text` text,
	`primary_cta_href` text,
	`primary_cta_icon` text,
	`secondary_cta_text` text,
	`secondary_cta_href` text,
	`sort_order` integer DEFAULT 0,
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `extracurriculars` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`category` text DEFAULT 'Umum',
	`short_description` text,
	`description` text,
	`coach_name` text,
	`contact_person` text,
	`contact_whatsapp` text,
	`schedule` text,
	`image_url` text,
	`achievements_count` integer DEFAULT 0,
	`achievements_list` text,
	`is_active` integer DEFAULT true,
	`sort_order` integer DEFAULT 0,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `extracurriculars_slug_unique` ON `extracurriculars` (`slug`);--> statement-breakpoint
CREATE TABLE `galleries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`album_id` integer,
	`image_url` text NOT NULL,
	`alt_text` text NOT NULL,
	`category` text DEFAULT 'Umum',
	`span` text DEFAULT 'small',
	`sort_order` integer DEFAULT 0,
	`is_featured` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `gallery_albums` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`cover_image_url` text,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `gallery_albums_slug_unique` ON `gallery_albums` (`slug`);--> statement-breakpoint
CREATE TABLE `inbox` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`subject` text NOT NULL,
	`message` text NOT NULL,
	`created_at` text NOT NULL,
	`is_read` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `menus` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`label` text NOT NULL,
	`href` text NOT NULL,
	`parent_id` integer,
	`sort_order` integer DEFAULT 0,
	`is_active` integer DEFAULT true,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE TABLE `osis_members` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`position` text,
	`photo` text,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`content` text,
	`excerpt` text,
	`status` text DEFAULT 'draft',
	`author_id` text,
	`featured_image` text,
	`tags` text,
	`meta_description` text,
	`meta_keywords` text,
	`view_count` integer DEFAULT 0,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);--> statement-breakpoint
CREATE TABLE `school_profile` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`school_name` text NOT NULL,
	`school_logo` text DEFAULT '',
	`school_favicon` text DEFAULT '',
	`short_description` text,
	`terminology` text,
	`address` text,
	`phone` text,
	`email` text,
	`social_facebook` text,
	`social_instagram` text,
	`social_youtube` text,
	`accreditation` text,
	`npsn` text,
	`founded_year` text,
	`curriculum` text,
	`history_text` text,
	`history_image` text,
	`profile_hero_title` text,
	`profile_hero_subtitle` text,
	`profile_hero_image` text,
	`google_maps_embed_url` text,
	`vision_text` text NOT NULL,
	`mission_items` text NOT NULL,
	`principal_name` text NOT NULL,
	`principal_message` text NOT NULL,
	`principal_signature` text NOT NULL,
	`principal_image` text NOT NULL,
	`principal_quote` text,
	`ppdb_is_active` integer DEFAULT false,
	`ppdb_title` text,
	`ppdb_description` text,
	`theme_color_primary` text DEFAULT '#00288e',
	`theme_color_background` text DEFAULT '#f8fafc',
	`theme_color_surface` text DEFAULT '#ffffff',
	`theme_color_text` text DEFAULT '#334155',
	`theme_color_heading` text DEFAULT '#0f172a',
	`theme_color_link` text DEFAULT '#00288e',
	`theme_color_link_hover` text DEFAULT '#001a5c',
	`theme_color_border` text DEFAULT '#e2e8f0',
	`theme_color_accent` text DEFAULT '#3b82f6',
	`theme_color_badge` text DEFAULT '#eff6ff',
	`theme_color_secondary` text DEFAULT '#855300',
	`theme_color_tertiary` text DEFAULT '#4b1c00',
	`theme_color_neutral` text DEFAULT '#64748b',
	`theme_font_family` text DEFAULT 'Inter',
	`theme_radius` text DEFAULT 'md',
	`theme_shadow_level` text DEFAULT 'md'
);
--> statement-breakpoint
CREATE TABLE `school_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`stat_value` text NOT NULL,
	`stat_label` text NOT NULL,
	`icon_name` text NOT NULL,
	`sort_order` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `staff` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`title` text NOT NULL,
	`subject` text,
	`image_url` text NOT NULL,
	`bio` text,
	`sort_order` integer DEFAULT 0,
	`category` text DEFAULT 'Guru'
);

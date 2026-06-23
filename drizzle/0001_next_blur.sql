CREATE TABLE `majors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text,
	`content` text,
	`thumbnail` text,
	`seo_title` text,
	`seo_description` text,
	`is_active` integer DEFAULT true,
	`sort_order` integer DEFAULT 0,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `majors_slug_unique` ON `majors` (`slug`);
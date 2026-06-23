# Final Launch Checklist

Use this checklist to verify the institutional school website before and immediately after production launch.

## Pre-Launch (Local Verification)
- [x] **Database Connectivity**: Verified remote Turso database connection (`npx astro build` passes without `file:` protocol errors).
- [x] **Schema Integrity**: Ran `reset_migrate.ts` and `run_seed.ts` to ensure remote tables are perfectly structured and populated.
- [x] **Build Output**: Confirmed `npx astro build` generates a clean `dist` directory with Cloudflare SSR worker entrypoints.
- [x] **SEO Verification**: Checked `SEOHead.astro` for canonical tags, and verified `@astrojs/sitemap` integration in `astro.config.mjs`.
- [x] **Performance Optimization**: Verified `loading="eager"` on critical Hero images and `loading="lazy"` on below-the-fold assets.
- [x] **API Endpoints**: Confirmed `/api/contact` has server-side validation and secure database insertion logic.

## Post-Launch (Live Environment)
- [ ] **Routing Check**: Click through all main navigation links (Berita, Profil, Agenda, Galeri, Guru & Staff, Kontak).
- [ ] **Dynamic Data**: Verify that live data is pulling from Turso (e.g., checking if the generated seed news and agendas appear correctly).
- [ ] **Form Submission**: Test the Contact Form (`/kontak`) and ensure messages are successfully written to the `inbox` table.
- [ ] **Mobile Responsiveness**: Check the site on a mobile device or responsive emulator to ensure the navigation drawer and grid layouts adapt properly.
- [ ] **Sitemap Indexing**: Verify that `https://your-domain.com/sitemap-index.xml` is accessible and valid.
- [ ] **Robots.txt**: Verify that `https://your-domain.com/robots.txt` is accessible and correctly pointing to the sitemap.

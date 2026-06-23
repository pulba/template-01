import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://institutional-school.pages.dev',
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
  }),

  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/.thorium-profile/**'],
      },
    },
  },

  integrations: [sitemap()],
  devToolbar: {
    enabled: false,
  },
});
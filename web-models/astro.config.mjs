// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://moncada-models.com', // Reemplaza con tu dominio real
  output: "static",

  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },

  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/pedidos/registros'),
    })
  ],
});
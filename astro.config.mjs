import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build
export default defineConfig({
  site: 'https://www.nikestone.com',
  trailingSlash: 'never',          // canonical pulito senza slash finale (es. /lavori), coerente con sitemap/JSON-LD
  integrations: [tailwind({ applyBaseStyles: false })],
  image: {
    // Astro optimizes/compresses images at build (webp/avif, responsive)
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});

import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    vue(),

    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
});

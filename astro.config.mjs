// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "server",

  integrations: [icon()],
  adapter: vercel({
    // Optional: Add config like imageService: true if using Vercel's Image Optimization
  }),
  vite: {
    envPrefix: "CONTENTFUL_",
    plugins: [tailwindcss()],
  },
});

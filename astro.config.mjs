// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [icon()],
  vite: {
    envPrefix: "CONTENTFUL_",
    plugins: [tailwindcss()],
  },
});

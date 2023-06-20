import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";
import vercel from "@astrojs/vercel/serverless";

const env = loadEnv("", process.cwd(), "STORYBLOK");
// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  site: SITE.website,
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    react(),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        // blogPost: 'storyblok/BlogPost',
      },
      apiOptions: {
        // Choose your Storyblok space region
        region: "us", // optional,  or 'eu' (default)
      },
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});

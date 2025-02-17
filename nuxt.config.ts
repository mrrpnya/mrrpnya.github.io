import * as pages from "./utils/page_updater/update_pagelist";

// Import the generated page list.
const blog_list_json = (await import("./assets/meta/post_list.json")).default;

const blog_list: pages.PageList = pages.PageList.fromJSON(JSON.stringify(blog_list_json));

// Nitro expects a string array of routes.
const blog_nitro_routes: string[] = [];

// Iterate over each available language.
for (const [lang, langData] of Object.entries(blog_list.languages)) {
  // For each category in this language.
  for (const [categoryName, category] of Object.entries(langData.categories)) {
    // For each post, use its canonical id to build the route.
    for (const post of category.posts) {
      // Get the canonical id (removes the language folder, e.g. "en/page.md" becomes "page.md")
      const canonicalId = pages.PageList.getCanonicalId(post.id);
      // Remove the file extension (e.g. "page.md" becomes "page")
      const postSlug = canonicalId.replace(/\.md$/, '');
      // Build the localized route (e.g. "/en/article/page")
      blog_nitro_routes.push(`/${lang}/article/${lang}/${categoryName.toLowerCase()}/${postSlug}`);
    }
  }
}

console.log(blog_nitro_routes);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  routeRules: {
    "/article/:lang/:category:/:id": {
      redirect: "/article/:lang/:category:/:id/index.html",
    }
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  modules: [
    "nuxt-particles",
    "@nuxt/test-utils/module",
    "@nuxt/content",
    "@nuxtjs/i18n",
  ],
  i18n: {
    strategy: 'prefix_and_default',
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts',
    baseUrl: process.env.SITE_BASE_URL,
    locales: [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'tp',
        name: 'toki pona'
      }
    ]
  },
  content: {
    // ... options
    api: {
      baseURL: '/api/_content'
    }
  },
  nitro: {
    prerender: {
      routes: blog_nitro_routes,
      autoSubfolderIndex: true,
    },
  },
  particles: {
    mode: "slim",
    lazy: true,
  },
});

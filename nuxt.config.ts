import * as pages from '~/utils/page_updater/update_pagelist';

const blog_list: pages.PageList = (await import('./assets/meta/post_list.json')) as pages.PageList;

// nitro only needs string array
const blog_nitro_routes: any = [];
// key value
for (let [key, category] of Object.entries(blog_list.categories)) {
  for (let post of category.posts) {
    blog_nitro_routes.push('/article' + post.url);
  }
}
console.log(blog_nitro_routes);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
  },
  modules: [
    'nuxt-particles',
    '@nuxt/content'
  ],
  content: {
    // ... options
    
  },
  nitro: {
    prerender: {
      routes: blog_nitro_routes
    }
  },
  particles: {
    mode: 'slim',
    lazy: true
  }
})

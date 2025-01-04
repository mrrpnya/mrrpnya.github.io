import * as pages from '~/utils/page_updater/update_pagelist';

const blog_list: pages.PageList = (await import('./assets/meta/blog_list.json')) as pages.PageList;

const blog_routes: any = blog_list.posts.map((post) => {
  return {
    ['/blog?post=' + post.id]: {
      prerender: true
    }
  }
});

blog_routes.push({
  '/blog': {
    prerender: true
  }
});

console.log(blog_routes);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true,
  routeRules: blog_routes,
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
  particles: {
    mode: 'slim',
    lazy: true
  }
})

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import fm from 'front-matter';
import PostCard from '~/components/PostCard.vue';
import * as pages from '~/utils/page_updater/update_pagelist';
import type { PageInfo, PageInfoMetdata } from '~/utils/page_updater/pages';
import type { ParsedContent } from '@nuxt/content';
import siteConfig from '~/assets/config';

let route = useRoute();
const { locale, setLocale } = useI18n();
console.log(route);

const url: Ref<string> = ref('');
url.value = '/' + route.params.category.concat('/' + route.params.id as string) as string;

console.log(url.value);

const loading: Ref<boolean> = ref(false);

const tagFilter: Ref<string[]> = ref([]);
tagFilter.value = [];

const markdown: Ref<any> = ref(null);

const title: Ref<string> = ref('');
const description: Ref<string> = ref('');
const date: Ref<string> = ref('');
const tags: Ref<string[]> = ref([]);
const background: Ref<string> = ref('');
const next: Ref<string> = ref('');
const previous: Ref<string> = ref('');

import page_list_Data from "~/assets/meta/post_list.json"
const page_list = page.PageList.fromJSON(JSON.stringify(await page_list_Data))

function tagsToString(tags: String[]): string {
    var tagString = '';
    for (let i = 0; i < tags.length; i++) {
        tagString += tags[i];
    }
    return tagString;
}

function updateMetadata(data: ParsedContent) {
    title.value = data.title ? data.title : '';
    description.value = data.description ? data.description : '';
    date.value = data.date ? new Date(data.date).toLocaleDateString() : '';
    tags.value = data.tags ? data.tags : [];
    background.value = data.background ? data.background : '';
}

// watch the params of the route to fetch the data again
watch(route, async () => {
    url.value = '/' + route.params.category.concat('/' + route.params.id as string) as string;
    if (url.value) {
        console.log('Fetching article');
        loading.value = true;
        try {
            await fetchArticle(url.value, route.params.lang as string);
        } finally {
            loading.value = false;
        }
    }
}, {
    immediate: true
});
import * as page from "~/utils/page_updater/update_pagelist"

async function fetchArticle(url: string, region?: string): Promise<any> {
    if (!url) {
        console.error('fetchArticle: No URL provided');
        return;
    }
    try {
        // Trim the .md extension
        const trimmedUrl = url.replace(/^\//, '').replace(/\.md$/, '');
        console.log('[id].vue - Fetching article: ' + trimmedUrl);

        // Define the available languages in the order of preference (falling back on the next if one fails)
        const languages = [region ? region : locale.value, 'en', 'fr', 'de']; // Add all available languages in order of preference
        console.log(languages);
        let dataFound = false;
        let data: any = null;

        // Check the presence of the article in each language using page utility
        for (let lang of languages) {
            // Check if the page exists in the specified language
            const pageExists = page_list.pageExistsInLang(lang, trimmedUrl);
            console.log(`Checking if article exists for language ${lang}: ${pageExists}`);

            if (!pageExists) {
                console.warn(`Article does not exist for language ${lang}`);
                continue; // Skip this language and try the next one
            }

            // If the page exists, fetch its content
            console.log(`Querying /${lang}/${trimmedUrl}`);
            const { data: languageData, error } = await useAsyncData(`${lang}/${trimmedUrl}`, () =>
                queryContent(`/${lang}/${trimmedUrl}`).findOne()
            );

            if (error.value) {
                console.warn(`Error fetching article for language ${lang}:`, error.value);
                continue; // Try the next language
            }

            if (languageData.value) {
                data = languageData.value;
                dataFound = true;
                break; // Break as soon as data is found
            }
        }

        if (!dataFound) {
            console.warn('fetchArticle: No data found for URL', trimmedUrl);
            return;
        }

        console.log(data);
        markdown.value = data;
        updateMetadata(markdown.value);

        // Update next/previous links based on language
        const language = route.query.lang || 'en'; // Use the language from the route or default to 'en'
        updateNavigationLinks(language as string);

        return data;
    } catch (err) {
        console.error('fetchArticle: An unexpected error occurred', err);
    }
}


function updateNavigationLinks(language: string) {
    // Get the next and previous articles based on the current language
    const postId = route.params.id as string;
  //  const langPosts = languageMap[language] || [];
   // const postIndex = langPosts.indexOf(postId);

   // if (postIndex !== -1) {
        // Find the previous and next posts in the same language
    //    previous.value = langPosts[postIndex - 1] || '';
    //    next.value = langPosts[postIndex + 1] || '';
  //  }
}

function resetReadingPosition() {
    window.scrollTo(0, 0);
}

const data = await fetchArticle(url.value);
updateMetadata(data);

console.log('Prefetching article');

const temp_url = route.query.post as string;

const fullTitle = data.title + ' | ' + siteConfig.siteTitle;

useHead({
    title: fullTitle,
    meta: [
        { name: 'description', content: description },
        { name: 'keywords', content: tagsToString(tags.value) },
        { name: 'author', content: siteConfig.siteAuthor },
        { name: 'date', content: date },
        { name: 'theme-color', content: siteConfig.siteColor },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: fullTitle },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: background },
        { name: 'twitter:image:alt', content: fullTitle },
        { name: 'og:title', content: fullTitle },
        { name: 'og:description', content: description },
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: siteConfig.siteUrl },
        { name: 'og:site_name', content: siteConfig.siteTitle },
        { name: 'og:locale', content: 'en_US' },
        { name: 'og:locale:alternate', content: 'en_GB' },
        { name: 'og:image', content: background },
        { name: 'og:image:alt', content: fullTitle }
    ]
});

useSeoMeta({
    title: fullTitle,
    ogTitle: fullTitle,
    description: description,
    ogDescription: description,
    keywords: tagsToString(tags.value),
    ogImage: background,
    ogUrl: siteConfig.siteUrl,
    ogType: 'website',
    ogSiteName: siteConfig.siteTitle,
    ogLocale: 'en_US',
    ogLocaleAlternate: 'en_GB',
    themeColor: siteConfig.siteColor,
    twitterCard: 'summary',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: background
});
</script>

<template>
    <div class="relative z-50 flex w-full justify-center text-white">
        <!-- Article Viewer -->
        <div class="mt-8 flex-col text-center">
            <Transition name="list">
                <div class="flex flex-col" :key="url">
                    <h1>{{ title }}</h1>
                    <small>{{ date }}</small>
                    <div class="max-w-50 flex flex-row justify-center">
                        <div v-for="tag in tags" :key="tag" class="m-1 text-center">
                            <span
                                class="text-xs bg-black border-purple-400 border-2 text-white p-1 rounded-md">{{
                                    tag }}</span>
                        </div>
                    </div>
                    <div>
                        <!-- Next/Prev controls, on the left and right side using PostCards -->
                        <div class="flex max-w-4xl max-md:w-screen">
                            <!--<div class="justify-start">
                                <NuxtLink v-if="previous" :onclick="resetReadingPosition" :to="previous"
                                    class="m-2 text-white">Previous</NuxtLink>
                            </div>
                            <div class="justify-end">
                                <NuxtLink v-if="next" :onclick="resetReadingPosition" :to="next"
                                    class="m-2 text-white">Next</NuxtLink>
                            </div>-->
                        </div>
                    </div>
                    <!-- Article Content -->
                    <Card class="text-pretty max-w-4xl mt-4 max-md:w-screen text-left">
                        <article>
                            <div v-if="markdown != null">
                                <Markdown :input="markdown" />
                            </div>
                            <!-- Aligned next/prev controls -->
                            <div class="flex">
                                <div class="justify-start">
                                    <!--<NuxtLink v-if="previous" :onclick="resetReadingPosition" :to="previous"
                                        class="m-2 text-white">Previous</NuxtLink>-->
                                </div>
                                <div class="justify-end">
                                    <!--<NuxtLink v-if="next" :onclick="resetReadingPosition" :to="next"
                                        class="m-2 text-white">Next</NuxtLink>-->
                                </div>
                            </div>
                        </article>
                    </Card>
                </div>
            </Transition>
        </div>
    </div>
</template>

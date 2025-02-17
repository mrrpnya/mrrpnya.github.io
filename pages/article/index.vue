<script setup lang="ts">
import { onMounted, watch, ref, computed } from 'vue';
import fm from 'front-matter';

import PostCard from '~/components/PostCard.vue';
import * as pages from '~/utils/page_updater/update_pagelist';
import type { PageInfo, PageInfoMetdata } from '~/utils/page_updater/pages';
import type { ParsedContent } from '@nuxt/content';

const article_list_data = await import('~/assets/meta/post_list.json');
const article_list: pages.PageList = pages.PageList.fromJSON(JSON.stringify(article_list_data));

const loading: Ref<boolean> = ref(false);
const view: Ref<string> = ref('list');
const categoryFilter: Ref<string[]> = ref([]);
const tagFilter: Ref<string[]> = ref([]);
const tagList: Ref<string[]> = ref([]);
const languageList: Ref<string[]> = ref([]);

// Create a map for languages (using Record<string, string[]>)
const languageMap: Record<string, string[]> = {};

onMounted(() => {
    let tags: Set<string> = new Set();
    let languages: Set<string> = new Set();

    // Populate the languageMap with languages from article_list
    for (const lang in article_list.languages) {
        if (article_list.languages.hasOwnProperty(lang)) {
            // Initialize the array for each language in the map
            languageMap[lang] = [];

            languages.add(lang);

            // Iterate through categories and posts to collect tags
            for (const category in article_list.languages[lang].categories) {
                for (const post of article_list.languages[lang].categories[category].posts) {
                    if (post.metadata.tags) {
                        post.metadata.tags.forEach(tag => tags.add(tag));
                    }

                    // Add the post ID or any other identifier to the language array
                    languageMap[lang].push(post.id);
                }
            }
        }
    }

    // Populate tagList and languageList
    tagList.value = Array.from(tags);
    languageList.value = Array.from(languages);
});


const filteredArticles = computed<pages.Page[]>(() => {
    // Initialize allPosts as an empty array as a fallback.
    let allPosts: pages.Page[] = [];
    let uniquePostIds = new Set<string>(); // To keep track of unique post IDs

    try {
        // Safely access article_list.languages (fallbacks to empty object if undefined)
        allPosts = Object.values(article_list?.languages || {}).map((lang) => {
            // Safely access lang.categories (fallbacks to empty object if undefined)
            return Object.values(lang?.categories || {}).filter(category => category.show).flatMap((category) =>
                category?.posts || []
            );
        }).flat() // Flatten all post arrays into one single array.
            .filter(post => {
                // Check if post.id is already in the set, if it is, exclude it (deduplicate)
                if (uniquePostIds.has(post.id)) {
                    return false; // Skip this post if already added
                }
                uniquePostIds.add(post.id); // Otherwise, add it to the set
                return true; // Keep this post in the list
            })
            .sort((a, b) => {
                // Ensure both `metadata.date` values are valid Date objects
                const dateA = new Date(a?.metadata?.date ?? 0).getTime(); // Default to 0 if date is missing or invalid
                const dateB = new Date(b?.metadata?.date ?? 0).getTime();
                return dateB - dateA; // Sort by descending date
            });
    } catch (error) {
        console.error("Error processing articles:", error);
    }

    // Apply tag filter if any filter is selected.
    if (tagFilter.value?.length) {
        // Filter posts based on matching tags
        allPosts = allPosts.filter((post) => {
            // Ensure post.metadata.tags exists before checking
            return post?.metadata?.tags?.some((tag) => tagFilter.value.includes(tag));
        });
    }

    // Return the filtered and deduplicated list of posts
    return allPosts;
});

</script>

<template>
    <div class="relative z-50 flex w-full justify-center text-white">
        <MetaSet title="Articles" description="Ramblings." background="/images/me.png"
            :tags="['blog', 'personal', 'author']" />
        <div class="mt-8 flex-col text-center">
            <Transition name="list">
                <div>
                    <h1>Articles</h1>
                    <div class="flex justify-center">
                        <button @click="view = 'list'"
                            class="m-1 bg-black border-purple-400 border text-white p-1 rounded-md"
                            :class="view == 'list' ? 'border-2 border-white bg-slate-700' : 'border-2 bg-black text-white'">
                            List
                        </button>
                        <button @click="view = 'category'"
                            class="m-1 bg-black border-purple-400 border text-white p-1 rounded-md"
                            :class="view == 'category' ? 'border-2 border-white bg-slate-700' : 'border-2 bg-black text-white'">
                            Category
                        </button>
                    </div>
                    <div class="flex justify-center" v-if="view == 'list'">
                        <div class="flex flex-wrap justify-center m-5 max-w-96">
                            <div v-for="tag in tagList" :key="tag" class="m-1">
                                <button
                                    @click="tagFilter.includes(tag) ? tagFilter.splice(tagFilter.indexOf(tag), 1) : tagFilter.push(tag)"
                                    class="text-xs bg-black border-purple-400 border text-white p-1 rounded-md"
                                    :class="tagFilter.includes(tag) ? 'border-2 border-white bg-slate-700' : 'border-2 bg-black text-white'">
                                    {{ tag }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-if="view == 'list'">
                        <div v-for="post in filteredArticles" :key="post.id">
                            <PostCard class="lg:w-[48rem]" :url="post.url" :tagFilter="tagFilter">

                                <!-- Show available languages for the post using languageMap -->
                                <div v-if="post.id">
                                    <div class="text-sm text-gray-400">Available in:
                                        <span v-for="(postIds, lang) in languageMap" :key="lang">
                                            <!-- Check if the post.id is in the array of postIds for the current language -->
                                            <span v-if="postIds.includes(post.id)">
                                                <!-- Display the flag image for each available language -->
                                                <img :src="`/images/flags/${lang}.svg`" :alt="lang"
                                                    class="inline-block w-6 h-4 mr-2" />
                                            </span>
                                        </span>
                                    </div>
                                </div>

                            </PostCard>
                        </div>

                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

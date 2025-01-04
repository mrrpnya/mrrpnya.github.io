<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import fm from 'front-matter';

import PostCard from '~/components/PostCard.vue';
import * as pages from '~/utils/page_updater/update_pagelist';
import type { PageInfo, PageInfoMetdata } from '~/utils/page_updater/pages';
import type { ParsedContent } from '@nuxt/content';

let route = useRoute()
console.log(route)

const url: Ref<string> = ref("")
url.value = '/' + route.params.category.concat('/' + route.params.id as string) as string

console.log(url.value)

const loading: Ref<boolean> = ref(false)

const tagFilter: Ref<string[]> = ref([])
tagFilter.value = []

const markdown: Ref<any> = ref(null)

const title: Ref<string> = ref("")
const description: Ref<string> = ref("")
const date: Ref<string> = ref("")
const tags: Ref<string[]> = ref([])
const background: Ref<string> = ref("")
const next: Ref<string> = ref("")
const previous: Ref<string> = ref("")

watch(markdown , (newVal) => {
    if (newVal) {
        title.value = newVal.title ? newVal.title : ""
        description.value = newVal.description ? newVal.description : ""
        date.value = newVal.date ? new Date(newVal.date).toLocaleDateString() : ""
        tags.value = newVal.tags ? newVal.tags : []
        background.value = newVal.background ? newVal.background : ""
    }
})

// watch the params of the route to fetch the data again
watch(route, async () => {
    url.value = '/' + route.params.category.concat('/' + route.params.id as string) as string
    if (url.value) {
        console.log("Fetching article")
        loading.value = true
        try {
            await fetchArticle(url.value)
        }
        finally {
            loading.value = false
        }
    }
}, {
    immediate: true
});

// Fetch the article contents from the URL
async function fetchArticle(url: string) {
    if (!url) {
        return
    }
    // Trim the .md extension
    var url = url.replace(/\.md$/, "")
    console.log("Fetching article: " + url)
    const { data } = await useAsyncData(url, () => queryContent(url).findOne())
    console.log(data)
    
    markdown.value = data.value;
}

function resetReadingPosition() {
    window.scrollTo(0, 0)
}

fetchArticle(url.value)

console.log("Prefetching article")
onMounted(async () => {
    console.log("Fetching article :3")
    await fetchArticle(url.value)
})
const temp_url = route.query.post as string
await fetchArticle(temp_url);

</script>

<template>
    <div class="relative z-50 flex w-full justify-center text-white">
        <!-- Metadata -->
        <MetaSet :title="title" :description="description" :date="date"
            :background="background" tags="tags" />
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
                            <div class="justify-start">
                                <NuxtLink v-if="previous" :onclick="resetReadingPosition" :to="previous"
                                    class="m-2 text-white">Previous</NuxtLink>
                            </div>
                            <div class="justify-end">
                                <NuxtLink v-if="next" :onclick="resetReadingPosition" :to="next"
                                    class="m-2 text-white">Next</NuxtLink>
                            </div>
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
                                    <NuxtLink v-if="previous" :onclick="resetReadingPosition" :to="previous"
                                        class="m-2 text-white">Previous</NuxtLink>
                                </div>
                                <div class="justify-end">
                                    <NuxtLink v-if="next" :onclick="resetReadingPosition" :to="next"
                                        class="m-2 text-white">Next</NuxtLink>
                                </div>
                            </div>
                        </article>
                    </Card>
                </div>
            </Transition>
        </div>
    </div>
</template>
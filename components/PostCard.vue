<script setup lang="ts">
import { ref, watch } from 'vue';
import fm from 'front-matter';
import { auto } from '@popperjs/core';

const props = defineProps({
    url: String,
    tagFilter: Array<String>,
    // Allow sm, md, and lg
    size: {
        type: String,
        default: 'full',
        validator: (value) => ['xs', 'sm', 'md', 'full'].includes(value)
    }
});

const url: Ref<string> = ref("")
url.value = props.url as string

const loading = ref(false)
const error: Ref<string | null> = ref(null)
const markdown: Ref<any> = ref(null)

const background: Ref<string> = ref('');
const title: Ref<string> = ref("Untitled");
const description: Ref<string | null> = ref(null);
const date: Ref<string | null> = ref(null);
const tags: Ref<string | null> = ref(null);

watch(url, (newVal) => {
    fetchData(newVal)
}, { immediate: true })

watch(markdown, (newVal) => {
    if (newVal) {
        title.value = newVal.title ? newVal.title : ""
        description.value = newVal.description ? newVal.description : ""
        date.value = newVal.date ? new Date(newVal.date).toLocaleDateString() : ""
        tags.value = newVal.tags ? newVal.tags : []
        background.value = newVal.background ? newVal.background : ""

        console.log("Title: " + title.value)
        console.log("Description: " + description.value)
        console.log("Date: " + date.value)
        console.log("Tags: " + tags.value)
        console.log("Background: " + background.value)
    }
})

async function fetchData(url: string) {
    loading.value = true
    // remove all .md extensions
    const temp_url = url.replace(/\.md$/, '')
    console.log("Fetching article: " + temp_url)
    try {
        const {data} = await useAsyncData(temp_url, () => queryContent(temp_url).findOne())

        markdown.value = data.value;
    } catch (err: any) {
        error.value = err.toString()
        loading.value = false
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchData(url.value)
})
</script>

<template>
    <NuxtLink :href="'/blog?post=' +url">
        <!-- Large -->
        <div v-if = "size === 'full'">
            <div class="m-4 min-h-30 min-width-90 text-white transition hover:bg-purple-600 bg-opacity-50 hover:bg-opacity-70">
                <Card>
                    <div v-if="loading" class="text-center animate-pulse">
                    </div>
                    <div v-else-if="error" class="text-center">
                        <h2>Error: {{ error }}</h2>
                        <button @click="fetchData">Retry</button>
                    </div>
                    <div v-else>
                        <div class="grid">
                            <div class="justify-center">
                                <h1>{{ title }}</h1>
                                <small>{{  date  }}</small>
                            </div>
                            <div class="flex justify-center">
                                <div v-for="tag in tags" :key="tag" class="m-1 text-center">
                                    <div v-if="props.tagFilter?.includes(tag)">
                                        <span class="text-xs bg-slate-700 border-white border-2 text-white p-1 rounded-md">{{ tag }}</span>
                                    </div>
                                    <div v-else>
                                        <span class="text-xs bg-black border-purple-400 border-2 text-white p-1 rounded-md">{{ tag }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p>{{ description }}</p>
                    </div>
                </Card>
            </div>
        </div>
        <!-- Medium -->
        <div v-else-if = "size === 'md'">
            <div class="m-4 min-h-30 min-width-50 text-white transition hover:bg-purple-600 bg-opacity-50 hover:bg-opacity-70">
                <Card>
                    <div v-if="loading" class="text-center animate-pulse">
                    </div>
                    <div v-else-if="error" class="text-center">
                        <h2>Error: {{ error }}</h2>
                        <button @click="fetchData">Retry</button>
                    </div>
                    <div v-else>
                        <div class="grid">
                            <div class="justify-center">
                                <h2>{{ title }}</h2>
                                <small>{{  date  }}</small>
                            </div>
                            <div class="flex justify-center">
                                <div v-for="tag in tags" :key="tag" class="m-1 text-center">
                                    <div v-if="props.tagFilter?.includes(tag)">
                                        <span class="text-xs bg-slate-700 border-white border-2 text-white p-1 rounded-md">{{ tag }}</span>
                                    </div>
                                    <div v-else>
                            <div class="flex justify-center">
                                <div v-for="tag in tags" :key="tag" class="m-1 text-center">
                                    <div v-if="props.tagFilter?.includes(tag)">
                                        <span class="text-xs bg-slate-700 border-white border-2 text-white p-1 rounded-md">{{ tag }}</span>
                                    </div>
                                    <div v-else>
                                        <span class="text-xs bg-black border-purple-400 border-2 text-white p-1 rounded-md">{{ tag }}</span>
                                    </div>
                                </div>
                            </div>
                                        <span class="text-xs bg-black border-purple-400 border-2 text-white p-1 rounded-md">{{ tag }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
        <!-- Small -->
        <div v-else-if = "size === 'sm'">
            <div class="m-4 min-h-30 min-width-30 text-white transition hover:bg-purple-600 bg-opacity-50 hover:bg-opacity-70">
                <Card>
                    <div v-if="loading" class="text-center animate-pulse">
                    </div>
                    <div v-else-if="error" class="text-center">
                        <h2>Error: {{ error }}</h2>
                        <button @click="fetchData">Retry</button>
                    </div>
                    <div v-else>
                        <div class="grid">
                            <div class="justify-center">
                                <h3>{{ title }}</h3>
                                <small>{{  date  }}</small>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
        <!-- Extra Small -->
        <div v-else-if = "size === 'xs'">
            <div class="m-4 min-h-30 min-width-20 text-white transition hover:bg-purple-600 bg-opacity-50 hover:bg-opacity-70">
                <Card>
                    <div v-if="loading" class="text-center animate-pulse">
                    </div>
                    <div v-else-if="error" class="text-center">
                        <h3>Error: {{ error }}</h3>
                        <button @click="fetchData">Retry</button>
                    </div>
                    <div v-else>
                        <div class="grid">
                            <div class="justify-center">
                                <h5>{{ title }}</h5>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </NuxtLink>
</template>
<script setup>
import { ref, watch } from 'vue';
import fm from 'front-matter';
import { auto } from '@popperjs/core';

const props = defineProps({
    url: String,
    tagFilter: Array,
    // Allow sm, md, and lg
    size: {
        type: String,
        default: 'full',
        validator: (value) => ['xs', 'sm', 'md', 'full'].includes(value)
    }
});

const url = ref(props.url)
url.value = props.url
const loading = ref(false)
const data = ref(null)
const error = ref(null)

const background = ref('');
const title = ref(null);
const description = ref(null);
const date = ref(null);
const tags = ref(null);


// watch the params of the route to fetch the data again
watch(url, async () => {
    await fetchData()
}, {
    immediate: true 
});

async function fetchData() {
    error.value = data.value = null
    loading.value = true
    
    try {
        data.value = await (await fetch("/blog" + url.value)).text()
        console.log(url.value)
        const processed = fm(data.value)
        background.value = processed.attributes.background
        title.value = processed.attributes.title
        description.value = processed.attributes.description
        console.log(JSON.stringify(processed.attributes.date))
        date.value = processed.attributes.date
        tags.value = processed.attributes.tags

        date.value = new Date(date.value).toLocaleDateString()
    } catch (err) {
        error.value = err.toString()
        loading.value = false
    } finally {
        loading.value = false
    }
}
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
                                    <div v-if="props.tagFilter.includes(tag)">
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
                                    <div v-if="props.tagFilter.includes(tag)">
                                        <span class="text-xs bg-slate-700 border-white border-2 text-white p-1 rounded-md">{{ tag }}</span>
                                    </div>
                                    <div v-else>
                            <div class="flex justify-center">
                                <div v-for="tag in tags" :key="tag" class="m-1 text-center">
                                    <div v-if="props.tagFilter.includes(tag)">
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
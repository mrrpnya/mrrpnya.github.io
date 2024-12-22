<script setup>
import { ref, watch } from 'vue';
import fm from 'front-matter';

const props = defineProps({
    url: String,
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
        data.value = await (await fetch(url.value)).text()
        const processed = fm(data.value)
        background.value = processed.attributes.background
        title.value = processed.attributes.title
        description.value = processed.attributes.description
        date.value = processed.attributes.date
        tags.value = processed.attributes.tags
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
    <div class="m-4 p-3 min-h-30 w-90 text-white rounded-2xl border-2 border-purple-300 transition hover:bg-purple-600 bg-purple-700 bg-opacity-50 hover:bg-opacity-70" 
        :style="{ backgroundImage: `url(${background})` }">
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
                </div>
                <div class="flex justify-center">
                    <div v-for="tag in tags" :key="tag" class="m-1 text-center">
                        <span class="text-xs bg-purple-800 border-purple-400 border text-white p-1 rounded-md">{{ tag }}</span>
                    </div>
                </div>
            </div>
            <p>{{ description }}</p>
        </div>
    </div>
    </NuxtLink>
</template>
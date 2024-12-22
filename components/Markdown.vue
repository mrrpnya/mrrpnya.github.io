<script setup lang="ts">
import configured_markdown from '~/assets/markdown_conf';
import { useSlots } from 'vue';

let markdown = configured_markdown();

const text = ref("");
const loading = ref(true);

const props = defineProps({
    text: String,
});

function render_markdown(data: string | undefined) {
    if (!data) {
        loading.value = false;
        return;
    }
    text.value = markdown.render(data);
    loading.value = false
}

watch(() => props.text, (newVal) => {
    render_markdown(newVal);
}, {
    immediate: true
});
</script>

<template>
    <div v-if="loading" class="text-center animate-pulse">
        <h2>Loading...</h2>
    </div>
    <div class="md-contents" v-html="text"></div>
</template>
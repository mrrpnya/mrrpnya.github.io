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
    // Validate that the data is a string
    if (typeof data !== 'string') {
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

<style>
/* Note: Use `md-override` to override the default markdown styling */

/* Headers (1-3) get a small visual upgrade */
.md-contents h1:not(.md-override), .md-contents h2:not(.md-override), .md-contents h3:not(.md-override) {
    border-bottom: 1px solid #A020F0;
    padding-bottom: 0.25rem;
    margin-bottom: 0.5rem;
}

/* Apply margin to code blocks */
.md-contents pre:not(.md-override) {
    margin: 1rem 0;
}

/* Apply styling to lists and list items with nesting */
.md-contents ul:not(.md-override), .md-contents ol:not(.md-override) {
    margin: 1rem 0;
    padding-left: 1rem;
}

/* Apply different bullet types to nested lists as they are nested */
.md-contents ul:not(.md-override) ul:not(.md-override), .md-contents ol:not(.md-override) ul:not(.md-override) {
    list-style-type: circle;
}

/* Apply table styling, with a pleasant glowing border effect */
.md-contents table:not(.md-override) {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #333;
    box-shadow: 0 0 7px #A020F0
}

.md-contents th:not(.md-override), .md-contents td:not(.md-override) {
    border: 1px solid #A020F0;
    padding: 0.5rem;
}

.md-contents th:not(.md-override) {
    background-color: #333;
    color: white;
}

.md-contents button:not(.md-override) {
    background-color: #333;
    color: white;
    border: 1px solid #A020F0;
    padding: 0.5rem;
    border-radius: 0.25rem;
    box-shadow: 0 0 7px #A020F0;
}

.md-contents button:hover:not(.md-override) {
    background-color: #555;
    box-shadow: 0 0 10px #A020F0;
    color: white;
}

/* transition for button hover effect */
.md-contents button:not(.md-override) {
    transition: background-color 0.5s;
}

</style>
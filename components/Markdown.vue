<script setup lang="ts">
import configured_markdown from '~/assets/markdown_conf';
import { useSlots } from 'vue';

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
    text.value = configured_markdown().render(data);
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

/* Markdown alerts get a box, a shadow, and a background+border color */
.md-contents .markdown-alert:not(.md-override) {
    border: 1px solid #A020F0;
    background-color: #333;
    box-shadow: 0 0 7px #A020F0;
    padding: 0.5rem;
    margin: 1rem 0;
}
.md-contents .markdown-alert-title {
    font-weight: bold;
    margin-bottom: 0.5rem;
}
.md-contents .markdown-alert-warning:not(.md-override) {
    border: 1px solid #FFA500;
    background-color: #aa6600;
    box-shadow: 0 0 7px #FFA500;
}

.md-contents .markdown-alert-warning .markdown-alert-title:not(.md-override):before {
    content: "⚠️ ";
    text-shadow: 1px 1px 1px #000;
}
.md-contents .markdown-alert-danger:not(.md-override) {
    border: 1px solid #FF0000;
    background-color: #aa0000;
    box-shadow: 0 0 7px #FF0000;
}
.md-contents .markdown-alert-danger .markdown-alert-title:not(.md-override):before {
    content: "❌ ";
    text-shadow: 1px 1px 1px #000;
}
.md-contents .markdown-alert-success:not(.md-override) {
    border: 1px solid #00FF00;
    box-shadow: 0 0 7px #00FF00;
}
.md-contents .markdown-alert-success .markdown-alert-title:not(.md-override):before {
    content: "✅ ";
    text-shadow: 1px 1px 1px #000;
}
.md-contents .markdown-alert-info:not(.md-override) {
    border: 1px solid #00FFFF;
    box-shadow: 0 0 7px #00FFFF;
}
.md-contents .markdown-alert-info .markdown-alert-title:not(.md-override):before {
    content: "ℹ️ ";
    text-shadow: 1px 1px 1px #000;
}
.md-contents .markdown-alert-important:not(.md-override) {
    border: 1px solid #FF00FF;
    box-shadow: 0 0 7px #FF00FF;
}
.md-contents .markdown-alert-important .markdown-alert-title:not(.md-override):before {
    content: "❗ ";
    text-shadow: 1px 1px 1px #000;
}
.md-contents .markdown-alert-caution:not(.md-override) {
    border: 1px solid #FFFF00;
    box-shadow: 0 0 7px #FFFF00;
}
.md-contents .markdown-alert-caution .markdown-alert-title:not(.md-override):before {
    content: "⚠️ ";
    text-shadow: 1px 1px 1px #000;
}
.md-contents .markdown-alert-note:not(.md-override) {
    border: 1px solid #0000FF;
    box-shadow: 0 0 7px #0000FF;
}
.md-contents .markdown-alert-note .markdown-alert-title:not(.md-override):before {
    content: "📝 ";
    text-shadow: 1px 1px 1px #000;
}
.md-contents .markdown-alert-tip:not(.md-override) {
    border: 1px solid #00FF00;
    box-shadow: 0 0 7px #00FF00;
}
.md-contents .markdown-alert-tip .markdown-alert-title:not(.md-override):before {
    content: "💡 ";
    text-shadow: 1px 1px 1px #000;
}
.md-contents .markdown-alert-question:not(.md-override) {
    border: 1px solid #ccc;
    box-shadow: 0 0 7px #ccc;
}
.md-contents .markdown-alert-question .markdown-alert-title:not(.md-override):before {
    content: "❓ ";
    text-shadow: 1px 1px 1px #000;
}
.md-contents .markdown-alert-quote:not(.md-override) {
    border: 1px dashed #ccc;
    box-shadow: 0 0 7px #ccc;
}
.md-contents .markdown-alert-quote .markdown-alert-title:not(.md-override):before {
    content: "❝ ";
    text-shadow: 1px 1px 1px #000;
}
.md-contents .markdown-alert-deprecated:not(.md-override) {
    border: 1px solid indigo;
    box-shadow: 0 0 7px indigo;
}
.md-contents .markdown-alert-deprecated .markdown-alert-title:not(.md-override):before {
    content: "🚫 ";
    text-shadow: 1px 1px 1px #000;
}
.md-contents .markdown-alert-example:not(.md-override) {
    border: 1px solid #ccc;
    box-shadow: 0 0 7px #ccc;
}
.md-contents .markdown-alert-example .markdown-alert-title:not(.md-override):before {
    content: "💡 ";
    text-shadow: 1px 1px 1px #000;
}
.md-contents .markdown-alert-todo:not(.md-override) {
    border: 1px solid skyblue;
    box-shadow: 0 0 7px skyblue;
}
.md-contents .markdown-alert-todo .markdown-alert-title:not(.md-override):before {
    content: "📝 ";
    text-shadow: 1px 1px 1px #000;
}
.md-contents .markdown-alert-done:not(.md-override) {
    border: 1px solid #00FF00;
    box-shadow: 0 0 7px #00FF00;
}
.md-contents .markdown-alert-done .markdown-alert-title:not(.md-override):before {
    content: "✅ ";
    text-shadow: 1px 1px 1px #000;
}

/* Footnotes, ensure they are by default white with no transition if they have no href */
.md-contents .footnote-anchor:not([href]) {
    color: white;
    transition: none;
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

/* iframes get a border and a shadow */
.md-contents iframe:not(.md-override) {
    @apply border-2 border-purple-600 rounded-lg;
    box-shadow: 0 0 7px #A020F0;
}

/* Identify if the iframe links to a YouTube video - If so, red border */
.md-contents iframe[src*="youtube.com"]:not(.md-override) {
    @apply border-2 border-red-600;
    box-shadow: 0 0 7px red;
}

/* Identify if the iframe links to a Twitch video - If so, purple border */
.md-contents iframe[src*="twitch.tv"]:not(.md-override) {
    @apply border-2 border-purple-600;
    box-shadow: 0 0 7px #A020F0;
}

/* Identify if the iframe links to a Spotify playlist - If so, green border */
.md-contents iframe[src*="spotify.com"]:not(.md-override) {
    @apply border-2 border-green-600 rounded-xl;
    box-shadow: 0 0 7px green;
}

/* Identify if the iframe links to a SoundCloud track - If so, orange border */
.md-contents iframe[src*="soundcloud.com"]:not(.md-override) {
    @apply border-2 border-orange-600;
    box-shadow: 0 0 7px orange;
}

/* Identify if the iframe links to a Bandcamp track - If so, blue border */
.md-contents iframe[src*="bandcamp.com"]:not(.md-override) {
    @apply border-2 border-blue-600;
    box-shadow: 0 0 7px blue;
}

/* Identify if the iframe links to a GitHub Gist - If so, gray border */
.md-contents iframe[src*="gist.github.com"]:not(.md-override) {
    @apply border-2 border-gray-600;
    box-shadow: 0 0 7px gray;
}

/* And if it links to Wikipedia, the free online encyclopedia, give it a white border */
.md-contents iframe[src*="wikipedia.org"]:not(.md-override) {
    @apply border-2 border-white;
    box-shadow: 0 0 7px white;
}

/* If the iframe links to a Google Maps location */
.md-contents iframe[src*="google.com/maps"]:not(.md-override) {
    border-left: 2px solid #4285F4;
    border-right: 2px solid #0F9D58;
    border-top: 2px solid #F4B400;
    border-bottom: 2px solid #DB4437;
    box-shadow: 0 0 7px #4285F4;
}

/* Redo the audio element styling */
.md-contents audio:not(.md-override) {
    @apply border-2 border-purple-600 rounded-lg;
    box-shadow: 0 0 7px #A020F0;
}

/* Images get a border and a shadow */
.md-contents img:not(.md-override) {
    @apply border-2 border-purple-600;
    box-shadow: 0 0 7px #A020F0;
}

</style>
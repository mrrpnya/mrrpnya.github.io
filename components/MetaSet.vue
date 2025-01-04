<script setup lang="ts">
import { ref } from 'vue';

import siteConfig from '../assets/config';

const props = defineProps({
    title: String,
    description: String,
    date: String,
    tags: Array<String>,
    background: String
});

const tags: Ref<String[]> = ref(props.tags || []);
const title: Ref<String> = ref(props.title || 'Untitled');
const description: Ref<string> = ref(props.description || 'No description provided');
const date: Ref<string> = ref(props.date || 'No date provided');
const background: Ref<string> = ref(props.background || '');
const fullTitle: Ref<string> = ref(title.value + ' | ' + siteConfig.siteTitle);

function tagsToString(tags: String[]): string {
    var tagString = '';
    for (let i = 0; i < tags.length; i++) {
        tagString += tags[i];
    }

    return tagString;
}

</script>

<template>
	<title>{{ fullTitle }}</title>
	<meta name="description" :content="description" />
    <meta name="keywords" :content="tagsToString(tags)" />
	<meta name="author" :content="siteConfig.siteAuthor" />
	<meta name="url" :content="siteConfig.siteUrl" />
	<meta name="og:title" :content="title + ' | ' + siteConfig.siteTitle" />
	<meta name="og:description" :content="siteConfig.siteAuthor + '\'s personal site'" />
	<meta name="og:url" :content="siteConfig.siteUrl" />
    <div v-if="background">
        <meta name="og:image" :content="background" />
    </div>
	<meta name="og:type" content="website" />
	<meta name="og:site_name" :content="siteConfig.siteTitle" />
	<meta name="og:locale" content="en_US" />
	<meta name="og:locale:alternate" content="en_GB" />
	<meta name="theme-color" :content="siteConfig.sitePrimaryColor" />

    <!-- Boo, Twitter. -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" :content="fullTitle" />
    <meta name="twitter:description" :content="description" />
    <meta name="twitter:image" :content="background" />
</template>
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
    themeColor: siteConfig.sitePrimaryColor,
    twitterCard: 'summary',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: background
    
});

useHead({
    title: fullTitle,
    meta: [
        { name: 'description', content: description },
        { name: 'keywords', content: tagsToString(tags.value) },
        { name: 'author', content: siteConfig.siteAuthor },
        { name: 'date', content: date },
        { name: 'theme-color', content: siteConfig.sitePrimaryColor },
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
})

</script>
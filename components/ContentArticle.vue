<script setup>
import '~/assets/style/markdown.scss';

// External inputs (reactive)
const input = defineProps({
    input: Object,
    preferredLanguage: {
        type: String,
        required: false
    }
});

</script>

<template>
    <ContentRendererMarkdown :value="input.input" class="md-contents" />
</template>
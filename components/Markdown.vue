<script setup lang="ts">
import { globalMarkdown, MarkdownInput } from '~/assets/markdown_conf';
import { useSlots } from 'vue';
import fm, { type FrontMatterResult } from 'front-matter';
import '~/assets/style/markdown.scss';

// External inputs (reactive)
const input = defineProps({
    input: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "markdown",
        validator: (value: string) => ["markdown", "html"].includes(value)
    }
});

// Internal state
const contents = ref("");
const loading = ref(false);
const error = ref("");

const emit = defineEmits(["metadata"]);

function updateContents(input: string | undefined, type: "markdown" | "html" | undefined) {
    if (input === "" || input === undefined) {
        contents.value = "";
        error.value = "";
        return;
    }
    const markdown_input: MarkdownInput = type ? 
        type === "markdown" ? 
            MarkdownInput.from_markdown(input) : type == "html" ? 
            MarkdownInput.from_html(input) : 
            MarkdownInput.from_markdown(input) : MarkdownInput.from_markdown(input);

    console.log("Rendering...")
    const render = globalMarkdown.render(markdown_input);
    console.log("Metadata: ", render.metadata);
    contents.value = render.contents;
    emit("metadata", render.metadata);

}

watch(() => input.input, (newVal) => {
    updateContents(newVal, input.type as "markdown" | "html");
}, { immediate: true });

</script>

<template>
    <div v-if="loading" class="text-center animate-pulse">
        <h2>Loading...</h2>
    </div>
    <div v-else-if="error" class="text-center">
        <h2>Error: {{ error }}</h2>
    </div>
    <div v-else class="md-contents">
        <div class="md-contents" v-html="contents"></div>
    </div>
</template>
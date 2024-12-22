<script setup>
import { ref } from 'vue';
import markdownit from 'markdown-it'
import PostCard from '../components/PostCard.vue';
import configured_markdown from '~/assets/markdown_conf';
import Markdown from '~/components/Markdown.vue';

const aboutMe = ref("");

fetch("/about_me.md")
	.then((res) => res.text())
	.then((data) => {
		console.log(data);
		aboutMe.value = data;
	});

</script>

<template>
	<div class="relative flex w-full justify-center text-white">
		<div class="mt-8 flex-col text-center">
			<div class="flex justify-center">
				<div class="p-2 shadow-md rounded-full bg-pink-500">
					<img class="transition-all w-40 h-40 md:w-56 md:h-56 rounded-full"
						src="https://avatars.githubusercontent.com/u/94077364?v=4" alt="User PFP" />
				</div>
			</div>
			<div class="max-w-4xl mt-4 p-6 max-md:w-screen rounded-md container bg-opacity-90 bg-purple-950">
				<Markdown :text="aboutMe"></Markdown>
			</div>
		</div>
	</div>
</template>

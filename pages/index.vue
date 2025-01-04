<script setup>
import { ref } from 'vue';
import markdownit from 'markdown-it'
import PostCard from '../components/PostCard.vue';
import configured_markdown from '~/assets/markdown_conf';
import Markdown from '~/components/Markdown.vue';
import Card from '~/components/Card.vue';
import * as siteConfig from "../assets/config.ts";
import MetaSet from '~/components/MetaSet.vue';

const aboutMe = ref("");

fetch("/about_me.md")
	.then((res) => res.text())
	.then((data) => {
		console.log(data);
		aboutMe.value = data;
	});

</script>

<template>
	<MetaSet title="Home" description="TheFelidae's personal site :3" tags="home, personal, author"/>

	<div class="relative flex w-full justify-center text-white">
		<div class="mt-8 flex-col text-center">
			<div class="flex justify-center">
				<div id="PFP" class="p-1 shadow-md rounded-full bg-pink-500">
					<img class="transition-all w-40 h-40 md:w-56 md:h-56 rounded-full"
						src="https://avatars.githubusercontent.com/u/94077364?v=4" alt="User PFP" />
				</div>
			</div>
			<Card class="max-w-4xl mt-4 max-md:w-screen">
				<Markdown :text="aboutMe"></Markdown>
			</Card>
		</div>
	</div>
</template>

<style scoped>
	#PFP {
		box-shadow: 0 0 10px 0 pink;
	}
</style>
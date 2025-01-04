<script setup>
import { ref } from 'vue';
import Markdown from '~/components/Markdown.vue';
import Card from '~/components/Card.vue';

const aboutMe = ref('');
const test = ref('');

const { data } = await useAsyncData('about_me', () => queryContent('/about_me').findOne()) 

</script>

<template>
	<div class="relative flex w-full justify-center text-white">
		<!-- Metadata -->
		<MetaSet title="Home" description="TheFelidae's personal site" background="https://avatars.githubusercontent.com/u/94077364?v=4"
			tags="home, personal, author" />
		<div class="mt-8 flex-col text-center">
			<div class="flex justify-center">
				<div id="PFP" class="shadow-md rounded-full shadow-highlight">
					<img class="transition-all w-40 h-40 md:w-56 md:h-56 rounded-full"
						src="https://avatars.githubusercontent.com/u/94077364?v=4" alt="User PFP" />
				</div>
			</div>
			<Card class="max-w-4xl mt-4 max-md:w-screen">
				<Markdown :input="aboutMe" type="markdown"></Markdown>
				<ContentRendererMarkdown :value="data" class="md-content" />
			</Card>
		</div>
	</div>
</template>
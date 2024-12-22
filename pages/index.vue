<script setup>
import { ref } from 'vue';
import aboutMe from '../assets/about_me.md?raw'
import markdownit from 'markdown-it'
import PostCard from '../components/PostCard.vue';

const md = markdownit({
	breaks: true,
	typographer: true,
	html: true,
})


md.renderer.rules.hr = function(tokens, idx, options, env, self) {
	return '<div class="rounded-full h-0.5 bg-purple-500 my-3"></div>'
}

md.renderer.rules.softbreak = function(tokens, idx, options, env, self) {
	return '<br>'
}

md.renderer.rules.hardbreak = function(tokens, idx, options, env, self) {
	return '<br><br>'
}
md.renderer.rules.blockquote_open = function(tokens, idx, options, env, self) {
	return '<blockquote class="border-l-4 border-purple-500 pl-4 my-4">'
}
const result = ref('')

result.value = md.render(aboutMe);

</script>

<template>
    <div class="relative z-50 flex w-full justify-center text-white">
      <div class="mt-8 flex-col text-center">
        <div class="flex justify-center">
			<div class="p-2 shadow-md rounded-full bg-pink-500">
					<img class="z-20 transition-all w-40 h-40 md:w-56 md:h-56 rounded-full" src="https://avatars.githubusercontent.com/u/94077364?v=4" alt="User PFP" />
			</div>
        </div>
        <div class="max-w-4xl mt-4 p-6 max-md:w-screen rounded-md container bg-opacity-70 bg-purple-950">
			<div v-html=result></div>
        </div>
      </div>
    </div>
</template>

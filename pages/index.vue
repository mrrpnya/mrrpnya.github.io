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
		<MetaSet title="Home" description="TheFelidae's personal site"
			background="https://avatars.githubusercontent.com/u/94077364?v=4" tags="home, personal, author" />
		<div class="mt-8 flex-col text-center">
			<div class="flex justify-center">
				<div id="PFP" class="shadow-md rounded-full shadow-highlight">
					<img class="transition-all w-40 h-40 md:w-56 md:h-56 rounded-full"
						src="https://avatars.githubusercontent.com/u/94077364?v=4" alt="User PFP" />
				</div>

			</div>
			<div class="flex justify-center p-4">
				<div class="card flex lg:max-w-96 justify-end bg-surface-1 rounded-full border-border border">
					<NuxtLink href="https://github.com/TheFelidae">
						<button title="GitHub Profile"
							class="m-2 p-2 bg-surface-2/[.5] border-2 border-border rounded-full shadow-sm hover:scale-110 hover:shadow-border-accent hover:border-accent transition-all duration-200 ease-in-out">
							<img class="invert w-5"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/330px-GitHub_Invertocat_Logo.svg.png"
								width="24" height="24" alt="GitHub" />
						</button>
					</NuxtLink>
					<NuxtLink href="https://social.smgames.club/@mrrp">
						<button title="Mastodon Profile"
							class="m-2 p-2 bg-surface-2/[.5] border-2 border-border rounded-full shadow-sm hover:scale-110 hover:shadow-border-accent hover:border-accent transition-all duration-200 ease-in-out">
							<img class="w-5" src="/images/mastodon.svg" width="24" height="24" alt="Sharkey" />
						</button>
					</NuxtLink>
					<a href="/rss.xml">
						<button title="RSS Feed"
							class="m-2 p-2 bg-surface-2/[.5] border-2 border-border rounded-full shadow-sm hover:scale-110 hover:shadow-border-accent hover:border-accent transition-all duration-200 ease-in-out">
							<img class="w-5" src="/images/rss.png" width="24" height="24" alt="RSS" />
						</button>
					</a>
					<NuxtLink href="https://git.smgames.club/SevenOfAces">
						<button title="Forgejo"
							class="m-2 p-2 bg-surface-2/[.5] border-2 border-border rounded-full shadow-sm hover:scale-110 hover:shadow-border-accent hover:border-accent transition-all duration-200 ease-in-out">
							<img class="w-5" src="/images/forgejo.png" width="24" height="24" alt="RSS" />
						</button>
					</NuxtLink>
					<NuxtLink href="mailto:mrrpnya@proton.me">
						<button title="Send an Email"
							class="m-2 p-2 bg-surface-2/[.5] border-2 border-border rounded-full shadow-sm hover:scale-110 hover:shadow-border-accent hover:border-accent transition-all duration-200 ease-in-out">
							<img class="w-5" src="/images/envelope.png" width="24" height="24" alt="RSS" />
						</button>
					</NuxtLink>
				</div>
			</div>
			<Card class="max-w-4xl mt-4 max-md:w-screen">
				<Markdown :input="aboutMe" type="markdown"></Markdown>
				<ContentRendererMarkdown :value="data" class="md-content" />
			</Card>
		</div>
	</div>
</template>
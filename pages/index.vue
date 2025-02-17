<script setup>
import { ref } from 'vue';
import Markdown from '~/components/Markdown.vue';
import Card from '~/components/Card.vue';
import siteTitle from '~/assets/config'
import * as pages from "~/utils/page_updater/update_pagelist";

const aboutMe = ref('');
const test = ref('');

let blog_list_json = (await import("~/assets/meta/post_list.json")).default;

let blog_list = pages.PageList.fromJSON(JSON.stringify(blog_list_json));

const { locale, setLocale } = useI18n();

const data = ref(null);

onMounted(async () => {
	let currentLocale = locale.value.toLowerCase().replace(/-/g, '_');

	const aboutMePage = blog_list.languages[currentLocale]?.categories['Site']?.posts.find(
		post => {
			const canonicalId = pages.PageList.getCanonicalId(post.id);
			return canonicalId && canonicalId.toLowerCase().includes('about_me');
		}
	);

	if (!aboutMePage) {
		throw new Error(`"about_me" page not found for locale ${currentLocale}. Available posts: ${JSON.stringify(blog_list.languages[currentLocale]?.categories['Site']?.posts.map(p => p.id))}`);
	}

	console.log("url:" + aboutMePage.url)

	const fetchedData = await queryContent(aboutMePage.url).findOne();
	data.value = fetchedData;
})
</script>

<template>
	<div class="relative flex w-full justify-center text-white">
		<!-- Metadata -->
		<MetaSet title="Home" :description="siteTitle" background="/images/me.png" tags="home, personal, author" />
		<div class="mt-8 flex-col text-center">
			<div class="flex justify-center">
				<div id="PFP" class="shadow-md rounded-full shadow-highlight">
					<img class="transition-all w-40 h-40 md:w-56 md:h-56 rounded-full" src="/images/me.png"
						alt="User PFP" />
				</div>

			</div>
			<div class="flex justify-center p-4">
				<div class="card flex lg:max-w-96 justify-end bg-surface-1 rounded-full border-border border">
					<NuxtLink href="https://github.com/mrrpnya">
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
			<div v-if="data !== null">
				<Card class="max-w-4xl mt-4 max-md:w-screen">
					<Markdown :input="aboutMe" type="markdown"></Markdown>
					<ContentRendererMarkdown :value="data" class="md-content" />
				</Card>
			</div>
		</div>
	</div>
</template>
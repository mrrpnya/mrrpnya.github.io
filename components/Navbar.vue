<script setup>
import Card from './Card.vue';

</script>

<template>
    <div class="flex justify-center">
        <div class="flex-col transition-[margin] justify-center md:rounded-md max-md:w-screen lg:mt-3 w-fit-content">
            <Card>
                <div class="flex justify-center">
                    <NuxtLink href="/" class="transition text-xl pl-2 pr-2 ease-in-out text-purple-100 hover:text-purple-400 duration-200">Home</NuxtLink>
                    <NuxtLink href="/article/" class="transition text-xl pl-2 pr-2 ease-in-out text-purple-100 hover:text-purple-400 duration-200">Articles</NuxtLink>
                    <NuxtLink href="/article/collections/awesome" class="transition text-xl pl-2 pr-2 ease-in-out text-purple-100 hover:text-purple-400 duration-200">Awesome</NuxtLink>
                    <NuxtLink href="/article/collections/badges" class="transition text-xl pl-2 pr-2 ease-in-out text-purple-100 hover:text-purple-400 duration-200">Badges</NuxtLink>
                </div>
                <div class="flex justify-center text-white">
                    <small class="ml-3 mr-3">Hosted with <NuxtLink href="https://github.com/TheFelidae/thefelidae.github.io" class="text-blue-500">GitHub Pages</NuxtLink></small>
                </div>
            </Card>
        </div>
    </div>
</template>
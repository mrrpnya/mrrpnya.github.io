<script setup>
</script>

<template>
    <div class="flex justify-center">
        <div class="flex-col transition-[margin] justify-center md:rounded-md max-md:w-screen lg:mt-3 w-fit-content pr-4 pl-4 bg-purple-500 bg-opacity-25 text-white">
            <div class="flex justify-center">
                <NuxtLink href="/" class="transition text-xl pl-2 pr-2 ease-in-out text-purple-100 hover:text-purple-400 duration-200">Home</NuxtLink>
                <NuxtLink href="/blog/" class="transition text-xl pl-2 pr-2 ease-in-out text-purple-100 hover:text-purple-400 duration-200">Blog</NuxtLink>
                <NuxtLink href="/blog/?post=/blog/awesome.md" class="transition text-xl pl-2 pr-2 ease-in-out text-purple-100 hover:text-purple-400 duration-200">Awesome</NuxtLink>
                <NuxtLink href="/blog/?post=/blog/badges.md" class="transition text-xl pl-2 pr-2 ease-in-out text-purple-100 hover:text-purple-400 duration-200">Badges</NuxtLink>
            </div>
            <div class="flex justify-center">
                <small class=" ml-3 mr-3">Hosted with <NuxtLink href="https://github.com/TheFelidae/thefelidae.github.io" class="text-blue-500">GitHub Pages</NuxtLink></small>
            </div>
        </div>
    </div>
</template>
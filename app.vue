<script setup lang="ts">
import { main } from "@popperjs/core";
import MainPage from "./pages/index.vue"
import backgroundCalm from "./components/BackgroundCalm.vue";
import Navbar from "./components/Navbar.vue"
import './assets/style.css'
</script>

<template>
  <Navbar/>
  <NuxtPage :transition="{
        name: 'page',
        mode: 'out-in'
      }" />
  <div></div>
  <background-calm />
</template>

<style>
.page-move,
.page-enter-active,
.page-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translate(100px, 0);
}

.page-leave-active {
  position: absolute;
}
</style>

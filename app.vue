<script setup lang="ts">
import { main } from "@popperjs/core";
import MainPage from "./pages/index.vue"
import backgroundCalm from "./components/BackgroundCalm.vue";
import Navbar from "./components/Navbar.vue"
import './assets/style.css'
</script>

<template>
  <div>
    <Navbar/>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    <background-calm />
  </div>
</template>

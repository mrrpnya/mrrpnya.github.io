<script setup>
import Card from './Card.vue';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const switchLocalePath = useSwitchLocalePath()

const { locale, setLocale } = useI18n();
const localePath = useLocalePath();

const userLocales = ref([
    { code: 'en', name: 'English' },
    { code: 'tp', name: 'toki pona' }
]);

watch(locale, (newLocale) => {
    switchLocalePath(newLocale);
}, {immediate: true});
</script>

<template>
    <div class="flex justify-center">
        <div class="flex-col transition-[margin] justify-center md:rounded-md max-md:w-screen lg:mt-3 w-fit-content">
            <Card>
                <div class="flex justify-center items-center gap-4">
                    <NuxtLink :to="localePath('/')" class="transition text-xl pl-2 pr-2 ease-in-out text-purple-100 hover:text-purple-400 duration-200">{{ $t('home') }}</NuxtLink>
                    <NuxtLink :to="localePath('/article/')" class="transition text-xl pl-2 pr-2 ease-in-out text-purple-100 hover:text-purple-400 duration-200">{{$t('articles')}}</NuxtLink>
                    <NuxtLink :to="localePath('/article/' + locale + '/collections/awesome')" class="transition text-xl pl-2 pr-2 ease-in-out text-purple-100 hover:text-purple-400 duration-200">{{$t('awesome')}}</NuxtLink>
                    <NuxtLink :to="localePath('/article/' + locale + '/collections/badges')" class="transition text-xl pl-2 pr-2 ease-in-out text-purple-100 hover:text-purple-400 duration-200">{{$t('badges')}}</NuxtLink>
                    
                    <select v-model="locale" @change="setLocale(locale)" class="bg-transparent text-purple-100 border border-purple-400 rounded-md p-1">
                        <option v-for="loc in userLocales" :key="loc.code" :value="loc.code">
                            {{ loc.name }}
                        </option>
                    </select>
                </div>
            </Card>
        </div>
    </div>
</template>

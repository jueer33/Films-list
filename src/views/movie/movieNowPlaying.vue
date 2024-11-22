<template>
<header1 url='https://cdn-icons-png.flaticon.com/128/2323/2323837.png' content="正 在 热 映"/>
    <List :List="movieNowPlaying" type="movie" />
</template>
<script setup lang="ts" name="movieNowPlaying">
import List from '../List.vue';
import { usemovieNowPlaying } from '@/stores/Movies/movieNowPlaying';
import header1 from '@/components/header1.vue';
const movieNowPlaying = usemovieNowPlaying().result.results


</script>
<style scoped>


</style>
<template>
    <header1 content="高 分 榜 单" url="https://cdn-icons-png.flaticon.com/128/4746/4746590.png"/>
    <List :List="moviePopularity" type="TV"/>
</template>
<script setup lang="ts" name="movieNowPlaying">
import List from '../List.vue';
import { useTVtopRated } from '@/stores/TV/TVtopRated';
const moviePopularity = useTVtopRated().result.results
// console.log(moviePopularity)
import header1 from '@/components/header1.vue';
</script>
<style scoped>
</style>
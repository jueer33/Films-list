<template>
    <header1 content="高 分 榜 单" url="https://cdn-icons-png.flaticon.com/128/5129/5129624.png"/>

    <List :List = "movieTopRated" type="movie"/>
</template>
<script setup name="topMovieRated" lang="ts">
import { usemovieTopRated } from '@/stores/Movies/movieTopRated';
import List from '../List.vue';
const movieTopRated = usemovieTopRated().result.results;
import header1 from '@/components/header1.vue';
</script>

<style scoped>

</style>
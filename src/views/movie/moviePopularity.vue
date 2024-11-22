<template>
<header1 content="流 量 榜 单" url="https://cdn-icons-png.flaticon.com/128/2854/2854442.png"/>
    


<List :List="moviePopularity" type="movie"/>
</template>
<script setup lang="ts" name="moviePopularity">
import List from '../List.vue';
import { useMoviePopularity } from '@/stores/Movies/moviePopularity';
const moviePopularity =useMoviePopularity().result.results
// console.log(moviePopularity)
import header1 from '@/components/header1.vue';
</script>
<style scoped>
</style>
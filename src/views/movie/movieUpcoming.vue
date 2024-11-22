<template>
    <header1 content="即 将 上 线" url="https://cdn-icons-png.flaticon.com/128/10755/10755342.png"/>
    <List :List = "movieUpcoming" type="movie"/>
</template>
<script setup name="topMovieRated" lang="ts">
import { usemovieUpcoming } from '@/stores/Movies/movieUpcoming';
import List from '../List.vue';
const movieUpcoming = usemovieUpcoming().result.results;
import header1 from '@/components/header1.vue';
</script>

<style scoped>

</style>
<template>
<header1 content="流 行 榜 单" url="https://cdn-icons-png.flaticon.com/128/1742/1742783.png"/>
    <List :List="TVPopular" type="TV"/>
</template>
<script setup lang="ts" name="TVonTheAir">
import List from '../List.vue';
import { useTVPopular } from '@/stores/TV/TVPopular';
const TVPopular = useTVPopular().result.results
// console.log(moviePopularity)
import header1 from '@/components/header1.vue';
</script>
<style scoped>


</style>
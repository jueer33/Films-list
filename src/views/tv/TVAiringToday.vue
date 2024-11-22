<template>
    <header1 content="今 日 播 出" url="https://cdn-icons-png.flaticon.com/128/2859/2859705.png"/>

    <List :List="TVAiringToday" type="TV"/>
</template>
<script setup lang="ts" name="TVAiringToday">
import List from '../List.vue';
import { useTVAiringToday } from '@/stores/TV/TVAiringToday';
const TVAiringToday = useTVAiringToday().result.results
// console.log(moviePopularity)
import header1 from '@/components/header1.vue';
</script>

<style scoped></style>
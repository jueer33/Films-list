<template>
<header1 content="正 在 播 放" url="https://cdn-icons-png.flaticon.com/128/9582/9582436.png"/>
    <List :List="TVonTheAir" type="TV"/>
</template>
<script setup lang="ts" name="TVonTheAir">
import List from '../List.vue';
import { useTVonTheAir } from '@/stores/TV/TVonTheAir';
const TVonTheAir = useTVonTheAir().result.results
// console.log(moviePopularity)
import header1 from '@/components/header1.vue';

</script>
<style scoped>


</style>
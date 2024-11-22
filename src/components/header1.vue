<template>

    <div :style="{ '--background-url': `url(${url})` }">{{ props.content }}</div>
</template>
<script setup name="div" lang="ts">
const props = defineProps({
    content: String,
    url: String
});
</script>
<style scoped>
div {
    width: 100%;
    margin: 40px 0;
    text-align: center;
    background-image: var(--background-url);
    background-repeat: no-repeat;
    background-position: center;
}

@media (max-width: 767px) {
    div {
        height: 45px;
        line-height: 45px;
        font-size: 30px;
        background-size: 30px;
        background-position: calc(50% - 100px) center
    }

}

@media (min-width: 768px) and (max-width: 1024px) {
    div {
        font-size: 40px;
        /* width: 60px; */
        height: 60px;
        line-height: 60px;
        background-size: 40px;
        background-position: calc(50% - 140px) center
    }
}

@media (min-width: 1024px) {
    div {
        font-size: 50px;
        height: 75px;
        line-height: 75px;
        background-size: 50px;
        background-position: calc(50% - 170px) center;
    }

}
</style>
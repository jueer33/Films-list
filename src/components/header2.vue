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
    margin: 20px 0;
    text-align: center;
    background-image: var(--background-url);
    background-repeat: no-repeat;
    background-position: center;
}

@media (max-width: 767px) {
    div {
        height: 30px;
        line-height: 30px;
        font-size: 24px;
        background-size: 24px;
        background-position: calc(50% - 100px) center
    }

}

@media (min-width: 768px) and (max-width: 1024px) {
    div {
        font-size: 28px;
        /* width: 60px; */
        height: 40px;
        line-height: 40px;
        background-size: 28px;
        background-position: calc(50% - 140px) center
    }
}

@media (min-width: 1024px) {
    div {
        font-size: 32px;
        height: 60px;
        line-height: 60px;
        background-size: 32px;
        background-position: calc(50% - 170px) center;
    }

}
</style>
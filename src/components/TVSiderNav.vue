<template>
    <div class="sider">
        <RouterLink to="/TV/TVAiringToday" class="TVAiringToday" active-class="active">今日播出</RouterLink>
        <RouterLink to="/TV/TVonTheAir" class="TVonTheAir" active-class="active">正在播放</RouterLink>
        <RouterLink to="/TV/TVPopular" class="TVPopular" active-class="active">流行榜单</RouterLink>
        <RouterLink to="/TV/TVtopRated" class="TVtopRated" active-class="active">高分榜单</RouterLink>

    </div>


</template>
<script setup name="TVSidernav" lang="ts">
import { RouterLink } from 'vue-router'

</script>
<style scoped>
.sider {
    position: fixed;
    display: flex;
    flex-direction: column;
    background-color: var(--sider-back-all);
    box-shadow: 5px 5px 5px var(--box-shadow);
    border-radius: 10px;
    z-index: 1000;
}


.sider .TVAiringToday,
.sider .TVonTheAir,
.sider .TVPopular,
.sider .TVtopRated {
    display: block;
    text-align: center;
    border-radius: 10px;
    margin: 5px 5px;
}

.sider .TVAiringToday:hover,
.sider .TVonTheAir:hover,
.sider .TVPopular:hover,
.sider .TVtopRated:hover {
    /* background-color: var(--sider-back-hover) ; */
    color: var(--reversed-text);
}

.sider .TVAiringToday {
    background-color: var(--sider-back1);
}

.sider .TVonTheAir {
    background-color: var(--sider-back2);

}

.sider .TVPopular {
    background-color: var(--sider-back3);
}

.sider .TVtopRated {
    background-color: var(--sider-back4);
}

.active {
    background-color: var(--router-sider-active);
    color: var(--reversed-text);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
    transition: transform 0.5s ease, box-shadow 0.3s ease;
}

@media (max-width: 767px) {

    .sider .TVAiringToday,
    .sider .TVonTheAir,
    .sider .TVPopular,
    .sider .TVtopRated {
        width: 60px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
    }

    /* .sider {
        left: 0px;

        top: 350px;
    } */
}

@media (min-width: 768px) and (max-width: 1024px) {

    .sider .TVAiringToday,
    .sider .TVonTheAir,
    .sider .TVPopular,
    .sider .TVtopRated {
        width: 90px;
        height: 30px;
        line-height: 30px;
    }

    /* .sider {
        left: 0px;
        top: 380px;
    } */
}

@media (min-width: 1024px) {

    .sider .TVAiringToday,
    .sider .TVonTheAir,
    .sider .TVPopular,
    .sider .TVtopRated {
        width: 100px;
        height: 40px;
        line-height: 40px;
    }

    /* .sider {
        left: 0px;
        top: 400px;
    } */
}
</style>

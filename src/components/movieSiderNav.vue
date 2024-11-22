<template>
    <div class="sider">
        <RouterLink to="/movie/movieNowPlaying" class="movieNowPlaying" active-class="active">正在热映</RouterLink>
        <RouterLink to="/movie/movieUpcoming" class="movieUpcoming" active-class="active">即将上线</RouterLink>
        <RouterLink to="/movie/moviePopularity" class="moviePopularity" active-class="active">流行榜单</RouterLink>
        <RouterLink to="/movie/movieTopRated" class="movieTopRated" active-class="active">高分榜单</RouterLink>

    </div>


</template>
<script setup name="movieSidernav" lang="ts">
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


.sider .moviePopularity,
.sider .movieTopRated,
.sider .movieUpcoming,
.sider .movieNowPlaying {
    display: block;
    text-align: center;
    border-radius: 10px;
    margin: 5px 5px;
}

.sider .moviePopularity:hover,
.sider .movieTopRated:hover,
.sider .movieUpcoming:hover,
F .sider .movieNowPlaying:hover {
    color: var(--reversed-text);

}

.sider .moviePopularity {
    background-color: var(--sider-back3);
}

.sider .movieTopRated {
    background-color: var(--sider-back4);

}

.sider .movieUpcoming {
    background-color: var(--sider-back2);
}

.sider .movieNowPlaying {
    background-color: var(--sider-back1);
}

.active {
    background-color: var(--router-sider-active);
    color: var(--reversed-text);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@media (max-width: 767px) {

    .sider .moviePopularity,
    .sider .movieTopRated,
    .sider .movieUpcoming,
    .sider .movieNowPlaying {
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

    .sider .moviePopularity,
    .sider .movieTopRated,
    .sider .movieUpcoming,
    .sider .movieNowPlaying {
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

    .sider .moviePopularity,
    .sider .movieTopRated,
    .sider .movieUpcoming,
    .sider .movieNowPlaying {
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

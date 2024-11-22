<template>
    <div class="content" v-if="movieDetail">
        <div class="star">
        <user-star mediatype='movie' :id="itemID" :name ="movieDetail.title" :image="fileAPI.postImage + movieDetail.poster_path"/>
      </div>
        <a :href="movieDetail.homepage" class="homepage">
            <header1 :content="movieDetail.title" />
        </a>
        <div class="poster">
            <img :src="fileAPI.postImage + movieDetail.poster_path" alt="" class="posterimg">
            <div class="center">
                <!-- <img class="backdrop" :src="fileAPI.postImage + movieDetail.backdrop_path" alt=""> -->
                <div class="text">
                    <div class="original">
                        <p>标题：<span>{{ movieDetail.original_title }}</span></p>
                        <p>国家：<span>{{ movieDetail.origin_country.join(', ') }}</span></p>
                        <p>语言：<span>{{ movieDetail.original_language }}</span></p>
                    </div>
                    <div class="genres">
                        <p>类别：</p>
                        <ul>
                            <li v-for="(item, id) in movieDetail.genres">
                                <p>{{ item.name }}</p>
                            </li>
                        </ul>
                    </div>


                    <div class="production">
                        <p id="information">制片信息</p>
                        <div class="flex">
                            <div class="companies">
                                <p>制片公司：</p>
                                <ul>
                                    <li v-for="company in movieDetail.production_companies">
                                        <p>{{ company.name }}</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="countries">
                                <p>制片国家：</p>
                                <ul>
                                    <li v-for="country in movieDetail.production_countries">
                                        <p>{{ country.name }}</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="date">
                                <p>制片时间：</p>
                                <p class="release_date">发布时间：{{ movieDetail.release_date }}</p>
                                <p class="runtime">放映时长：{{ movieDetail.runtime }}</p>

                            </div>

                        </div>
                    </div>
                    <div class="imdbID">
                        imdb_id：{{ movieDetail.imdb_id }}
                    </div>
                    <div class="vote">
                        <!-- <p>评分</p> -->
                        <p class="vote_average">
                            均分：{{ movieDetail.vote_average }}
                        </p>
                        <p class="vote_count">
                            投票数：{{ movieDetail.vote_count }}
                        </p>
                    </div>
                    <div class="overview">
                        概览：{{ movieDetail.overview }}
                    </div>
                </div>

            </div>
        </div>

    </div>


</template>


<style scoped>
.poster,
.posterimg {
    width: 100%;
    height: auto;
    position: relative;
    border-radius: 30px;
    /* 设置为相对定位，确保子元素绝对定位基于此元素 */
    /* bottom: 100px; */
}


.center {
    position: absolute;
    background: var(--poster-back);
    border-radius: 30px;
    box-shadow: 10px 10px 10px var(--box-shadow);
    mask-image: linear-gradient(to bottom, var(--poster-back) 0%, var(--poster-back) 20%, rgba(0, 0, 0, 0) 60%);
    -webkit-mask-image: linear-gradient(to bottom, var(--poster-back) 0%, var(--poster-back) 20%, rgba(0, 0, 0, 0) 60%);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.original,
.genres,
.genres ul {
    display: flex;
    align-items: center;
}

.genres ul p {
    border-radius: 5px;
    background-color: var(--text-button);
    text-align: center;
}

.genres {
    background-image: url('https://cdn-icons-png.flaticon.com/512/5526/5526341.png');
    background-repeat: no-repeat;
    background-position: left center;
}

.original {
    background-image: url('https://cdn-icons-png.flaticon.com/128/189/189664.png');
    background-repeat: no-repeat;
    background-position: left center;
}

.production #information {
    background-image: url('https://cdn-icons-png.flaticon.com/128/562/562501.png');
    background-repeat: no-repeat;
    background-position: left center;
}

.imdbID {
    background-image: url('https://cdn-icons-png.flaticon.com/128/5584/5584515.png');
    background-repeat: no-repeat;
    background-position: left center;
}

.vote {
    background-image: url('https://cdn-icons-png.flaticon.com/128/3387/3387788.png');
    background-repeat: no-repeat;
    background-position: left center;
}

.overview {
    background-image: url('https://cdn-icons-png.flaticon.com/128/18289/18289428.png');
    background-repeat: no-repeat;
    background-position: left center;
}

.production .flex {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
}

.production>div {
    /* width: 50px; */
    height: 100%;
    background-color: var(--production-back);
    border-radius: 20px;
    box-shadow: 5px 5px 5px var(--box-shadow);
}

.original span {
    font-style: italic;
    font-weight: bolder;
}

.vote {
    display: flex;
}

@media (max-width: 767px) {
    .poster {}

    .center {
        top: 40px;
        left: 40px;
        right: 40px;
        bottom: 40px;
        padding: 40px;
        /* top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        padding: 40px; */
        /* 顶部是自身高度的1/3，其余都是120px */
        font-size: 14px;
        /* bottom: 80px; */


    }

    .genres,
    .original,
    .production #information,
    .imdbID,
    .vote,
    .overview {
        background-size: 20px;
        padding-left: 30px;
        margin: 10px 0;
    }

    .genres p,
    .original,
    .production p,
    .imdbID,
    .vote,
    .overview {
        height: 20px;
        line-height: 20px;
        /* margin: 0 5px; */
    }

    .genres ul p {
        padding: 0 5px;
        margin: 0 5px;


    }

    .original p,
    .vote p {
        margin-right: 10px;

    }

    .original span {
        font-style: italic;
        font-weight: bolder;
    }

    .production .flex {
        padding: 0 30px;
        margin: 5px 0;
    }

    /*
    .text {
        margin-top: 40px;
        bottom: 80px;

    } */
}

@media (min-width: 768px) and (max-width: 1024px) {
    .center {
        top: 60px;
        left: 60px;
        right: 60px;
        bottom: 60px;
        padding: 60px;

        /* top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        padding: 80px; */
        /* 顶部是自身高度的1/3，其余都是120px */
        font-size: 20px;
    }

    .genres,
    .original,
    .production #information,
    .imdbID,
    .vote,
    .overview {
        background-size: 30px;
        padding-left: 35px;
        margin: 10px 0;
    }

    .genres p,
    .original,
    .production p,
    .imdbID,
    .vote,
    .overview {
        height: 30px;
        line-height: 30px;
        /* margin: 0 5px; */
    }

    .genres ul p {
        padding: 0 5px;
        margin: 0 10px;

    }

    .original p,
    .vote p {
        margin-right: 20px;

    }

    .original span {
        font-style: italic;
        font-weight: bolder;
    }

    .production .flex {
        padding: 0 35px;
        margin: 10px 0;
    }

    /*
    .text {
        margin-top: 60px;
    } */
}

@media (min-width: 1024px) {
    .center {
        top: 140px;
        left: 140px;
        right: 140px;
        bottom: 140px;
        padding: 70px;

        /* top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        padding: 140px; */
        /* 顶部是自身高度的1/3，其余都是120px */
        font-size: 24px;
    }

    .genres,
    .original,
    .production #information,
    .imdbID,
    .vote,
    .overview {
        background-size: 40px;
        padding-left: 50px;
        margin: 20px 0;
    }

    .genres p,
    .original,
    .production p,
    .imdbID,
    .vote,
    .overview {
        height: 40px;
        line-height: 40px;
        /* margin: 0 5px; */
    }

    .genres ul p {
        padding: 0 10px;
        margin: 0 10px;
    }

    .original p,
    .vote p {
        margin-right: 25px;

    }

    .original span {
        font-style: italic;
        font-weight: bolder;
    }

    .production .flex {
        padding: 0 50px;
        margin: 20px 0;
    }

    /* .text {
        margin-top: 60px;
    } */
}
</style>


<script setup lang="ts" name="movieDetail">
// 页面逻辑导入
import header1 from '@/components/header1.vue';
import { fileAPI } from '@/http/api';
import UserStar from "@/views/movie/user-star.vue";
import { useRoute } from 'vue-router';
const route = useRoute()
const itemID = route.query.id
// console.log("22222222",itemID)
// 获取详情页ID

// 创建请求api
import apllyApi from '@/utils/apiUtil';
import { options } from '@/http/authorization';
import { onMounted, ref, watch } from 'vue';


const movieDetail = ref(null);  // 使用 ref 来存储异步获取的数据

// 异步获取详情数据的函数
const fetchMovieDetail = async () => {
    try {
        movieDetail.value = await apllyApi(`https://api.themoviedb.org/3/movie/${itemID}`, options);
        console.log("电影详情:", movieDetail.value);
    } catch (error) {
        console.error("请求电影详情失败:", error);
    }
};

// 使用 watch 来观察 movieDetail 的变化
watch(() => movieDetail.value, (newValue) => {
    console.log('movieDetail 更新:', newValue);
}, { immediate: true });

// 页面加载时获取电影详情数据
onMounted(() => {
    fetchMovieDetail();
});



</script>

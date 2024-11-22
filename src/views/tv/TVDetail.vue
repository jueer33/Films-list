<template>
    <div class="content" v-if="TVDetail">
      <div class="star">
        <user-star mediatype='tv' :id="itemID" :name="TVDetail.name" :image="fileAPI.postImage+TVDetail.poster_path"/>
      </div>
        <a :href="TVDetail.homepage" class="homepage">
            <header1 :content="TVDetail.name" />
        </a>
        <div class="poster">
            <img :src="fileAPI.postImage + TVDetail.poster_path" alt="" class="posterimg">
            <div class="center">
                <!-- <img class="backdrop" :src="fileAPI.postImage + TVDetail.backdrop_path" alt=""> -->
                <div class="text">
                    <div class="original">
                        <p>标题：<span>{{ TVDetail.original_name }}</span></p>
                        <p>国家：<span>{{ TVDetail.origin_country.join(', ') }}</span></p>
                        <p>语言：<span>{{ TVDetail.original_language }}</span></p>
                    </div>
                    <div class="genres">
                        <p>类别：</p>
                        <ul>
                            <li v-for="(item, id) in TVDetail.genres">
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
                                    <li v-for="company in TVDetail.production_companies">
                                        <p>{{ company.name }}</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="countries">
                                <p>制片国家：</p>
                                <ul>
                                    <li v-for="country in TVDetail.production_countries">
                                        <p>{{ country.name }}</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="date">
                                <p>制片时间：</p>
                                <p class="release_date">首次上映：{{ TVDetail.first_air_date }}</p>
                                <p class="runtime">最近上映：{{ TVDetail.last_air_date }}</p>

                            </div>

                        </div>
                    </div>
                    <div class="imdbID">
                        id：{{ TVDetail.id }}
                    </div>
                    <div class="vote">
                        <!-- <p>评分</p> -->
                        <p class="vote_average">
                            均分：{{ TVDetail.vote_average }}
                        </p>
                        <p class="vote_count">
                            投票数：{{ TVDetail.vote_count }}
                        </p>
                        <p class="popularity">
                            人气：{{ TVDetail.popularity }}
                        </p>
                    </div>
                    <div class="overview">
                        概览：{{ TVDetail.overview }}
                    </div>
                    <div class="seasons">
                        <p id="season">seasons:</p>
                        <p class="last_spisode">
                            上一集：{{TVDetail.last_episode_to_air.name}}：{{TVDetail.last_episode_to_air.air_date}}
                        </p>
                        <p class="next_spisode">
                            下一集：{{TVDetail.last_episode_to_air.name}}：{{ TVDetail.last_episode_to_air.air_date }}
                        </p>
                        <ul>
                            <li v-for=" season in TVDetail.seasons">
                                <p> {{ season.name }}：{{ season.air_date }}</p>
                            </li>
                        </ul>
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

/* p{
    overflow-x: auto;
    overflow: hidden;
    white-space: nowrap;
} */


.center {
    position: absolute;
    background: var(--poster-back);
    border-radius: 30px;
    box-shadow: 10px 10px 10px var(--box-shadow);
    mask-image: linear-gradient(to bottom, var(--poster-back) 0%, var(--poster-back) 30%, rgba(0, 0, 0, 0) 80%);
    -webkit-mask-image: linear-gradient(to bottom, var(--poster-back) 0%, var(--poster-back) 30%, rgba(0, 0, 0, 0) 80%);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
/* .text{
    display: flex;
    flex-direction: column;
} */
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
    /* height: auto; */
    overflow: hidden;  /* 隐藏超出高度的内容 */
    overflow-x: auto;
        white-space: nowrap;

}

.seasons #season {
    background-image: url('https://cdn-icons-png.flaticon.com/128/17785/17785501.png');
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
    /* margin-right: 5px; */
}
.seasons ul{
    display: flex;
    flex-wrap: wrap;
}
.original span {
    font-style: italic;
    font-weight: bolder;
}

.vote {
    display: flex;
}
.seasons ul li{
    background-color:var(--seasons) ;
    border-radius: 10px;
}
@media (max-width: 767px) {

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
    .overview,
    .seasons #season ,  .seasons .last_spisode,.seasons .next_spisode{
        background-size: 20px;
        padding-left: 30px;
        margin: 10px 0;
    }

    .genres p,
    .original,
    .production p,
    .imdbID,
    .vote,
    .overview,
    .seasons p {
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
    .seasons ul{
        padding: 0 20px;
    }
    .seasons ul li{
        margin: 2px 5px;
        padding: 1px 5px;
    }
    /* .seasons .last_spisode,.seasons .next_spisode{
        padding: 0 30px;
    } */
    /*
    .text {
        margin-top: 40px;
        bottom: 80px;

    } */

}

@media (min-width: 768px) and (max-width: 1024px) {
    .center {
        top: 50px;
        left: 50px;
        right: 50px;
        bottom: 50px;
        padding: 50px;

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
    .overview,
    .seasons #season, .seasons .last_spisode,.seasons .next_spisode{
        background-size: 30px;
        padding-left: 35px;
        margin: 10px 0;
    }

    .genres p,
    .original,
    .production p,
    .imdbID,
    .vote,
    .overview,
    .seasons p{
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
    .seasons ul{
        padding: 0 25px;
    }
    .seasons ul li{
        margin: 3px 5px;
        padding: 1px 5px;
    }
    /* .seasons .last_spisode,.seasons .next_spisode{
        padding: 0 35px;
    } */
    /*
    .text {
        margin-top: 60px;
    } */
  /*
  .star{
    position: fixed;
    right: 10%;
    top: 118px;
  }*/
}

@media (min-width: 1024px) {
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
        padding: 140px; */
        /* 顶部是自身高度的1/3，其余都是120px */
        font-size: 22px;
    }

    .genres,
    .original,
    .production #information,
    .imdbID,
    .vote,
    .overview,
    .seasons #season,.seasons .last_spisode,.seasons .next_spisode{
        background-size: 35px;
        padding-left: 45px;
        margin: 15px 0;
    }

    .genres p,
    .original,
    .production p,
    .imdbID,
    .vote,
    .overview,
    .seasons p{
        height: 35px;
        line-height: 35px;
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
        padding: 0 45px;
        margin: 20px 0;
    }

    .seasons ul{
        padding-left: 35px;
    }
    .seasons ul li{
        margin: 2px 5px;
        /* margin-right:10px; */
        padding: 1px 5px;
    }
    /* .text {
        margin-top: 60px;
    } */
    /* .seasons .last_spisode,.seasons .next_spisode,{
        padding: 0 45px;
    } */
  /*
  .star{
    position: fixed;
    right: 10%;
    top: 165px;
  }*/

}
</style>


<script setup lang="ts" name="TVDetail">
// 页面逻辑导入
import header1 from '@/components/header1.vue';
import { fileAPI } from '@/http/api';

import { useRoute } from 'vue-router';
const route = useRoute()
const itemID = route.query.id
// console.log("22222222",itemID)
// 获取详情页ID

// 创建请求api
import apllyApi from '@/utils/apiUtil';
import { options } from '@/http/authorization';
import { onMounted, ref, watch } from 'vue';
import UserStar from "@/views/tv/user-star.vue";


const TVDetail = ref(null);  // 使用 ref 来存储异步获取的数据

// 异步获取详情数据的函数
const fetchTVDetail = async () => {
    try {
        TVDetail.value = await apllyApi(`https://api.themoviedb.org/3/tv/${itemID}`, options);
        console.log("电视剧详情:", TVDetail.value);
    } catch (error) {
        console.error("请求电视剧详情失败:", error);
    }
};

// 使用 watch 来观察 TVDetail 的变化
watch(() => TVDetail.value, (newValue) => {
    console.log('TVDetail 更新:', newValue);
}, { immediate: true });

// 页面加载时获取电影详情数据
onMounted(() => {
    fetchTVDetail();
});

</script>

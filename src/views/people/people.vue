<template>
    <div class="people">
        <div class="top">
            <!-- <div class="image">
                <img :src="fileAPI.postImage + peopleDetail.profile_path" alt="">
            </div> -->
            <div class="carousel">
                <peopleCarousel @updateData="handleUpdateData" />
            </div>
            <div class="mess">
                <!-- <h1 class="header">
                    演员一览
                </h1> -->
                <header1 class="header" content="演 员 一 览"
                    url="https://cdn-icons-png.flaticon.com/128/9104/9104916.png" />

                <p class="name">姓名：{{ peopleDetail.name }}</p>
                <p class="Oname">原名：{{ peopleDetail.original_name }}</p>
                <p class="popularity">人气：{{ peopleDetail.popularity }}</p>
                <div class="works">
                    <p class="work">代表作：</p>
                    <ul>
                        <li v-for="(work, id) in peopleDetail.known_for" :key="id">
                            {{ work.original_title || work.title || work.name }}
                            <span> {{ work.vote_average }}</span>
                        </li>
                    </ul>
                </div>
            </div>


        </div>

        <div class="magnum-opu">
            <ul>
                <li v-for="(work, id) in peopleDetail.known_for" :key="id">
                    <img :src="fileAPI.postImage + work.poster_path" alt="">
                    <div class="content">
                        <p>名称：{{ work.title || work.name }}</p>
                        <p>媒体类型：{{ work.media_type }}</p>
                        <p>评分：{{ work.vote_average }}</p>
                        <p>人气：{{ work.popularity }}</p>
                        <p>时间：{{ work.first_air_date || work.release_date }}</p>
                        <p>预览：{{ work.overview }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script setup lang="ts">
import peopleCarousel from '@/components/peopleCarousel.vue';
import { fileAPI } from '@/http/api';
import { computed, ref } from 'vue';
import header1 from '@/components/header1.vue';
const peoplePopularList = ref([]);
const show_index = ref(0);

function handleUpdateData(data: { peoplePopularList: any, show_index: number }) {
    peoplePopularList.value = data.peoplePopularList;
    show_index.value = data.show_index;
}

const defaultPersonDetail = { "adult": false, "gender": 1, "id": 1245, "known_for_department": "Acting", "name": "Scarlett Johansson", "original_name": "Scarlett Johansson", "popularity": 281.271, "profile_path": "/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg", "known_for": [{ "backdrop_path": "/ozVwXlfxqNsariipatGwa5px3Pm.jpg", "id": 240832, "title": "Lucy", "original_title": "Lucy", "overview": "A woman, accidentally caught in a dark deal, turns the tables on her captors and transforms into a merciless warrior evolved beyond human logic.", "poster_path": "/kRbpUTRNm6QbLQFPFWUcNC4czEm.jpg", "media_type": "movie", "adult": false, "original_language": "en", "genre_ids": [28, 878], "popularity": 71.807, "release_date": "2014-07-25", "video": false, "vote_average": 6.453, "vote_count": 15923 }, { "backdrop_path": "/dq18nCTTLpy9PmtzZI6Y2yAgdw5.jpg", "id": 497698, "title": "Black Widow", "original_title": "Black Widow", "overview": "Natasha Romanoff, also known as Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.", "poster_path": "/kwB7d51AIcyzPOBOHLCEZJkmPhQ.jpg", "media_type": "movie", "adult": false, "original_language": "en", "genre_ids": [28, 12, 878], "popularity": 94.978, "release_date": "2021-01-01", "video": false, "vote_average": 7.232, "vote_count": 10132 }, { "backdrop_path": "/7lINTRMapEkgQbwYfAYX3178xRf.jpg", "id": 315837, "title": "Ghost in the Shell", "original_title": "Ghost in the Shell", "overview": "In the near future, Major is the first of her kind: a human saved from a terrible crash, then cyber-enhanced to be a perfect soldier devoted to stopping the world's most dangerous criminals.", "poster_path": "/myRzRzCxdfUWjkJWgpHHZ1oGkJd.jpg", "media_type": "movie", "adult": false, "original_language": "en", "genre_ids": [878, 18, 28], "popularity": 50.712, "release_date": "2017-03-29", "video": false, "vote_average": 6.1, "vote_count": 7948 }] }

const peopleDetail = computed(() => {
    const person = peoplePopularList.value[show_index.value];
    return person || defaultPersonDetail;
});



const works = { "backdrop_path": "/ozVwXlfxqNsariipatGwa5px3Pm.jpg", "id": 240832, "title": "Lucy", "original_title": "Lucy", "overview": "A woman, accidentally caught in a dark deal, turns the tables on her captors and transforms into a merciless warrior evolved beyond human logic.", "poster_path": "/kRbpUTRNm6QbLQFPFWUcNC4czEm.jpg", "media_type": "movie", "adult": false, "original_language": "en", "genre_ids": [28, 878], "popularity": 71.807, "release_date": "2014-07-25", "video": false, "vote_average": 6.453, "vote_count": 15923 }
</script>

<style scoped>
.top {
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin-bottom: 50px;
}


/* .image{
    border-radius: 20px;
    overflow: hidden;
    border-radius: 5%;
    box-shadow: 5px 5px 5px var(--people-carousel-shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease; 
} */
/* .image:hover{ */
/* transform: translateY(-5px) scale(1.02);  */
/* box-shadow: 10px 10px 10px var(--people-carousel-shadow); } */
/* .image img{
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
    border-radius: 20px;
}  */


.name {
    background-image: url('https://cdn-icons-png.flaticon.com/128/9533/9533813.png');
}

.Oname {
    background-image: url('https://cdn-icons-png.flaticon.com/128/11796/11796087.png');
}

.popularity {
    background-image: url('https://cdn-icons-png.flaticon.com/128/426/426833.png');
}

.work {
    background-image: url('https://cdn-icons-png.flaticon.com/128/4388/4388415.png');
}

.magnum-opu ul li {
    position: relative;

}

.content {
    position: absolute;
    bottom: 0;
    width: 100%;
    opacity: 0.5;
    background: linear-gradient(to top, var(--gradation-botton), var(--gradation-top));
    /* 渐变透明 */
}

.content:hover {
    opacity: 1;
}

@media (max-width: 767px) {
    .mess {
        padding-top: 0px;
        padding-left: 20px;
        flex: 1;
        width: 100%;
        overflow: hidden;
        overflow-x: auto;
        white-space: nowrap;

    }

    .mess p {

        white-space: nowrap;
        overflow-x: auto;
        background-size: 20px;
        height: 20px;
        line-height: 20px;
        padding-left: 30px;
        font-size: 15px;
        margin-bottom: 10px;
        background-repeat: no-repeat;

    }

    .works li {
        height: 20px;
        line-height: 18px;
        padding-left: 60px;
        font-size: 13px;
        margin-bottom: 10px;
        background-image: url('https://cdn-icons-png.flaticon.com/128/17693/17693130.png');
        background-size: 20px;
        background-repeat: no-repeat;
        background-position: 30px center;
        overflow-x: auto;
        white-space: nowrap;

    }


    .magnum-opu ul {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 30px;
        margin: 0;
    }

    .magnum-opu ul li {
        flex: 1;
        /* padding: 0 5px; */
        margin: 5px;
        list-style: none;
    }

    .magnum-opu ul li img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 5px;
    }

    .magnum-opu .content p {
        height: 30px;
        margin: 5px;
        overflow-x: auto;
        white-space: nowrap;

    }


}

@media (min-width: 768px) and (max-width: 1024px) {
    .mess {
        padding-left: 50px;
        padding-top: 0px;
        flex: 1;
        width: 100%;
        overflow: hidden;
        overflow-x: auto;
        white-space: nowrap;

    }

    .mess p {

        white-space: nowrap;
        overflow-x: auto;
        background-size: 30px;
        height: 30px;
        line-height: 30px;
        padding-left: 40px;
        font-size: 20px;
        margin-bottom: 10px;
        background-repeat: no-repeat;

    }

    .works li {
        height: 30px;
        line-height: 30px;
        padding-left: 70px;
        font-size: 18px;
        margin-bottom: 10px;
        background-image: url('https://cdn-icons-png.flaticon.com/128/17693/17693130.png');
        background-size: 30px;
        background-repeat: no-repeat;
        background-position: 30px center;
        overflow-x: auto;
        white-space: nowrap;


    }

    .magnum-opu ul {
        display: flex;
        justify-content: space-between;
        padding-bottom: 350px;
        margin: 0;
    }

    .magnum-opu ul li {
        flex: 1;
        /* padding: 0 5px; */
        margin: 5px;
        list-style: none;
    }

    .magnum-opu ul li img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 5px;
    }

    .magnum-opu .content p {
        height: 20px;
        margin: 5px;
        white-space: nowrap;
        overflow-x: auto;
    }


}

@media (min-width: 1024px) {

    .mess {
        padding-top: 0px;
        padding-left: 100px;
        flex: 1;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        overflow-x: auto;
    }

    .mess p {

        white-space: nowrap;
        overflow-x: auto;
        background-size: 50px;
        height: 50px;
        line-height: 50px;
        padding-left: 60px;
        font-size: 30px;
        margin-bottom: 10px;
        background-repeat: no-repeat;

    }

    .works li {
        height: 40px;
        line-height: 40px;
        padding-left: 80px;
        font-size: 25px;
        margin-bottom: 10px;
        background-image: url('https://cdn-icons-png.flaticon.com/128/17693/17693130.png');
        background-size: 40px;
        background-repeat: no-repeat;
        background-position: 30px center;
        white-space: nowrap;
        overflow-x: auto;

    }


    .magnum-opu ul {
        display: flex;
        justify-content: space-between;
        padding-bottom: 50px;
        margin: 0;
    }

    .magnum-opu ul li {
        flex: 1;
        /* padding: 0 5px; */
        margin: 5px;
        list-style: none;
    }

    .magnum-opu ul li img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 5px;
    }

    .magnum-opu .content p {
        height: 20px;
        margin: 5px;
        white-space: nowrap;
        overflow-x: auto;
    }

}
/* 

/* 标题 */
/* .header {
    width: 100%;
    text-align: center;
}

@media (max-width: 767px) {
    .header {
        margin: 20px;

        font-size: 20px;
    }
}

@media (min-width: 768px) and (max-width: 1024px) {
    .header {
        margin: 20px;
        font-size: 40px;
    }
}

@media (min-width: 1024px) {
    .header {
        margin: 40px;
        font-size: 50px;
    }
} */
</style> 

<script setup lang="ts">
import {useUserStore} from '@/stores/setting/useUser';
import {onMounted, ref} from 'vue';
import {fetchTVs} from '@/utils/backendtools/tvinfo';
import {fetchMovies} from "@/utils/backendtools/movieinfo";
import Header2 from "@/components/header2.vue";
import { ElMessage } from 'element-plus';

const userStore = useUserStore();
const email = ref('');  // 用来存储 email 的局部变量
const tvs = ref<any[]>([]);  // 用来存储 fetchedTVs 的响应式变量
const movies = ref<any[]>([]);  // 用来存储 fetchedTVs 的响应式变量

// 在组件加载时，先加载用户数据
onMounted(async () => {
  await userStore.loadUserData();  // 等待加载完毕
  email.value = userStore.email;  // 获取最新的 email

  if (email.value) {
    await getUserTVs();  // 在 email 加载完成后再调用 API
    await getUsermovies()
  } else {
    ElMessage.error('Email is not available.');
  }
});


// 获取用户 TV 数据
async function getUserTVs() {
  try {
    const fetchedTVs = await fetchTVs({email: email.value});
    tvs.value = fetchedTVs;  // 将获取的数据保存到 tvs 中
    console.log('User TVs:', tvs.value);
  } catch (error) {
    ElMessage.error('Error fetching user TVs:', error);
  }
}

// 获取用户 TV 数据
async function getUsermovies() {
  try {
    const fetchedMovies = await fetchMovies({email: email.value});
    movies.value = fetchedMovies;  // 将获取的数据保存到 tvs 中
    console.log('User movies:', movies.value);
  } catch (error) {
    ElMessage.error('Error fetching user movies:', error);
  }
}

function formatDate(date: string | null): string {
  if (!date) {
    return 'NAN';
  }
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC'
  };
  return new Date(date).toLocaleString('en-US', options);
}



</script>


<style scoped>
.content{
    /* top:0px; */
    margin-top: 80px;
    bottom:80px ;

    position: relative;
}
.even {
  background-color: var(--li-color1); /* 灰白色 */
}

.odd {
  background-color: var(--li-color2); /* 白色 */
}




ul li .rout {
  display: flex;
  box-shadow: 5px 5px 5px var(--box-shadow);
  border-radius: 20px;
  overflow: hidden;
  margin: 20px 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease,background-color 0.3s ease; /* 添加过渡效果 */
}

ul li .rout:hover {
  transform: scale(1.05); /* 鼠标悬浮时稍微放大 */
  box-shadow: 8px 8px 10px var(--box-shadow); /* 增加阴影效果 */
  background-color: var(--home-routerview-back);
}


ul {
    display: flex;
    flex-direction: column;
    align-content: center;
  }
  ul li img{
    box-shadow: 2px 2px 4px  var(--box-shadow);
    mask: linear-gradient(to right, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%);
  }
@media (max-width: 767px) {
  .content {
    display: flex;
    flex-direction: column;

  }
  /* ul li {
    margin: 20px;
    font-size: 16px;
    padding: 10px;
  } */
  ul li .img{
    width: 100px;
    height: 150px;
    margin-right:10px ;
  }
  ul li img{
    width: 100px;
    height: auto;
  }
  ul li .text{
    display: flex;
    font-size: 16px;
    flex-direction: column;
    justify-content: space-around;
  }
}

@media (min-width: 768px) and (max-width: 1320px) {
    .content {
    display: flex;
    flex-direction: column;
    /* bottom: 190px; */
    /* justify-content: space-between; */
  }
  /* ul li {
    margin: 20px;
    font-size: 16px;
    padding: 10px;
  } */
  ul li .img{
    width: 120px;
    height: 180px;
    margin-right:20px ;
  }
  ul li img{
    width: 120px;
    height: auto;
  }
  ul li .text{
    display: flex;
    font-size:22px ;
    flex-direction: column;
    justify-content: space-around;
  }
}


@media (min-width: 1320px) {
    .content {
    display: flex;
    /* flex-direction: column; */
justify-content: space-between;
  }
  .movie ,.tv{
    width: 100%;
}
.movie{
    margin-right: 40px;
}

  /* ul li {
    margin: 20px;
    font-size: 16px;
    padding: 10px;
  } */

  ul li .img{
    width: 130px;
    height: 195px;
    margin-right:20px ;
  }
  ul li img{
    width: 130px;
    height: auto;
  }
  ul li .text{
    display: flex;
    font-size: 24px;
    flex-direction: column;
    justify-content: space-around;

    overflow-x: auto;
    overflow: hidden;
    /* white-space: nowrap; */

  }
}



</style>

<template>
  <div class="content">

    <div class="movie">
      <header2 content="movie favorate"/>
      <ul>
        <li
          v-for="(movie, index) in movies"
          :key="movie.movieid"
          
        >
        <router-link :to="{ path: '/movie/movieDetail', query: { id: movie.tmdbid } }" class="rout" :class="index % 2 === 0 ? 'odd' : 'even'">
        <div class="img">
            <img :src=movie.image alt="">
        </div>
          <div class="text">
            <p><strong>name:</strong> {{ movie.moviename }}</p>
            <p><strong>Movie TMDB ID:</strong> {{ movie.tmdbid }}</p>
            <p><strong>Date:</strong> {{ formatDate(movie.date) }}</p>
          </div>
        </router-link>
        </li>
      </ul>
    </div>

    <div class="tv">
      <header2 content="tv favorate"/>
      <ul>
        <li
          v-for="(tv, index) in tvs"
          :key="tv.tvid"
         
        >
        <router-link :to="{ path: '/TV/TVDetail', query: { id: tv.tmdbid } }" class="rout"  :class="index % 2 === 0 ? 'even' : 'odd'">

        <div class="img">
            <img :src="tv.image" alt="">
        </div>
          <div class="text">
            <p><strong>name:</strong> {{ tv.tvname }}</p>
            <p><strong>tv TMDB ID:</strong> {{ tv.tmdbid }}</p>
            <p><strong>Release Date:</strong> {{ formatDate(tv.date) }}</p>
          </div>
        </router-link>

        </li>
      </ul>
    </div>
  </div>

</template>

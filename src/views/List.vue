<template>
  <div class="content">
    <ul>
      <li v-for="(item, id) in props.List" :key="id">
        <RouterLink :to="getLink(item)">
          <img :src="`${fileAPI.postImage}${item.backdrop_path}`" alt="" @error="setDefaultImage">
          <div class="title">{{ item.original_title || item.original_name }}</div>
          <div class="date">{{ item.release_date || item.first_air_date }}</div>
          <div class="vote_average"><span class="icon"></span><span class="num">{{ item.vote_average }}</span>
          </div>
        </RouterLink>


      </li>
    </ul>
  </div>
</template>
<script setup lang="ts" name="LIST">
import {fileAPI} from '@/http/api';

const props = defineProps({
  List: Object,
  type: String
});

// 动态生成路由链接
const getLink = (item: any) => {
  if (props.type === 'movie') {
    // console.log("33333333",item.id)
    return {name: 'movieDetail', query: {id: item.id}};
  } else if (props.type === 'TV') {
    return {name: 'TVDetail', query: {id: item.id}};
  }
  return '/'; // 默认返回主页或其他路径
};


// console.log(props)
function setDefaultImage(event: any) {
  event.target.src = "https://cdn.pixabay.com/photo/2018/09/03/11/51/pictures-3651039_640.png"
}
</script>
<style scoped>
.content {
  flex: 1;
  overflow: auto;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;


}

li {
  position: relative;
}
li:hover img ,li:hover .vote_average .icon{
  transform: scale(1.1); /* 放大到1.1倍 */
  transition: transform 0.3s ease; /* 平滑过渡效果 */
}

img {
  box-shadow: 0px 4px 4px var(--box-shadow);
  object-fit: cover;
  border-radius: 20px;
  transition: transform 0.3s ease; /* 确保图片在非悬停状态下也有过渡效果 */
}

.title {
  font-weight: bold;
}

.date {
  color: #464646;
  font-size: 12px;
}

.vote_average {
  display: flex;
  align-items: center;
  overflow: hidden;
  position: absolute;
  top: 5px;
  left: 10px;
  height: 24px;
}

.vote_average .icon {
  justify-content: flex-start;
  background-size: contain;
  /* 确保图标根据容器大小调整 */
  background-repeat: no-repeat;
  /* 防止图标重复 */
  width: 24px;
  /* 设置图标的宽度 */
  height: 24px;
  /* 设置图标的高度 */
  margin-right: 4px;
  /* 给图标和数字之间添加间隔 */
  background-image: url("https://img.icons8.com/?size=48&id=19417&format=png");
  transition: transform 0.3s ease; /* 确保图片在非悬停状态下也有过渡效果 */
}

.vote_average .num {
  color: #ffffff;
}

@media (max-width: 767px) {
  .content {
    /* height: 300px; */
    margin: 10px 10px 10px 0px;

  }

  li {
    width: 150px;
    margin: 1px;
  }

  img {
    width: 150px;
    margin: 1px;
    height: 59px;
  }

  .date,
  .tatle,
  .vote_average {
    width: 150px;
  }


}

@media (min-width: 768px) and (max-width: 1024px) {
  .content {
    /* height: 400px; */
    margin: 20px 20px 20px 0px;

  }

  li {
    width: 200px;
    margin: 2px;
  }

  img {
    width: 200px;
    margin: 2px;
    height: 124.5px;
  }

  .date,
  .tatle,
  .vote_average {
    width: 200px;
  }

}

@media (min-width: 1024px) {
  .content {
    /* height: 500px; */
    margin: 30px 30px 30px 0px;
  }

  li {
    width: 300px;
    margin: 5px;
  }

  img {
    width: 300px;
    margin: 5px;
    height: 168.5px;
  }

  .date,
  .tatle,
  .vote_average {
    width: 300px;
  }

}
</style>

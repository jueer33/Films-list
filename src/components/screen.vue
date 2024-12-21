<template>
  <div class="carousel-navigation-container">
    <Transition name="carouselMap">
      <topCarousel v-if="showCarousel" />
    </Transition>
  </div>
  <topNavigation :class="{ 'move-up': !showCarousel, 'navigation': true }" />
  <div :class="{ 'up-content': !showCarousel, 'content': true }">
    <RouterView></RouterView>
  </div>

  <myfooter class="footer"/>



</template>

<script setup lang="ts">
import topCarousel from './topCarousel.vue';
import topNavigation from './topNavigation.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import myfooter from './myfooter.vue';
const email = '3354500479@qq.com'
const mailtoLink = `mailto:${email}`

const showCarousel = ref(true);

// 点击和鼠标事件的处理函数
const handleClickOutside = (event: any) => {
  if (!event.target.closest('.carousel-navigation-container')) {
    showCarousel.value = false;
  }
};
const handleMouseMove = (event: any) => {
  if (event.clientY < 10) {
    showCarousel.value = true;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('mousemove', handleMouseMove);
});
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('mousemove', handleMouseMove);
});
</script>





<style scoped>
/* 轮播图的平滑移动 */
.carouselMap-enter-active,
.carouselMap-leave-active {
  transition: transform 1s ease, opacity 1s ease;
}

.carouselMap-enter-from,
.carouselMap-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.carouselMap-enter-to,
.carouselMap-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.carousel-navigation-container {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

/* 导航栏的平滑移动 */
.navigation {
  position: fixed;
  top: 250px;
  transition: top 1s ease;
  /* 平滑过渡 */
  z-index: 1000;
}

.move-up {
  position: fixed;
  top: 0;
  z-index: 1000;
}

.content,
.up-content {
  background-color: var(--home-routerview-back);
}

/* Default styles */
.content {
  position: relative;
  top: 290px;
  transition: top 1s ease;
  /* 平滑过渡 */
}

.up-content {
  top: 40px;
  transition: top 1s ease;
  /* 平滑过渡 */
}


/* Small screen devices (max-width: 767px) */
@media (max-width: 767px) {
  .content {
    top: 250px;
    padding: 50px 20px 50px 20px;
  }

  .up-content {
    top: 0px;
    padding: 50px 20px 50px 20px;

  }

}

/* Medium screen devices (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .content {
    top: 270px;
    padding: 50px 80px 50px 80px;


  }

  .up-content {
    top: 20px;
    padding: 50px 80px 50px 80px;


  }

}

/* Large screen devices (min-width: 1024px) */
@media (min-width: 1024px) {
  .content {
    top: 270px;
    padding: 90px 135px 90px 135px;


  }

  .up-content {
    top: 20px;
    padding: 90px 140px 90px 140px;


  }


}
</style>





<!-- transform会影响fxed布局 -->

<!-- 
<style scoped>
/* 轮播图的平滑移动 */
.carouselMap-enter-active,
.carouselMap-leave-active {
  transition: transform 1s ease, opacity 1s ease;
}

.carouselMap-enter-from,
.carouselMap-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.carouselMap-enter-to,
.carouselMap-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.carousel-navigation-container {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

/* 导航栏的平滑移动 */
.navigation {
  position: fixed;
  transform: translateY(250px);
  /* 使用 translateY 替代 top */
  transition: transform 1s ease;
  /* 平滑过渡 */
  z-index: 1000;
}

.move-up {
  position: fixed;
  transform: translateY(0);
  /* 使用 translateY 替代 top */
  z-index: 1000;
}

.content,
.up-content {
  background-color: var(--home-routerview-back);
}

/* Default styles */
.content {
  transform: translateY(290px);
  /* 使用 translateY 替代 margin-top */
  transition: transform 1s ease;
  /* 平滑过渡 */
}

.up-content {
  transform: translateY(40px);
  /* 使用 translateY 替代 margin-top */
  transition: transform 1s ease;
  /* 平滑过渡 */
}

.footer {
  padding: 5px;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: var(--footer-back);
  color: var(--grey-text);
}

.footer p,
.footer a {
  color: var(--grey-text);
}

.footer a:hover {
  color: var(--text);
}

.author {
  background-image: url("https://cdn-icons-png.flaticon.com/128/1995/1995562.png");
  background-repeat: no-repeat;
  background-position: left center;
  /* 图标位置 */
}

.date {
  background-image: url("https://cdn-icons-png.flaticon.com/128/2370/2370279.png");
  background-repeat: no-repeat;
  background-position: left center;
  /* 图标位置 */
}

.address {
  background-image: url("https://cdn-icons-png.flaticon.com/128/17553/17553135.png");
  background-repeat: no-repeat;
  background-position: left center;
  /* 图标位置 */
}

.email {
  background-image: url("https://cdn-icons-png.flaticon.com/128/7286/7286142.png");
  background-repeat: no-repeat;
  background-position: left center;
  /* 图标位置 */
}

/* Small screen devices (max-width: 767px) */
@media (max-width: 767px) {
  .content {
    transform: translateY(290px);
  }

  .up-content {
    transform: translateY(40px);
  }

  .footer a,
  .footer p {
    font-size: 10px;
    height: 10px;
    line-height: 10px;
    margin: 2px 0;
  }

  .author,
  .date,
  .email,
  .address {
    background-size: 12px 12px;
    padding-left: 16px;

  }
}

/* Medium screen devices (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .content {
    transform: translateY(290px);
  }

  .up-content {
    transform: translateY(40px);
  }

  .footer a,
  .footer p {
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    margin: 4px 0;
  }

  .author,
  .date,
  .email,
  .address {
    background-size: 14px 14px;
    padding-left: 18px;

  }

}

/* Large screen devices (min-width: 1024px) */
@media (min-width: 1024px) {
  .content {
    transform: translateY(300px);
    /* 对大屏幕稍微增加位置 */
  }

  .up-content {
    transform: translateY(50px);
    /* 对大屏幕稍微增加位置 */
  }

  .footer a,
  .footer p {
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    margin: 5px 0;
  }

  .author,
  .date,
  .email,
  .address {
    background-size: 16px 16px;
    padding-left: 20px;

  }

}
</style> -->

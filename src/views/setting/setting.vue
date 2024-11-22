<template>
  <div class="main">
    <!-- 根据登录状态设置内容 -->
    <div :class="{ 'center': true, 'blurred': isshowlogin }">
      <header1 content="s e t t i n g" url="https://cdn-icons-png.flaticon.com/128/738/738853.png"/>
      <div class="user">
        <userImage class="userImage"/>
        <userName class="userName"/>
      </div>
      <div class="theme">
        <p class="text">主题：</p>
        <theme/>
      </div>
      <div class="favorate">
      <header1 content="f a v o r i t e" url="https://cdn-icons-png.flaticon.com/128/263/263417.png"/>
      <favorite/>
    </div>
    </div>


    <!-- 登录面板控制 -->
    <div v-if="isshowlogin" class="login">
      <login @login-success="handleLoginSuccess"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import header1 from '@/components/header1.vue';
import userImage from '@/views/setting/userImage.vue';
import userName from '@/views/setting/userName.vue';
import theme from '@/views/setting/theme.vue';
import login from '@/components/login.vue';
import favorite from './favorite.vue';
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/setting/useUser';
import { useRoute, useRouter } from 'vue-router';

// 路由和用户状态
const route = useRoute();
const router = useRouter();
const isLoggedIn = ref(false); // 用户是否已登录
const isshowlogin = ref(route.query.isshowlogin === 'true');

watch(
  () => route.query.isshowlogin,
  (newQueryValue) => {
    isshowlogin.value = newQueryValue === 'true';
  }
);

// 同时监听 isshowlogin，更新路由的 query 参数
watch(isshowlogin, (newValue) => {
  router.replace({
    query: { ...route.query, isshowlogin: String(newValue) },
  });
});


// 登录成功的处理函数
const handleLoginSuccess = (status: boolean) => {
  isLoggedIn.value = status;
  isshowlogin.value = !status; // 登录成功时隐藏登录面板

  // 更新路由 query 状态，移除 isshowlogin 参数
  router.replace({
    ...route,
    query: { ...route.query, isshowlogin: undefined },
  });
};

// 检查登录状态（避免刷新后退出登录）
onMounted(() => {
  const user_id = localStorage.getItem('user_id');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  if (user_id && username && email) {
    isLoggedIn.value = true;
    isshowlogin.value = false; // 已登录状态下隐藏登录面板

    // 保存用户信息到 Pinia store
    const userStore = useUserStore();
    userStore.setUser({
      user_id,
      username,
      email,
    });
  }
});
</script>


<style>
/* .center{
    width: 100%;
    height: 100%;

} */
.center {
  display: block;
  transition: filter 0.3s ease; /* 加上平滑过渡效果 */
}

.center.blurred {
  filter: blur(5px); /* 当登录界面显示时，center区域变模糊 */
}

.user {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.userImage {
  margin-right: 10px;
}

.theme {
  display: flex;
  align-items: center;
  background-image: url('https://cdn-icons-png.flaticon.com/128/12180/12180724.png');
  background-repeat: no-repeat;
}

.light,
.dark {
  text-align: center;
}

.user,
.theme {
  margin: 10px 0;
}

@media (max-width: 767px) {
  .theme p {
    font-size: 16px;
    width: 50px;
    height: 20px;
    line-height: 20px;

  }

  .theme {
    height: 35px;
    background-size: 35px 35px;
    padding-left: 45px;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .theme p {
    font-size: 22px;
    width: 80px;
    height: 30px;
    line-height: 30px;
  }

  .theme {
    height: 35px;
    background-size: 35px 35px;
    padding-left: 45px;
  }
}

@media (min-width: 1024px) {
  .theme p {
    font-size: 24px;
    width: 80px;
    height: 40px;
    line-height: 40px;
  }

  .theme {
    height: 40px;
    background-size: 40px 40px;
    padding-left: 50px;
  }
}</style>


<template>
  <div class="topNavigation">
    <div class="left">
      <RouterLink to="/" class="home"></RouterLink>
      <RouterLink to="/TV" class="TV" active-class="active">TV</RouterLink>
      <RouterLink to="/movie" class="movies" active-class="active">MOVIE</RouterLink>
      <RouterLink to="/people" class="people" active-class="active">ACTOR</RouterLink>
      <RouterLink to="/discover" class="discover" active-class="active">DISCOVER</RouterLink>
      
    </div>
    <div class="center">
    </div>

    <div class="right">
      <div class="avatar-container">
        <userImage />
        <div class="name">{{ userName }}</div>
      </div>
      <RouterLink :to="{ path: '/setting', query: { isshowlogin: String(isshowlogin) } }" class="setting"/>
      <div class="login" @click="toggleLogin">
        <div class="text">
          显示or不显示登录面板
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import userImage from '@/views/setting/userImage.vue';
import { useUserStore } from '@/stores/setting/useUser';
import { onMounted, ref, watch } from "vue";

const userStore = useUserStore();
const router = useRouter();
const userName = ref('');  // 用户名
const isshowlogin = ref(false); // 用于控制登录状态




// 是否显示状态
const toggleLogin = () => {
  isshowlogin.value = !isshowlogin.value;
  console.log(isshowlogin.value)
};

// 动态监听 isshowlogin 值并更新路由
watch(isshowlogin, (newValue) => {
  router.replace({
    path: '/setting',
    query: { isshowlogin: String(newValue) },
  });
});

watch(
  () => userStore.username,
  (newValue) => {
    userName.value = newValue;
    // console.log(`用户名已更新为: ${newValue}`);
  }
);

// 加载用户数据
onMounted(async () => {
  await userStore.loadUserData();
  userName.value = userStore.username;
});


</script>



<style scoped>
.topNavigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -4px 20px 0px var(--color-nav-shadow),
    /* 上方阴影 */
    0px 4px 10px 0px var(--color-nav-shadow);
  /* 下方阴影 */

  background-image: linear-gradient(to bottom, var(--color-nav-back1), var(--color-nav-back2));
}

.left {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.right {
  display: flex;
  justify-content: space-around;
  align-items: center;
}


.discover,
.TV,
.movies,
.people {
  border-radius: 30px;
  box-shadow: 0px 4px 4px var(--box-shadow);
  text-align: center;
  background-color: var(--button-back);
}
.discover:hover,
.TV:hover,
.movies:hover,
.people:hover {
  background-color: var(--button-hover);
  color: var(--reversed-text);
}
.setting:hover{
  cursor: pointer;
}

.login:hover{
  cursor: pointer;
  position: relative;
}
.login:hover .text {
  opacity: 1; /* 鼠标悬停时显示提示文字 */
  visibility: visible;
}
.login .text {
  position: absolute;
  top: 100%; /* 提示文字显示在图标上方 */
  left: -50%;
  transform: translateX(-50%);
  background-color:var(--home-routerview-back);
  color: var(--grey-text);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  box-shadow:3px 3px 3px  var(--box-shadow);
  transition: opacity 0.3s ease, visibility 0.3s ease; /* 平滑过渡效果 */
}

.home {
  background-image: url('https://cdn-icons-png.flaticon.com/128/553/553416.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.setting {
  background-image: url('https://cdn-icons-png.flaticon.com/128/13097/13097633.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}


.login {
  background-image: url('https://cdn-icons-png.flaticon.com/128/2170/2170153.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.active {
  background-color: var(--router-top-active);
  color: var(--reversed-top-text);
}

.avatar-container {
  display: flex;
}
.name{
  overflow-x: auto;
  text-wrap: nowrap;
}

@media (max-width: 767px) {

  .topNavigation {
    width: 100%;
    height: 40px;
  }

  .left {
    height: 40px;
    display: flex;
  }

  .right {
    height: 40px;
    display: flex;
  }

.discover,
  .TV,
  .movies,
  .people {
    width: 50px;
    height: 30px;
    margin: 0 5px;
    line-height: 30px;
    font-size: 12px;
  }
.login,
  .home,
  .setting {
    width: 20px;
    height: 20px;
    margin: 0 5px;
  }

  .avatar-container {
    /* width: 35px; */
    height: 35px;
    margin: 0 5px;
  }

  .name {
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin-left: 5px;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .topNavigation {
    width: 100%;
    height: 40px;
  }

  .left {
    height: 40px;
    display: flex;
    margin: 0 10px;
  }

  .right {
    height: 40px;
    display: flex;
    margin: 0 10px;
  }


  .discover,

  .TV,
  .movies,
  .people {
    width: 80px;
    height: 30px;
    margin: 0 10px;
    line-height: 30px;
  }
  .login,
  .home,
  .setting {
    width: 30px;
    height: 30px;
    margin: 0 10px;
  }

  .avatar-container {
    /* width: 35px; */
    height: 35px;
    margin: 0 10px;
  }

  .name {
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin-left: 10px;

  }
}

@media (min-width: 1024px) {
  .topNavigation {
    width: 100%;
    height: 50px;
  }

  .left {
    height: 50px;
    display: flex;
  }

  .right {
    height: 50px;
    display: flex;
  }


  .discover,

  .TV,
  .movies,
  .people {
    width: 90px;
    height: 40px;
    margin: 0 20px;
    line-height: 40px;
  }
  .login,
  .home,
  .setting {
    width: 40px;
    height: 40px;
    margin: 0 20px;
  }

  .avatar-container {
    /* width: 40px; */
    height: 40px;
    margin: 0 10px;
  }

  .name {
    height: 40px;
    margin-left: 10px;
    line-height: 40px;
    text-align: center;
  }
}
</style>

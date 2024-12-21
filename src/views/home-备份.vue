<template>
  <div class="top">
    <header1 content="welcome !!!" url="https://cdn-icons-png.flaticon.com/128/4245/4245497.png" />
  </div>
  <div class="content">
    <div class="project-intro">
      <h2 class="intro">intro</h2>
      <p>
        hello！欢迎来到 <strong>jueer</strong> 的光影集（全球影视榜单）项目。
        这里你可以动态获取来自全球的影视资源：
      </p>

      <ul>
        <li>
          <strong>动态更新：</strong>项目数据与全球权威影视平台实时同步，确保信息精准且及时。
        </li>
        <li>
          <strong>轻松浏览：</strong>快速查看全球影视作品的详细信息，包括评分、发布日期、主演阵容等。
        </li>
        <li>
          <strong>个性化收藏：</strong>将喜欢的影视作品加入收藏，方便随时查看，打造属于自己的私人影单。
        </li>
        <li>
          <strong>快速跳转：</strong>点击任意影视作品，即可进入专属详情页面，了解更多深入信息。
        </li>
      </ul>
      <p>
        无论是寻找高分佳作，还是探索最新热播，jueer 都致力于为您提供最优质的影视体验。
      </p>
      <p>快来和 <strong>jueer</strong> 一起开启这场光影旅程吧！✨</p>
    </div>

    <div class="topCarousel">
      <h2 class="topCarousel-h2">
        每日导播
      </h2>
      <div class="context">

        <video controls width="100%" height="auto">
          <source src="../assets/video/顶部轮播图.mp4" type="video/mp4">
          您的浏览器不支持视频播放，请升级到最新版本的浏览器。
        </video>
        <div class="text">
          <p class="topCarousel-text">
            🎉🎉啦啦啦啦！这是顶部的轮播图，展示的是通过接口获取的图像，这些图像会根据接口的数据每天进行更换🎉🎉🎉🎉<br><br>
            如果有需要，🧣还可以为这些图片附上跳转连接，跳转到需要的页面🧣 <br><br>
            除此之外，可以从视频发现，这些轮播图可以根据鼠标的位置而收放的哦 😍😍😍😍
          </p>
        </div>

      </div>

    </div>


    <div class="nav">
      <h2 class="nav-h2">顶部导航栏</h2>
      <div class="nav-image-container">
        <img src="../assets/images/nav01.png" alt="" class="nav-image" @mousemove="handleMouseMove" />
        <div v-if="showAnnotation" class="annotation">{{ annotationText }}</div>
      </div>
    </div>


    <div class="details">
      <h2 class="details-h2">
        详情页面
      </h2>
      <div class="context">
        <div class="text">
          <p class="details-text">
            🎉 这是项目的电影电视剧详情页面，在该页面中有多个侧边导航栏，✨展示了不同的榜单信息🎉
            <br>
            <br>
            此外看到视频中的小按钮了吗👓，点击它可以实现侧边导航栏的收放哦！
            <br>
            <br>
            😋😋如果只是展示这样的卡片多没意思，❓点击你感兴趣的电影或电视剧，可以挑战到详情页面哦，该页面包含了该影片的详细信息呐
            🍥还可以点击该影片标题跳转到原始播放界面哦
            <br>
            <br>
            ❓我特别喜欢这个影片怎么办？当然要收藏起来呀！😁
            <br>
            <br>
            点击小红心就可以收藏该影片啦💓，你可以在设置主页中找到你收藏的影片哦💓💓

          </p>
        </div>
        <video controls width="100%" height="auto">
          <source src="../assets/video/详情页面.mp4" type="video/mp4">
          您的浏览器不支持视频播放，请升级到最新版本的浏览器。
        </video>


      </div>

    </div>


    <div class="actor">
      <h2 class="actor-h2">
        演员页面
      </h2>
      <div class="context">

        <video controls width="100%" height="auto">
          <source src="../assets/video/演员页面.mp4" type="video/mp4">
          您的浏览器不支持视频播放，请升级到最新版本的浏览器。
        </video>
        <div class="text">
          <p class="actor-text">
            👋👋这里是演员的轮播图界面哦，每天都会更新人气top 20的演员信息，🔆🔆🔆
            <br>
            <br>
            每次图片轮播时都会对应更新演员详细信息以及下方的代表作品😘😘😘
            <br>
            <br>
            今天这里有没有你喜欢的演员呢👑👑👑👑
          </p>
        </div>

      </div>

    </div>




    <div class="setting">
      <h2 class="setting-h2">
        设置页面
      </h2>
      <div class="context">
        <div class="text">
          <p class="setting-text">
            这是个人设置页面哦，在这里你可以修改用户名😋😋😋😋
            <br>
            <br>
            重新上传用户头像👌，修改✅主题色等
            <br>
            <br>
            此外还可以看到你的收藏影片💜💜💜
            <br>
            <br>🐷在这里同样可以点击进入影片的详情页面，进行取消收藏以及收藏的操作哦🌝🌝🌝

          </p>
        </div>
        <video controls width="100%" height="auto">
          <source src="../assets/video/设置页面.mp4" type="video/mp4">
          您的浏览器不支持视频播放，请升级到最新版本的浏览器。
        </video>
      </div>
    </div>



    <div class="login">
      <h2 class="login-h2">
        登录注册
      </h2>
      <div class="context">

        <video controls width="100%" height="auto">
          <source src="../assets/video/login.mp4" type="video/mp4">
          您的浏览器不支持视频播放，请升级到最新版本的浏览器。
        </video>
        <div class="text">
          <p class="login-text">
            👀👀👀 同样，我们项目也可以进行登录注册的操作的哦
            <br>
            <br>
            我们可以登录，注册，🍭🍭🍭还可以找回密码重置密码🌄
            <br>
            <br>
            🍢🍢怎么样，页面是不是很美观很丝滑呀🍢🍢
          </p>
        </div>

      </div>

    </div>
    <div class="footer">
      <h2 class="footer-h2">
        footer
      </h2>
      <div class="context">
        <p>
          这里是项目作者 💥<strong>jueer</strong> 的相关信息，如有疑问可以联系作者进行解答哦
          <br>
          <br>
          悄咪咪滴，🌞🌞🌞发现footer的小动物会跟着鼠标运动了吗，嘻嘻嘻😀😀😀
          <br>
          <br>
          😝不过，如果你觉得看着碍眼，可以点击更换为静态图片哦，也很可爱滴💖
        </p>
      </div>
    </div>


    <!-- <div class="video">
      <h2 class="video-text">视频简介</h2>
      <video controls width="100%" height="auto">
        <source src="../assets/images/简介.mp4" type="video/mp4">
        您的浏览器不支持视频播放，请升级到最新版本的浏览器。
      </video>
    </div> -->
  </div>
</template>

<script setup name="tv" lang="ts">
import header1 from '@/components/header1.vue'
import { ref,onMounted, onBeforeUnmount  } from 'vue';
const showAnnotation = ref(false);
const annotationText = ref('');

const handleMouseMove = (event: { target: { getBoundingClientRect: () => any; }; clientX: number; }) => {
  const rect = event.target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const width = rect.width;

  // 计算横向九个部分
  let section = '';
  if (x < width * 0.04684) {
    section = '1';
  } else if (width * 0.04684 < x && x < width * 0.12788) {
    section = '2';
  } else if (width * 0.12788 < x && x < width * 0.2082) {
    section = '3';
  } else if (width * 0.2082 < x && x < width * 0.2825) {
    section = '4';
  } else if (width * 0.2825 < x && x < width * 0.3665) {
    section = '5';
  } else if (width * 0.8312 < x && x < width * 0.8728) {
    section = '6';
  } else if (width * 0.8728 < x && x < width * 0.91078) {
    section = '7';
  } else if (width * 0.91078 < x && x < width * 0.9532) {
    section = '8';
  } else if (width * 0.9532 < x && x < width) {
    section = '9';
  }

  // 设置注释文本
  switch (section) {
    case '1':
      annotationText.value = '✨这里是主页，主要对本项目细节介绍';
      break;
    case '2':
      annotationText.value = '✨电视剧的导航栏按钮呀';
      break;
    case '3':
      annotationText.value = '✨电影页面的导航栏按钮';
      break;
    case '4':
      annotationText.value = '✨演员的导航栏页面';
      break;
    case '5':
      annotationText.value = '✨发现页面，还没有完成呢，敬请期待呀';
      break;
    case '6':
      annotationText.value = '✨用户的头像哦，可以点击上传更改捏';
      break;
    case '7':
      annotationText.value = '✨用户民展示呀，可以在设置页面进行更高哦';
      break;
    case '8':
      annotationText.value = '✨设置页面导航栏按钮';
      break;
    case '9':
      annotationText.value = '✨这里是登录注册的按钮，点击可以显示登录注册面板，再次点击可以关闭';
      break;
    default:
      annotationText.value = '✨✨';
  }

  showAnnotation.value = true;
};

const handleMouseLeave = () => {
  showAnnotation.value = false;
  annotationText.value = '';
};

// 出现动画


</script>

<style scoped>
h2 {
  background-repeat: no-repeat;
  background-position: left center;
}


/* 设置出现动画 */

/* icon */
.intro {
  background-image: url('https://cdn-icons-png.flaticon.com/128/16319/16319698.png');
}

.video-text {
  background-image: url('https://cdn-icons-png.flaticon.com/128/12936/12936926.png');
}

.topCarousel-h2 {
  background-image: url('https://cdn-icons-png.flaticon.com/128/5634/5634260.png');
}

.nav-h2 {
  background-image: url('https://cdn-icons-png.flaticon.com/128/12127/12127294.png');
}

.details-h2 {
  background-image: url('https://cdn-icons-png.flaticon.com/128/6592/6592963.png');
}

.actor-h2 {
  background-image: url('https://cdn-icons-png.flaticon.com/128/4514/4514934.png');
}

.setting-h2 {
  background-image: url('https://cdn-icons-png.flaticon.com/128/3953/3953226.png');
}

.login-h2 {
  background-image: url('https://cdn-icons-png.flaticon.com/128/17446/17446833.png');
}

.footer-h2 {
  background-image: url('https://cdn-icons-png.flaticon.com/128/3596/3596193.png');
}

.footer,
.login,
.setting,
.actor,
.details,
.project-intro,
.topCarousel,
.video,
.nav {
  padding: 20px;
  /* box-shadow: 5px 5px 5px 5px var(--box-shadow); */
  border-radius: 20px;
}


/* 顶部导航栏的描述 */
.nav-image {
  width: 100%;
}

.nav-image-container {
  position: relative;
}

.project-intro ul li {
  padding-left: 20px;
  background-image: url('https://cdn-icons-png.flaticon.com/128/9742/9742435.png');
  background-size: 12px;
  background-repeat: no-repeat;
  background-position: left center;
  margin: 5px 0;
}

p {
  margin: 5px 0;
}

.annotation {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--footer-back);
  color: var(--grey-text);
  border-radius: 15px;
  pointer-events: none;
  /* To prevent the annotation from interfering with mouse events on the image */
}

.annotation::before {
  content: '';
  position: absolute;
  /* 正三角形距离注释框底部的距离 */
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-bottom: 10px solid var(--footer-back);
  /* 正三角形的颜色 */
}

@media (max-width: 767px) {
  h2 {
    height: 30px;
    line-height: 30px;
    font-size: 24px;
    padding-left: 30px;
    background-size: 24px;
    margin-bottom: 10px;
  }

  .footer,
  .login,
  .setting,
  .actor,
  .details,
  .video,
  .topCarousel,
  .nav {
    margin: 50px 0px;
  }

  .annotation {
    top: 20px;
    padding: 2px;
    font-size: 9px;
  }

  .annotation::before {
    top: -5px;
    border-left: 5px solid transparent;
    /* 左半部分的三角形 */
    border-right: 5px solid transparent;
    /* 右半部分的三角形 */
  }


  /* 顶部轮播图介绍 */
  .setting .context,
  .login .context,
  .actor .context,
  .topCarousel .context,
  .details .context {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
  }

  .login .context video,
  .setting .context video,
  .actor .context video,
  .topCarousel .context video,
  .details .context video {
    width: 100%;
    margin-right: 30px;
    box-shadow: 2px 2px 2px 2px var(--box-shadow);
    border-radius: 20px;
  }

  .login .context .video,
  .setting .context .text,
  .actor .context .text,
  .topCarousel .context .text,
  .details .context .text {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  h2 {
    height: 40px;
    line-height: 40px;
    font-size: 28px;
    padding-left: 32px;
    background-size: 28px;
    margin-bottom: 10px;
  }

  .footer,
  .login,
  .setting,
  .actor,
  .details,
  .video,
  .topCarousel,
  .nav {
    margin: 100px 0px;
  }

  .annotation {
    top: 30px;
    padding: 5px;
    font-size: 12px;
  }

  .annotation::before {
    top: -10px;
    border-left: 6px solid transparent;
    /* 左半部分的三角形 */
    border-right: 6px solid transparent;
    /* 右半部分的三角形 */
  }

  /* 顶部轮播图 */
  .login .context,
  .setting .context,
  .actor .context,
  .topCarousel .context,
  .details .context {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .login .context video,
  .actor .context video,
  .topCarousel .context video {
    margin-right: 30px;
  }

  .setting .context video,
  .details .context video {
    margin-left: 30px;
  }

  .login .context video,
  .setting .context video,
  .actor .context video,
  .topCarousel .context video,
  .details .context video {
    width: 60%;
    box-shadow: 2px 2px 2px 2px var(--box-shadow);
    border-radius: 20px;
  }

  .login .context .text .setting .context .text,
  .actor .context .text,
  .topCarousel .context .text,
  .details .context .text {
    display: flex;
    align-items: center;
  }
}

@media (min-width: 1024px) {
  h2 {
    height: 60px;
    line-height: 60px;
    font-size: 32px;
    padding-left: 40px;
    background-size: 32px;
    margin-bottom: 10px;
  }

  .footer,
  .login,
  .setting,
  .actor,
  .details,
  .video,
  .topCarousel,
  .nav {
    margin: 150px 0px;
  }

  .annotation {
    top: 60px;
    padding: 10px;
    font-size: 14px;
  }

  .annotation::before {
    top: -10px;
    border-left: 10px solid transparent;
    /* 左半部分的三角形 */
    border-right: 10px solid transparent;
    /* 右半部分的三角形 */
  }

  .login .context video,
  .actor .context video,
  .topCarousel .context video {
    margin-right: 50px;
  }

  .setting .context video,
  .details .context video {
    margin-left: 50px;
  }


  /* 顶部轮播图 */
  .login .context,
  .setting .context,
  .actor .context,
  .topCarousel .context,
  .details .context {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .login .context video,
  .setting .context video,
  .actor .context video,
  .topCarousel .context video,
  .details .context video {
    width: 70%;
    box-shadow: 2px 2px 2px 2px var(--box-shadow);
    border-radius: 20px;
  }

  .login .context .text,
  .setting .context .text,
  .actor .context .text,
  .topCarousel .context .text,
  .details .context .text {
    display: flex;
    align-items: center;
  }
}</style>

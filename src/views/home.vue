<template>
  <div class="top">
    <header1 content="welcome !!!" url="https://cdn-icons-png.flaticon.com/128/4245/4245497.png"/>
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
    <div class="video">
      <h2 class="video-text">视频简介</h2>
      <video controls width="100%" height="auto">
        <source src="../assets/images/简介.mp4" type="video/mp4">
        您的浏览器不支持视频播放，请升级到最新版本的浏览器。
      </video>
    </div>


  </div>


</template>
<script setup name="tv" lang="ts">
import header1 from '@/components/header1.vue'

</script>

<style scoped>


h2{
  background-repeat: no-repeat;
  background-position: left center;
}
.intro{
  background-image: url('https://cdn-icons-png.flaticon.com/128/16319/16319698.png');
}
.video-text{
  background-image: url('https://cdn-icons-png.flaticon.com/128/12936/12936926.png');
}
.project-intro{
  width: auto;
  height: auto;
  padding: 20px;
  box-shadow:5px 5px 5px 5px var(--box-shadow);
  border-radius: 20px;

}
.project-intro ul li{
padding-left: 20px;
background-image: url('https://cdn-icons-png.flaticon.com/128/9742/9742435.png');
background-size: 12px;
background-repeat: no-repeat;
background-position: left center;
margin: 5px 0;
}

p{
  margin: 5px 0;
}
.video{
  margin: 50px 0px;
  box-shadow:5px 5px 5px 5px var(--box-shadow);
  padding: 20px;
  border-radius: 20px;
}


@media (max-width: 767px) {
  h2{
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  padding-left: 30px;
  background-size: 24px;

}

}

@media (min-width: 768px) and (max-width: 1024px) {
  h2{
  height: 40px;
  line-height: 40px;
  font-size: 28px;
  padding-left: 32px;
  background-size: 28px;

}
}

@media (min-width: 1024px) {
  h2{
  height: 60px;
  line-height: 60px;
  font-size: 32px;
  padding-left: 40px;
  background-size: 32px;
}
}

</style>

<template>
  <div class="footer">
    <div class="left">
      <p class="author">作者：jueer</p>
      <p class="date">生日：2004.3</p>
      <p class="email"><a :href="mailtoLink">邮箱：{{ email }}</a></p>
      <p class="address">地址：四川省成都市成华区</p>
    </div>
    <div class="right">
      
      <animal/>
      <!-- <footerimage/> -->

    </div>
  </div>
</template>

<script setup lang="ts" name="footer">
const email = '3354500479@qq.com'
const mailtoLink = `mailto:${email}`
import animal from './animal.vue';
// import footerimage from './footerimage.vue';
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5px;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: var(--footer-back);
  color: var(--grey-text);
  box-shadow: 0 -2px 5px var(--box-shadow);
  /* 上阴影 */
}
.right {
  flex: 1; /* 占据剩余宽度 */
  position: relative;
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

@media (max-width: 767px) {

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
  .footer{
    height: 60px;
  }

}

/* Medium screen devices (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {


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
  .footer{
    height: 80px;
  }

}


/* Large screen devices (min-width: 1024px) */
@media (min-width: 1024px) {


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
  .footer{
    height: 90px;
  }

}
</style>
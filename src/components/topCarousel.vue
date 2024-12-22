<!-- 轮播图 -->

<template>
  <div class="container">
    <ul>
      <li v-for="(image,id) in imageCarousel" :key="id">
        <Transition :name="dir">
          <img :src=image.src.original alt="" v-show="id===show_index">
        </Transition>
      </li>
    </ul>
    <button class="left" @click="lastImage">&lt;</button>
    <button class="right" @click="nextImage">&gt;</button>
    <div class="circle">
      <template v-for="(image,id) in imageCarousel" :key="id">
        <div>
          <span :class="{active:id===show_index}" @click="changeImg(id)"></span>
        </div>
      </template>
    </div>
    <div class="show">

    </div>
  </div>


</template>

<script setup lang="ts">

import { useCarousel } from '@/stores/others/carousel';

import { onMounted } from "vue";

import { computed, ref } from 'vue';
// import {useLatestMovie} from '@/stores/Movies/LatestMovie'
// import { useLatestTV } from '@/stores/TV/LatestTV';
// import { fileAPI } from '@/http/api';
// const LatestMovie = useLatestMovie()
// const LatestTV = useLatestTV()
// const latestMoviePostImg = ref(LatestMovie.result.poster_path
//   ? `${fileAPI.postImage}${LatestMovie.result.poster_path}`
//   : fileAPI.defaultPostImg)

// const latestTVPostImg = ref(LatestTV.result.poster_path 
//   ? `${fileAPI.postImage}${LatestTV.result.poster_path}`
//   : fileAPI.defaultPostImg)

const carousel = useCarousel()
// console.log(carousel)

const imageCarousel =  carousel.result.photos
// console.log(imageCarousel)

let show_index = ref(0)
let timer = timer_start()
let timer_delay:any= null
let dir = ref('left')
function timer_start(){
  return setInterval(()=>(
  show_index.value=show_index.value===4?0:show_index.value+1
),10000)
}

function lastImage(){
  dir.value = 'left'
  clearInterval(timer)
  clearTimeout(timer_delay)
  if (show_index.value ===0){
    show_index.value=4
  }else{
    show_index.value--
  }
  timer_delay = setTimeout(()=>{
    dir.value='left'
    timer = timer_start()
  },5000)
}
function nextImage(){
  dir.value='right'
  clearInterval(timer)
  clearTimeout(timer_delay)
  if (show_index.value ===4){
    show_index.value=0
  }else{
    show_index.value++
  }
  timer_delay = setTimeout(()=>{
    dir.value='left'
    timer = timer_start()
  },5000)
}



function changeImg(id:number){
  clearInterval(timer)
  clearTimeout(timer_delay)
  dir.value=id>show_index.value?'left':'right'
  show_index.value= id
  timer_delay = setTimeout(()=>{
    dir.value='left'
    timer = timer_start()
  },5000)
}

</script>

<style scoped>
.container{
  width: 100%;
  height: 250px;
  position: relative;
}
ul{
  width: 100%;
  height: 250px;
  position: relative;
}
img{
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: center;
  position: absolute;
}
ul::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top,var(--gradation-botton),var(--gradation-top));
}
.left,.right{
  position:absolute;
  top:50%;
  transform: translateY(-50%);
  border-radius: 50%;
  border: 0;
  opacity: 0.5;
  background-color: var(--home-routerview-back);
}
.left{
  left:5px;
}
.right{
  right: 5px;
}
.left:hover,.right:hover{
  opacity: 1;
  cursor: pointer; /* Changes cursor to a hand */
}
.circle{
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  transform:translateX(-50%);
  left: 50% ;
}
.circle span{
  display: block;

  border-radius: 50%;
  background-color: var(--home-routerview-back);
  transition: width 0.5s linear;
}
.circle span:hover {
  cursor: pointer; /* Changes cursor to a hand */
}
.circle  div{

  display: flex;
  justify-content: center;
}
.circle span.active{
  width: 40px;
  border-radius:10px ;
}
.left-enter-active,.left-leave-active{
  transition: transform 1s ease;
}
/* .v-enter-from,.v-leave-to{
  opacity: 0;
} */
.left-enter-from{
  transform: translateX(100%);
}
.left-leave-to{
  transform: translateX(-100%);
}

.right-enter-active,.right-leave-active{
  transition: transform 1s ease;
}

.right-enter-from{
  transform: translateX(-100%);
}
.right-leave-to{
  transform: translateX(+100%);
}

@media (max-width: 767px) {
.left,.right{
  width: 20px;
  height: 20px;
  font-size: 10px;
}
.circle span{
  width: 10px;
  height: 10px;
}
.circle div{
  width: 20px;
  height: 10px;
}
}

@media (min-width: 768px) and (max-width: 1024px) {
  .left,.right{
  width: 30px;
  height: 30px;
  font-size: 14px;
}
.circle span{
  width: 15px;
  height: 15px;
}
.circle div{
  width: 30px;
  height: 15px;
}
}

@media (min-width: 1024px) {
  .left,.right{
  width: 35px;
  height: 35px;
  font-size: 16px;

}
.circle span{
  width: 20px;
  height: 20px;
}
.circle div{
  width: 40px;
  height: 20px;
}
}


</style>
  
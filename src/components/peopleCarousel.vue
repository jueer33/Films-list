<template>
    <div class="container">
        <ul>
            <li v-for="(people, id) in peoplePopularList" :key="id">
                <Transition :name="dir">
                    <img :src="`${fileAPI.postImage}${people.profile_path}`" alt="" v-show="id === show_index">
                </Transition>
            </li>

        </ul>
        <button class="left" @click="lastImage() ;emitData()">&lt;</button>
        <button class="right" @click="nextImage();emitData()">&gt;</button>
        <div class="circle">
            <template v-for="(people, id) in peoplePopularList" :key="id">
                <div>
                    <span :class="{ active: id === show_index }" @click="changeImg(id);emitData()"></span>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup name="peopleCarousel" lang="ts">

import { uespeoplePopularList } from '@/stores/people/peoplePopularList'
import { computed, ref } from 'vue';

import { fileAPI } from '@/http/api';

const limit = ref(10); // 默认显示数量

const peoplePopularListOrignal = uespeoplePopularList().result.results
const peoplePopularListMore = peoplePopularListOrignal.filter(item => item.id !== 1907997 && item.profile_path)
limit.value = peoplePopularListMore.length
const peoplePopularList = computed(() => peoplePopularListMore.slice(0, limit.value))

let show_index = ref(0)
let timer = timer_start()
let timer_delay: any = null
let dir = ref('left')
function timer_start() {
    return setInterval(() => {
        // 判断是否需要更新 show_index 的值
        if (show_index.value === limit.value - 1) {
            show_index.value = 0;
        } else {
            show_index.value += 1;
        }

        // 调用 emitDate 函数以响应 show_index 的变化
        emitData();
    }, 10000);
}


function lastImage() {
    dir.value = 'left'
    clearInterval(timer)
    clearTimeout(timer_delay)
    if (show_index.value === 0) {
        show_index.value = limit.value-1
    } else {
        show_index.value--
    }
    timer_delay = setTimeout(() => {
        dir.value = 'left'
        timer = timer_start()
    }, 5000)
}
function nextImage() {
    dir.value = 'right'
    clearInterval(timer)
    clearTimeout(timer_delay)
    if (show_index.value === limit.value-1) {
        show_index.value = 0
    } else {
        show_index.value++
    }
    timer_delay = setTimeout(() => {
        dir.value = 'left'
        timer = timer_start()
    }, 5000)
}



function changeImg(id: number) {
    clearInterval(timer)
    clearTimeout(timer_delay)
    dir.value = id > show_index.value ? 'left' : 'right'
    show_index.value = id
    timer_delay = setTimeout(() => {
        dir.value = 'left'
        timer = timer_start()
    }, 5000)
}
const emit = defineEmits(['updateData']);
function emitData() {
    // console.log("调用成功")
  emit('updateData', { peoplePopularList: peoplePopularList.value, show_index: show_index.value });
}

</script>

<style scoped>
.container {
    position: relative;
    overflow: hidden;
    border-radius: 5%;
    box-shadow: 5px 5px 5px var(--people-carousel-shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* 添加过渡效果 */
}

.container:hover {
    transform: translateY(-5px) scale(1.02); /* 悬浮效果 */
    box-shadow: 10px 10px 10px var(--people-carousel-shadow); /* 增强阴影效果 */
}

ul,li {
    width: 100%;
    position: relative;
}

img {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
    position: absolute;
}

.left,
.right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--home-routerview-back);
    border-radius: 50%;
    border: 0;
    opacity: 0.6;
}

.left {
    left: 5px;
}

.right {
    right: 5px;
}

.left:hover,
.right:hover {
    opacity: 1;
    cursor: pointer;
    /* Changes cursor to a hand */
}

.circle {
    display: flex;
    justify-content: center;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
}

.circle span {
    display: block;
    border-radius: 50%;
    background-color: var(--home-routerview-back);
    transition: width 0.5s linear;
}

.circle span:hover {
    cursor: pointer;
    /* Changes cursor to a hand */
}

.circle div {
    width: 40px;
    height: 20px;
    display: flex;
    justify-content: center;
}

.circle span.active {
    border-radius: 10px;
}

.left-enter-active,
.left-leave-active {
    transition: transform 1s ease;
}

/* .v-enter-from,.v-leave-to{
  opacity: 0;
} */
.left-enter-from {
    transform: translateX(100%);
}

.left-leave-to {
    transform: translateX(-100%);
}

.right-enter-active,
.right-leave-active {
    transition: transform 1s ease;
}

.right-enter-from {
    transform: translateX(-100%);
}

.right-leave-to {
    transform: translateX(+100%);
}


.name,
.popularity {
    text-align: center;
    margin: 10px;
    font-size: 30px;
}

.name {
    margin-top: 50px;
}




@media (max-width: 767px) {

    .container {
        width: 180px;
        height: 250px;
    }
    .left,.right{
        width: 20px;
        height: 20px;
        font-size: 10px;
    }

    ul {
        width: 180px;
        height: 250px;

    }

    img {
        width: 180px;
    }


    .circle {
        bottom: 10px;
    }

    .circle span {
        width: 10px;
        height: 10px;
    }

    .circle div {
        width: 20px;
        height: 20px;
    }

    .circle span.active {
        width: 20px;
        border-radius: 10px;
    }
}

@media (min-width: 768px) and (max-width: 1024px) {

    .container {
        width: 350px;
        height: 400px;
    }
    .left,.right{
        width: 30px;
        height: 30px;
        font-size: 14px;
    }
    ul {
        width: 350px;
        height: 400px;

    }

    img {
        width: 350px;
    }

    .people {
        width: 300px;
        height: 300px;
    }

    .circle {
        bottom: 10px;
    }

    .circle span {
        width: 10px;
        height: 10px;
    }

    .circle div {
        width: 20px;
        height: 20px;
    }

    .circle span.active {
        width: 20px;
        border-radius: 10px;
    }
}

@media (min-width: 1024px) {

    .container {
        width: 500px;
        height: 700px;
    }
    .left,.right{
        width: 35px;
        height: 35px;
        font-size: 16px;
    }
    ul {
        width: 500px;
        height: 700px;
    }

    img {
        width: 500px;
    }



    .circle {
        bottom: 10px;
    }

    .circle span {
        width: 10px;
        height: 10px;
    }

    .circle div {
        width: 20px;
        height: 20px;
    }

    .circle span.active {
        width: 20px;
        border-radius: 10px;
    }
}
</style>
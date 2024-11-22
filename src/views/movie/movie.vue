<template>
    <div class="movie">
        <div :class="['sider', { 'sider-hidden': !isSiderVisible }]">
            <movieSiderNav />
        </div>
        <div class="content">
            <RouterView></RouterView>
        </div>
        <div class="del">
            <button 
                @click="toggleSider" 
                @mousedown="startDrag"
                :style="{ left: `${buttonPosition.x}px`, top: `${buttonPosition.y}px` }"
            ></button>
        </div>
    </div>
</template>

<script setup name="tv" lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import movieSiderNav from '../../components/movieSiderNav.vue';

const isSiderVisible = ref(true); // 控制侧边栏显示状态
const buttonPosition = ref({ x: 20, y: 320 }); // 初始按钮位置
let isDragging = false; // 是否正在拖动
let offsetX = 0;
let offsetY = 0;

function toggleSider() {
    isSiderVisible.value = !isSiderVisible.value;
}

// 开始拖动
function startDrag(event) {
    isDragging = true;
    offsetX = event.clientX - buttonPosition.value.x;
    offsetY = event.clientY - buttonPosition.value.y;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
}

// 拖动过程中
function onDrag(event) {
    if (isDragging) {
        buttonPosition.value.x = event.clientX - offsetX;
        buttonPosition.value.y = event.clientY - offsetY;
    }
}

// 停止拖动
function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
}

// 清理事件
onBeforeUnmount(() => {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
});
</script>

<style scoped>
button {
    border-radius: 50%;
    box-shadow: 5px 5px 5px var(--box-shadow);
    background-image: url('https://cdn-icons-png.flaticon.com/128/15440/15440528.png');
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
    z-index: 1000;
    cursor: pointer;
    width: 40px;
    height: 40px;
    transition: transform 0.3s ease; /* 设置平滑的浮动效果 */
    
}

button:hover {
    cursor: pointer; /* 鼠标悬停时变为手型 */
    transform: scale(1.1); /* 悬停时放大1.1倍，形成浮动效果 */
}

.sider {
    position: fixed;
    left: 0px;
    transition: opacity 0.5s ease, transform 0.5s ease;
    transform: translateX(0);
    opacity: 1;
    z-index: 1000;
}
.sider-hidden {
    transform: translateX(-30px);
    opacity: 0;
}
@media (max-width: 767px) {
    .sider {
        width: 90px;
        top: 160px;
    }
    button {
        width: 25px;
        height: 25px;
    }
}
@media (min-width: 768px) and (max-width: 1024px) {
    .sider {
        width: 100px;
        top: 180px;
    }
}
@media (min-width: 1024px) {
    .sider {
        width: 110px;
        top: 180px;
    }
}
</style>

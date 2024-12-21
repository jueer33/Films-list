<template>
    <div class="animal" ref="container" @click="toggleContent">
        <ul v-if="showAnimals">
            <li v-for="(animal, index) in animals.animals" :key="index" ref="pet" class="pet"
                :style="{ top: `${positions[index].y}px`, left: `${positions[index].x}px` }">
                <img :src="animal.url" alt="Pet" />
            </li>
        </ul>
        <div class="img" v-else>
            <img src="../assets/images/animal.webp"
                alt="">
        </div>
    </div>

</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useAnimal } from "@/stores/others/animal";

const showAnimals = ref(true); // 控制显示的状态，初始显示 `ul`

// 切换显示内容的函数
const toggleContent = () => {
    showAnimals.value = !showAnimals.value;
};


const animals = useAnimal(); // 引用Pinia的store
const container = ref(null);

// 每个小动物的位置信息
const positions = reactive(
    animals.animals.map(() => ({
        x: Math.random() * 300, // 初始随机x位置
        y: Math.random() * 300  // 初始随机y位置
    }))
);
const targetPositions = reactive(
    animals.animals.map(() => ({ x: 0, y: 0 }))
);

let lastMouseX = 0;
let lastMouseY = 0;
let lastTime = Date.now();
let mouseSpeed = 0;

// 更新每个小动物位置的缓动公式、排斥效果和边缘检测
const updatePositions = () => {
    const edgeThreshold = 30; // 边缘检测的阈值
    const repulsionStrength = 20; // 排斥力的强度
    const baseSpeed = 0.008; // 控制小动物整体移动速度的基准值

    const rect = container.value.getBoundingClientRect(); // 获取容器边界矩形

    positions.forEach((position, i) => {
        // 根据鼠标速度动态调整缓动速度
        const speedFactor = baseSpeed * (1 + mouseSpeed * 0.5);

        // 缓动公式，逐渐接近鼠标目标位置
        position.x += (targetPositions[i].x - position.x) * speedFactor;
        position.y += (targetPositions[i].y - position.y) * speedFactor;

        // 小动物之间的排斥力
        positions.forEach((otherPosition, j) => {
            if (i !== j) {
                const dx = position.x - otherPosition.x;
                const dy = position.y - otherPosition.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const minDistance = 100; // 小动物之间的最小距离
                if (distance < minDistance) {
                    const angle = Math.atan2(dy, dx);
                    position.x += Math.cos(angle) * repulsionStrength;
                    position.y += Math.sin(angle) * repulsionStrength;
                }
            }
        });

        // 边缘检测，防止小动物超出容器边界
        position.x = Math.max(edgeThreshold, Math.min(position.x, rect.width - edgeThreshold));
        position.y = Math.max(edgeThreshold, Math.min(position.y, rect.height - edgeThreshold));
    });
};

// 追踪鼠标并更新每个小动物的目标位置
const trackMouse = (event) => {
    const rect = container.value.getBoundingClientRect();

    // 计算鼠标速度
    const currentTime = Date.now();
    const dx = event.clientX - lastMouseX;
    const dy = event.clientY - lastMouseY;
    const dt = currentTime - lastTime;

    mouseSpeed = Math.sqrt(dx * dx + dy * dy) / dt;

    // 更新鼠标位置和时间
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    lastTime = currentTime;

    targetPositions.forEach((targetPosition) => {
        targetPosition.x = Math.min(
            Math.max(event.clientX - rect.left - 20, 0),
            rect.width - 40
        );
        targetPosition.y = Math.min(
            Math.max(event.clientY - rect.top - 20, 0),
            rect.height - 40
        );
    });
};

// 挂载时添加事件监听和定时器
onMounted(() => {
    document.addEventListener("mousemove", trackMouse);
    const interval = setInterval(updatePositions, 20);

    onUnmounted(() => {
        document.removeEventListener("mousemove", trackMouse);
        clearInterval(interval);
    });
});
</script>

<style scoped>
.animal {
    display: flex;
    justify-content: center;
    margin: 0 20px;
    position: relative;
    overflow: hidden;
    background-color: var(--animal-back);
    border-radius: 20px;
    box-shadow: inset 0px 0px 10px var(--box-shadow);
    /* 内部阴影 */
}

.pet {
    position: absolute;
    transition: top 0.2s, left 0.2s;
    border-radius: 50%;
}

.pet img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 3px 3px 3px var(--box-shadow);
    border-radius: 50%;
    object-position: center;
}

.img img {
    width: auto;
    height: 100%;
}

@media (max-width: 767px) {

    .animal,
    .img {
        height: 50px;
    }

    .pet {
        width: 15px;
        height: 15px;
    }
}

@media (min-width: 768px) and (max-width: 1024px) {

    .animal,
    .img {
        height: 70px;
    }

    .pet {
        width: 25px;
        height: 25px;
    }
}

@media (min-width: 1024px) {

    .animal,
    .img {
        height: 80px;
    }

    .pet {
        width: 30px;
        height: 30px;
    }
}
</style>

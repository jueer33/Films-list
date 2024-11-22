<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from "@/stores/setting/useUser";
import { fetchTVs, addTV, deleteTV } from '@/utils/backendtools/tvinfo';
import { ElMessage } from 'element-plus';

// 控制收藏状态
const isFavorited = ref(false);

// 按钮的位置（以右下角为参考点）
const position = ref({ bottom: 30, right: 30 });

// 传入的 prop
const props = defineProps({
  mediatype: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  name:{
    type:String,
    required: true

  },
  image:{
    type:String,
    required: true

  }

});
const email = useUserStore().email;

onMounted(async () => {

  position.value = {bottom: 100, right: 30};

  // 获取用户的收藏列表，并根据 id 判断是否已收藏
  async function getUserTVs() {
    try {
      const tvs = await fetchTVs({email: email});
      // console.log('User TVs:', tvs);

      // 检查 prop.id 是否存在于收藏的电影列表中
      isFavorited.value = tvs.some(tv => tv.tmdbid === props.id);
      // console.log('isFavorited initially:', isFavorited.value);
    } catch (error) {
      ElMessage.error('Error fetching user TVs:', error);
    }
  }

  getUserTVs();
});

// 切换收藏状态并进行添加/删除操作
const toggleFavorite = async () => {
  if (isFavorited.value) {
    // 如果已经是收藏状态，删除
    try {
      await deleteTV({ tmdbid: props.id, email: email });
      isFavorited.value = false; // 更新状态
      ElMessage.success('已取消收藏');
    } catch (error) {
      ElMessage.error('Error deleting TV:', error);
    }
  } else {
    // 如果是未收藏状态，添加
    try {
      await addTV({tmdbid: props.id, tvname:props.name ,image:props.image, email: email});
      isFavorited.value = true; // 更新状态
      ElMessage.success('收藏成功');
    } catch (error) {
      ElMessage.error('Error adding TV:', error);
    }
  }
};

// 处理拖动逻辑
let isDragging = false;
const handleMouseDown = (event: MouseEvent) => {
  isDragging = true;
  const initialX = event.clientX;
  const initialY = event.clientY;
  const initialBottom = position.value.bottom;
  const initialRight = position.value.right;

  const handleMouseMove = (moveEvent: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = moveEvent.clientX - initialX;
    const deltaY = moveEvent.clientY - initialY;
    position.value.bottom = initialBottom - deltaY;
    position.value.right = initialRight - deltaX;
  };

  const handleMouseUp = () => {
    isDragging = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
};
</script>


<template>
  <button
    @click="toggleFavorite"
    @mousedown="handleMouseDown"
    :class="{ 'favorited': isFavorited }"
    class="favorite-btn"
    :style="{ bottom: position.bottom + 'px', right: position.right + 'px' }"
  ></button>
</template>

<style scoped>
.favorite-btn {
  width: 40px;
  height: 40px;
  background: none;
  cursor: pointer;
  background-image: url("https://cdn-icons-png.flaticon.com/128/6199/6199602.png");
  position: fixed;
  background-size: 40px;
  z-index: 1000;
}

.favorite-btn.favorited {
  background-image: url("https://cdn-icons-png.flaticon.com/128/6229/6229655.png");
}
</style>

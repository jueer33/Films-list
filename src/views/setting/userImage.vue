<template>
  <div>
    <img class="userImage" :src=fileAPI.servers+userImage @click="triggerFileInput" alt="User Avatar" v-bind="$attrs" />
    <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/setting/useUser'; // 假设这里是你的 Pinia store
import axios from 'axios';
import {fileAPI} from "@/http/api"; // 使用 axios 处理 HTTP 请求

const userStore = useUserStore();
const userImage = ref(''); // Reactive variable for user image URL
const fileInput = ref<HTMLInputElement | null>(null); // File input reference

// Load the user data when the component is mounted
onMounted(async () => {
  await userStore.loadUserData();
  userImage.value = userStore.imageurl; // 将用户头像设置为当前的值
});

watch(userImage, (newValue, oldValue) => {
  console.log('User image changed from', oldValue, 'to', newValue);

  // 更新 Pinia Store 数据，确保全局同步
  userStore.setUser({
    imageurl: newValue,
  });
});


// Trigger file input dialog
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Handle file input change and upload the new avatar
const handleFileChange = async () => {
  const file = fileInput.value?.files?.[0]; // 获取选中的文件
  if (!file) return;

  const formData = new FormData();
  formData.append('avatar', file);
  formData.append('email', userStore.email); // 假设用户邮箱已存储在 Pinia 中

  try {
    // 上传文件到服务器
    const response = await axios.put(`${fileAPI.servers}/update-avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // 更新用户头像 URL
    userImage.value = response.data.avatarUrl; // 从响应中获取新头像的 URL
    userStore.setUser({
      imageurl:userImage.value
    })
  } catch (error) {
    console.error('Error uploading avatar:', error);
  }
};
</script>

<style scoped>
.avatar-container {
    border-radius: 50%;
    cursor: pointer;
    /* 鼠标指针变为手形，表示可点击 */
}

.userImage {
    border-radius: 50%;
    cursor: pointer;
    /* 鼠标指针变为手形，表示可点击 */
    box-shadow: 0px 4px 4px var(--box-shadow);

}



@media (max-width: 767px) {


    .userImage {
        width: 35px;
        height: 35px;
    }
}

@media (min-width: 768px) and (max-width: 1024px) {


  .userImage {
    width: 35px;
    height: 35px;
  }
}

@media (min-width: 1024px) {


  .userImage {
    width: 40px;
    height: 40px;
  }
}
</style>

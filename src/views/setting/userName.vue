<template>
  <div class="content">
    <label for="username-input">用户名：</label>
    <!-- Editable input field for the username -->
    <input id="username-input" type="text" v-model.lazy="userName" placeholder="Enter your username"/>
    <!-- Button to confirm the change -->
    <button @click="updateUserName"></button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/setting/useUser';
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import {fileAPI} from "@/http/api";
import { ElMessage } from 'element-plus';
const userStore = useUserStore()
// 在组件加载时，先加载用户数据
const userName = ref(''); // Create a reactive variable for username

onMounted(async () => {
  await userStore.loadUserData();  // 等待加载完毕
  userName.value = userStore.username;  // 获取最新的 email
});

// 监听 userName 的变化，动态更新存储和渲染
watch(userName, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    // 用户名变化时自动更新到存储
    userStore.setUser({ username: newValue });
  }
});


// Function to update the username
async function updateUserName() {
  if (!userName.value.trim()) {
    ElMessage.error('Username cannot be empty.');
    return;
  }

  // if (userName.value.length < 3) {
  //   alert('Username must be at least 3 characters long.');
  //   return;
  // }

  try {
    const email = userStore.email; // Fetch the email from the store
    if (!email) {
      throw new Error('User email is missing.');
    }

    // Call the API to update the username
    const response = await axios.put(`${fileAPI.servers}/update-username`, {
      email,
      newUsername: userName.value,
    });

    if (response.status === 200) {
      ElMessage.success('Username updated successfully.');
      userStore.setUser({ username: userName.value }); // Update the store with the new username
    }
  } catch (error: any) {
    console.error('Error updating username:', error);
    ElMessage.error(error.response?.data?.error || 'Failed to update username. Please try again.');
  }
}
</script>




<style scoped>
.content {
  display: flex;
  align-items: center;
}

button {
  background-image: url('https://cdn-icons-png.flaticon.com/128/16786/16786007.png');
}
#username-input {
  border-radius: 10px;
}
@media (max-width: 767px) {
  label {
    font-size: 16px;
    width: 64px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
  }

  button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 2px 2px 2px var(--box-shadow);
    cursor: pointer;
    background-size: 20px 20px;
    background-position: center;
    background-repeat: no-repeat;

  }

  button:hover {
    box-shadow: 3px 3px 3px var(--box-shadow);
  }

  /* Optional styling for the input and button */
  #username-input {
    box-shadow: inset 0 -4px 4px rgba(0, 0, 0, 0.2);
    /* Adjust values as needed */
    outline: none;
    padding: 4px;
    padding-left: 8px;
    font-size: 16px;
    width: 150px;
    height: 20px;
    margin-right: 8px;
    background-color: var(--input-back);

  }


}

@media (min-width: 768px) and (max-width: 1024px) {
  label {
    font-size: 22px;
    width: 100px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
  }

  button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 2px 2px 2px var(--box-shadow);
    cursor: pointer;
    background-size: 30px 30px;
    background-position: center;
    background-repeat: no-repeat;

  }

  button:hover {
    box-shadow: 3px 3px 3px var(--box-shadow);
  }

  /* Optional styling for the input and button */
  #username-input {
    box-shadow: inset 0 -4px 4px rgba(0, 0, 0, 0.2);
    /* Adjust values as needed */
    outline: none;
    padding: 5px;
    padding-left: 8px;
    font-size: 20px;
    width: 200px;
    height: 25px;
    margin-right: 8px;
    background-color: var(--input-back);

  }


}

@media (min-width: 1024px) {
  label {
    font-size: 24px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
  }

  button {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    box-shadow: 2px 2px 2px var(--box-shadow);
    cursor: pointer;
    background-size: 35px 35px;
    background-position: center;
    background-repeat: no-repeat;

  }

  button:hover {
    box-shadow: 3px 3px 3px var(--box-shadow);
  }

  /* Optional styling for the input and button */
  #username-input {
    box-shadow: inset 0 -4px 4px rgba(0, 0, 0, 0.2);
    /* Adjust values as needed */
    outline: none;
    padding: 5px;
    padding-left: 10px;
    font-size: 20px;
    width: 200px;
    height: 30px;
    margin-right: 8px;
    background-color: var(--input-back);

  }
}
</style>

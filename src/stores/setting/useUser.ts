import {fileAPI} from "@/http/api";

async function fetchUserData(email: string) {
  try {
    const response = await fetch(`${fileAPI.servers}/user?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching user data:', err);
    throw err; // 抛出错误以便调用方处理
  }
}

import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
  state: () => ({
    user_id: '' as string,
    username: '' as string,
    email: '' as string,
    imageurl: '' as string,
  }),

  actions: {
    async loadUserData() {
      try {
        // 从 localStorage 获取 email
        const email = localStorage.getItem('email');
        if (!email) {
          throw new Error('Email not found in localStorage');
        }

        // 调用 API 获取用户数据
        const userData = await fetchUserData(email);

        // 更新 store 数据
        this.setUser({
          user_id: userData.user_id,
          username: userData.username,
          email: userData.email,
          imageurl: userData.imageurl,
        });
      } catch (err) {
        console.error('Failed to load user data:', err);
      }
    },




    setUser(userData: Partial<{ user_id: string; username: string; email: string; imageurl: string }>) {
      if (userData.user_id !== undefined) this.user_id = userData.user_id;
      if (userData.username !== undefined) this.username = userData.username;
      if (userData.email !== undefined) this.email = userData.email;
      if (userData.imageurl !== undefined) this.imageurl = userData.imageurl;
    },

    clearUser() {
      this.user_id = '';
      this.username = '';
      this.email = '';
      this.imageurl = '';
    },
  },
});

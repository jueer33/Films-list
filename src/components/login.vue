<template>
  <div class="container" :class="{ 'right-panel-active': isSignUp || isForgotten }">
    <!-- 注册表单 -->
    <div class="form-container sign-up-container" v-if="isSignUp">
      <form @submit.prevent="handleSignUp">
        <header2 content="注册" />

        <div class="txtb" v-for="(placeholder, index) in signUpFields" :key="index">
          <input type="text" v-model.lazy="signUpData[placeholder as keyof typeof signUpData]" :placeholder="placeholder" />
          <span :data-placeholder="placeholder"></span>
        </div>

        <div id="signup-error" class="error-message"></div>
        <button>注册</button>
      </form>
    </div>

    <!-- 登录表单 -->
    <div class="form-container sign-in-container" v-if="!isSignUp && !isForgotten">
      <form @submit.prevent="handleSignIn">
        <header2 content="登录" />
        <div class="txtb" v-for="(placeholder, index) in signInFields" :key="index">
          <input :type="index === 0 ? 'email' : 'password'" v-model.lazy="signInData[placeholder as keyof typeof signInData]"
            :placeholder="placeholder" />
          <span :data-placeholder="placeholder"></span>
        </div>
        <a href="#" @click.prevent="showForgotPassword">忘记密码？</a>
        <button>登录</button>
      </form>
    </div>

    <!-- 忘记密码表单 -->
    <div class="form-container forgot-password-container" v-if="isForgotten">
      <form @submit.prevent="handleForgotPassword">
        <header2 content="重置密码" />
        <div class="txtb" v-for="(placeholder, index) in forgotFields" :key="index">
          <input type="text" v-model.lazy="forgotData[placeholder as keyof typeof forgotData]" :placeholder="placeholder" />
          <span :data-placeholder="placeholder"></span>
        </div>

        <div id="forgot-password-error" class="error-message"></div>
        <button>确认</button>
        <a class="ghost back-button" @click="hideForgotPassword">返回登录</a>
      </form>
    </div>

    <!-- Overlay 部分 -->
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <header2 content="已有账号？" />
          <p>请使用您的账号进行登录</p>
          <button class="ghost" @click="isSignUp = false; isForgotten = false">登录</button>
        </div>
        <div class="overlay-panel overlay-right">
          <header2 content="没有账号？" />
          <p>立即注册加入我们，和我们一起开始旅程吧</p>
          <button class="ghost" @click="isSignUp = true">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import header2 from './header2.vue';
import { useUserStore } from '@/stores/setting/useUser';
import { fileAPI } from "@/http/api";
import { ElMessage } from 'element-plus';
// 用于判断是否显示注册面板
const isSignUp = ref(false);
const isForgotten = ref(false);

// 登录、注册、重置密码的数据
const signInData = ref({ email: '', password: '' });
const signUpData = ref({ username: '', email: '', password: '', ConfirmPassword: '' });
const forgotData = ref({ email: '', password: '', ConfirmPassword: '' });

// 表单字段
const signInFields = ['email', 'password'];
const signUpFields = ['username', 'email', 'password', 'ConfirmPassword'];
const forgotFields = ['email', 'password', 'ConfirmPassword'];

// 登录成功后通知父组件
const emit = defineEmits<{ (event: 'login-success', status: boolean): void }>();

// 登录逻辑
const handleSignIn = async () => {
  if (!signInData.value.email || !signInData.value.password) {
    ElMessage.error('请输入有效的邮箱和密码');
    return;
  }

  try {
    const response = await fetch(`${fileAPI.servers}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInData.value.email,
        password: signInData.value.password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // console.log('登录成功', data);
      // 保存用户信息到 localStorage
      // localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('username', data.username);
      localStorage.setItem('email', data.email);

      // 保存用户信息到 Pinia store
      const userStore = useUserStore();
      userStore.setUser({
        username: data.username,
        email: data.email,
      });
      ElMessage.success("登录成功")
      emit('login-success', true);
    } else {
      ElMessage.error(data.error);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    ElMessage.error('登录请求失败');
    ElMessage.error('发生错误，请稍后再试');
  }
};


// 注册逻辑
const handleSignUp = async () => {
  if (
    !signUpData.value.username ||
    !signUpData.value.email ||
    !signUpData.value.password ||
    !signUpData.value.ConfirmPassword
  ) {
    ElMessage.error('请输入完整的注册信息');
    return;
  }

  if (signUpData.value.password !== signUpData.value.ConfirmPassword) {
    ElMessage.error('两次密码不匹配');
    return;
  }

  try {
    const response = await fetch(`${fileAPI.servers}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: signUpData.value.username,
        email: signUpData.value.email,
        password: signUpData.value.password,
      }),
    });

    const data = await response.json();
    if (response.status === 201) {
      // ElMessage.success('注册成功');
      console.log('注册成功', data)
      isSignUp.value = false
    } else {
      ElMessage.error('注册失败', data.error);
      // console.error('注册失败', data.error)
    }
  } catch (error) {
    ElMessage.error('请求失败:', error);
    // console.error('请求失败:', error)
  }
};

// 忘记密码逻辑
const handleForgotPassword = async () => {
  if (!forgotData.value.email || !forgotData.value.password || !forgotData.value.ConfirmPassword) {
    ElMessage.error('请输入完整的重置信息');
    return;
  }

  if (forgotData.value.password !== forgotData.value.ConfirmPassword) {
    ElMessage.error('密码和确认密码不匹配');
    return;
  }

  try {
    const response = await fetch(`${fileAPI.servers}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: forgotData.value.email,
        newPassword: forgotData.value.password, // 注意字段名要与后端匹配
      }),
    });

    const data = await response.json();
    if (response.ok) { // fetch 使用 `response.ok` 来判断请求是否成功
      ElMessage.success('密码重置成功');
      hideForgotPassword();
    } else {
      ElMessage.error('密码重置失败', data.error);
    }
  } catch (error) {
    ElMessage.error('请求失败:', error);
  }
};


// 显示忘记密码面板
const showForgotPassword = () => {
  isForgotten.value = true;
  isSignUp.value = false;
};

// 隐藏忘记密码面板
const hideForgotPassword = () => {
  isForgotten.value = false;
  isSignUp.value = false;
};
</script>


<style scoped>
* {
  box-sizing: border-box;
}

input::placeholder {
  color: var(--grey-text);
}

.container {
  border-radius: 10px;
  box-shadow: 0 14px 28px var(--box-shadow), 0 10px 10px var(--box-shadow);
  position: fixed;
  overflow: hidden;

  position: fixed;
  /* 固定在屏幕上 */
  top: 50%;
  /* 垂直居中 */
  left: 50%;
  /* 水平居中 */
  transform: translate(-50%, -50%);
  /* 精确居中 */
  width: 100%;
}

.form-container form {
  background: var(--left-light-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  text-align: center;
}

.txtb {
  border-bottom: 2px solid var(--border-color);
  position: relative;
  margin: 10px 0;
}

.txtb input {
  width: 100%;
  outline: none;
  background: none;
}

button {
  border: 1px solid var(--border-color);
  /* background: ; */
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background: transparent;
  border-color: var(--border-color);
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.form-container button {
  background: linear-gradient(120deg, var(--login-left), var(--login-right));
  border: none;
  background-size: 200%;
  color: #fff;
  transition: 0.5s;
  margin: 5px 0;
}

.form-container button:hover {
  background-position: right;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

/* 第三方工具登录的样式 */
.other {
  margin-top: 20px;
}

.other span {
  color: var(--grey-text);
  font-style: italic;
}

.other .tool {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}

.other .tool div {
  background-color: #fff;
  border-radius: 50%;
  background-repeat: no-repeat;
}

.other .tool div:hover {
  transform: scale(1.1);
  /* 悬停时放大效果 */
  box-shadow: 0px 10px 20px var(--box-shadow);
  /* 添加阴影效果 */
}

.github {
  background-image: url('https://cdn-icons-png.flaticon.com/128/5968/5968866.png');
}

.google {
  background-image: url('https://cdn-icons-png.flaticon.com/128/281/281764.png');
}

.notion {
  background-image: url('https://th.bing.com/th/id/R.6373bd9d838c450d742caa9543973cbd?rik=RLZkRs9tUpLsBA&pid=ImgRaw&r=0');

}

/*注册表单 */

.sign-in-container form a {
  position: relative;
  left: 100px;
}

.forgot-password-container form a {
  position: relative;
  left: 100px;
  cursor: pointer;
}

.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay {
  background-image: linear-gradient(120deg, var(--login-left), var(--login-right));
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateY(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateY(0);
  transition: transform 0.6s ease-in-out;
}

.txtb span::after {
  content: '';
  position: absolute;
  left: 0%;
  top: 100%;
  width: 0%;
  background-image: linear-gradient(120deg, var(--login-left), var(--login-right));
  transition: 0.5s;
}

.forgot-password-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
  transition: all 0.6s ease-in-out;
  position: absolute;
}

.container.right-panel-active .forgot-password-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

.reset-password-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
  transition: all 0.6s ease-in-out;
  position: absolute;
}

.container.right-panel-active .reset-password-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

@media (max-width: 767px) {
  .container {
    max-width: 500px;
    min-width: 300px;
    min-height: 500px;
    max-height: 600px;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: var(--grey-text);
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  .form-container form {
    padding: 0 50px;
  }

  .txtb input {
    font-size: 15px;
    padding: 0 3px;
    height: 35px;
  }

  .txtb span::after {
    height: 2px;
  }

  button {
    border-radius: 20px;
    font-size: 12px;
    padding: 12px 45px;
  }

  .other .tool div {
    width: 30px;
    height: 30px;
    background-size: 30px;
  }



  .overlay-panel {
    padding: 0 40px;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .container {

    max-width: 600px;
    min-width: 400px;
    min-height: 500px;
    max-height: 700px;

  }

  p {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 14px;
  }

  a {
    color: var(--grey-text);
    font-size: 16px;
    text-decoration: none;
    margin: 15px 0;
  }

  .form-container form {
    padding: 0 70px;
  }

  .txtb input {
    font-size: 17px;
    padding: 0 3px;
    height: 40px;
  }

  .txtb span::after {
    height: 2px;
  }

  button {
    border-radius: 20px;
    font-size: 16px;
    padding: 12px 45px;
  }

  .other .tool div {
    width: 40px;
    height: 40px;
    background-size: 40px;
  }




  .overlay-panel {
    padding: 0 40px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 700px;
    min-width: 600px;
    min-height: 600px;
    max-height: 800px;
  }

  p {
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 16px;
  }

  a {
    color: var(--grey-text);
    font-size: 16px;
    text-decoration: none;
    margin: 15px 0;
  }

  .form-container form {
    padding: 0 60px;
  }

  .txtb input {
    font-size: 18px;
    padding: 0 3px;
    height: 40px;
  }

  .txtb span::after {
    height: 2px;
  }

  button {
    border-radius: 20px;
    font-size: 16px;
    padding: 12px 45px;
  }

  .other .tool div {
    width: 50px;
    height: 50px;
    background-size: 50px;
  }



  .overlay-panel {
    padding: 0 40px;
  }
}

.overlay-right {
  right: 0;
  transform: translateY(0);
}

.overlay-left {
  transform: translateY(-20%);
}

.container.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

.container.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

.container.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.container.container.right-panel-active .overlay-left {
  transform: translateY(0);
}

.container.container.right-panel-active .overlay-right {
  transform: translateY(20%);
}</style>

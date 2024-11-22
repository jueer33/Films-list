<template>
  <div class="theme-selector">
    <!-- 遍历主题数组，动态生成每个主题选项 -->
    <label
      v-for="theme in themes"
      :key="theme.name"
      class="theme-option"
      :class="{ 'theme-option--active': currentTheme === theme.name }"
      @click="toggleTheme(theme)">
      <div class="circle"></div>
      {{ theme.label }}
    </label>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

// 定义主题选项数组
const themes = [
  { name: 'light', label: 'light'},
  { name: 'dark', label: 'dark'},
  // 可以根据需求继续添加更多主题
];

// 当前选中的主题
const currentTheme = ref('light');

// 切换主题的函数
const toggleTheme = (theme: { name: string }) => {
  currentTheme.value = theme.name;  // 更新当前主题
  document.documentElement.setAttribute('data-theme', theme.name); // 更新根元素的 data-theme 属性
  // 如果有其他样式变量，如背景色、文字颜色，可以在此修改
};
</script>
<style scoped>
.theme-selector {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

.theme-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s ease;
}

/* 选中状态的圆圈样式 */
.theme-option--active .circle {
  background-color:  var(--select-color);
}

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color:var(--no-select-color);
  margin-right: 8px;
  transition: background-color 0.3s ease;
  box-shadow: 3px 3px 3px var(--box-shadow);
}




@media (max-width: 767px) {

    .theme-option {
      font-size: 16px;
        /* width: 50px; */
        height: 20px;
        line-height: 20px;
  }
  .circle {
    width: 16px;
    height: 16px;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
    .theme-option{
        font-size: 22px;
        /* width: 80px; */
        height: 30px;
        line-height: 30px;
    }
    .circle {
    width: 22px;
    height: 22px;
  }
}
@media (min-width: 1024px) {
    .theme-option{
        font-size: 24px;
        /* width: 80px; */
        height: 40px;
        line-height: 40px;
    }
    .circle{
        height: 24px;
        width: 24px;
    }
}
</style>

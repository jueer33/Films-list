// stores/userInput.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserInputStore = defineStore("userInput", () => {
  const query = ref("cartoon");

  // 更新用户输入
  const setQuery = (newQuery: string) => {
    query.value = newQuery;
  };

  return { query, setQuery };
});

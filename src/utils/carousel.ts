import { useUserInputStore } from "@/stores/others/userInput";
const query = useUserInputStore().query

async function apllyApi(): Promise<any> {
    try {
        const result = await fetch(`https://api.pexels.com/v1/search?query=${query}}&per_page=5&orientation=landscape`, {
            headers: {
              Authorization: "m27ciXHplMuSLjUcsRDRBaLmqT53UCrRgQ4z4dgta2yD77EDHZmD2JDy",
            },
          })
          const data = await result.json();  // 解析响应为 JSON 数据
          return data;  // 返回解析后的数据
        } catch (err) {
          console.error(err);  // 捕获并输出任何错误
          throw err;  // 抛出错误以便调用方处理
        }
    }
const  result = await apllyApi()




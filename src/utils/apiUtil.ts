async function apllyApi(url: string, options: RequestInit): Promise<any> {
    try {
      const res = await fetch(url, options);
      const data = await res.json();  // 解析响应为 JSON 数据
      return data;  // 返回解析后的数据
    } catch (err) {
      console.error(err);  // 捕获并输出任何错误
      throw err;  // 抛出错误以便调用方处理
    }
  }
  
export default apllyApi
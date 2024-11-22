import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co'; // 替换为你的 Supabase URL
const supabaseKey = 'your-supabase-anon-key'; // 替换为你的 Supabase 匿名密钥
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * 插入用户数据到 Supabase
 * @param {string} username - 用户名
 * @param {string} email - 邮箱
 * @param {object} movie - 可选，JSON 对象存储电影 ID
 * @param {object} tv - 可选，JSON 对象存储电视节目 ID
 * @returns {Promise<object>} - 返回插入结果或错误信息
 */
async function insertUser(username:string, email:string, movie = null, tv = null) {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          username,
          email,
          movie,
          tv,
        },
      ])
      .select();

    if (error) {
      console.error('Error inserting user:', error.message);
      return { success: false, error: error.message };
    }

    console.log('Inserted user:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

export default insertUser;

import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();

// 解析 JSON 和 URL 编码的请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 允许跨域
app.use(cors());
//
// // 数据库配置
// const dbConfig = {
//   host: 'localhost',
//   user: 'root',
//   password: 'W200433jue',  // 修改为你的数据库密码
//   database: 'vue3',  // 修改为你的数据库名称
//   port: 3306
// };
//
// // 连接到数据库
// const getDbConnection = async () => {
//   return await mysql.createConnection(dbConfig);
// };

async function getDbConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'W200433jue',
    database: 'vue3',
    port: 3306
  });
}
//跟新头像

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'uuid';
const { v4: uuidv4 } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, 'uploads'); // 上传文件保存路径
app.use('/uploads', express.static(uploadDir));
// 配置 multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });


// 注册用户
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 检查邮箱是否已存在
    const connection = await getDbConnection();
    const [existingUser] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 插入新用户
    const [result] = await connection.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    await connection.end();

    res.status(201).json({ id: result.insertId, username, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 登录用户
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const connection = await getDbConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    await connection.end();

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = rows[0];
    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.status(200).json({ id: user.id, username: user.username, email: user.email });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 重置密码
app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email and new password are required' });
  }

  try {
    const connection = await getDbConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 更新密码
    await connection.execute('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
    await connection.end();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 查询用户
app.get('/user', async (req, res) => {
  const { email } = req.query; // 从查询参数中获取用户的邮箱

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // // 验证邮箱格式
  // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
  //   return res.status(400).json({ error: 'Invalid email format' });
  // }

  try {
    // 数据库连接
    const connection = await getDbConnection();

    // 查询用户信息
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 格式化用户数据
    const user = rows[0];
    const userData = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      imageurl: user.imageurl || '', // 默认空字符串，避免未定义
    };

    // 返回用户信息
    return res.status(200).json(userData);
  } catch (err) {
    // 捕获错误
    if (err.message.includes('connect')) {
      console.error('Database connection error:', err);
      return res.status(500).json({ error: 'Database connection failed' });
    }

    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// 更改用户名
app.put('/update-username', async (req, res) => {
  const { email, newUsername } = req.body;

  // 校验请求参数
  if (!email || !newUsername) {
    return res.status(400).json({ error: 'Email and new username are required' });
  }

  if (newUsername.trim().length < 3) {
    return res.status(400).json({ error: 'New username must be at least 3 characters long' });
  }

  try {
    const connection = await getDbConnection();

    // 检查用户是否存在
    const [existingUser] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length === 0) {
      await connection.end();
      return res.status(404).json({ error: 'User not found' });
    }

    // 更新用户名
    await connection.execute('UPDATE users SET username = ? WHERE email = ?', [newUsername, email]);
    await connection.end();

    // 返回成功响应
    res.status(200).json({ message: 'Username updated successfully', newUsername });
  } catch (err) {
    console.error('Error updating username:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// 更新头像接口
app.put('/update-avatar', upload.single('avatar'), async (req, res) => {
  const { email } = req.body;

  // 校验请求参数
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Avatar file is required' });
  }

  try {
    const connection = await getDbConnection();

    // 检查用户是否存在
    const [existingUser] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 构造头像文件的 URL
    const avatarUrl = `/uploads/${req.file.filename}`;

    // 更新数据库中的头像信息
    await connection.execute('UPDATE users SET imageurl = ? WHERE email = ?', [avatarUrl, email]);
    await connection.end();

    res.status(200).json({
      message: 'Avatar updated successfully',
      avatarUrl,
    });
  } catch (err) {
    console.error('Error updating avatar:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/movies', async (req, res) => {
  const { user_id, email } = req.query;

  if (!user_id && !email) {
    return res.status(400).json({ error: 'user_id or email is required' });
  }

  try {
    const connection = await getDbConnection();
    let query = 'SELECT * FROM movie WHERE ';
    const params = [];

    if (user_id) {
      query += 'user_id = ?';
      params.push(user_id);
    } else {
      query += 'email = ?';
      params.push(email);
    }

    const [rows] = await connection.execute(query, params);

    res.status(200).json({ movies: rows });
    await connection.end();
  } catch (err) {
    console.error('Error fetching movies:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/movies', async (req, res) => {
  const { tmdbid, moviename, image, user_id, email } = req.body;
  // console.log( tmdbid, moviename, user_id, email)

  if (!tmdbid || !moviename || !image|| (!user_id && !email)) {
    return res.status(400).json({ error: 'tmdbid, moviename, and either user_id or email are required' });
  }

  try {
    const connection = await getDbConnection();

    // 获取缺失的字段信息
    let userInfo;
    if (user_id) {
      [userInfo] = await connection.execute('SELECT email FROM users WHERE user_id = ?', [user_id]);
    } else {
      [userInfo] = await connection.execute('SELECT user_id FROM users WHERE email = ?', [email]);
    }

    if (userInfo.length === 0) {
      await connection.end();
      return res.status(404).json({ error: 'User not found' });
    }

    const userEmail = email || userInfo[0].email;
    const userId = user_id || userInfo[0].user_id;

    await connection.execute(
      'INSERT INTO movie (tmdbid, moviename, image,user_id, email) VALUES (?, ?, ?,?, ?)',
      [tmdbid, moviename,image, userId, userEmail]
    );

    res.status(201).json({ message: 'Movie added successfully' });
    await connection.end();
  } catch (err) {
    console.error('Error adding movie:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/movies', async (req, res) => {
  const { tmdbid, user_id, email } = req.query;

  if (!tmdbid || (!user_id && !email)) {
    return res.status(400).json({ error: 'tmdbid and either user_id or email are required' });
  }

  try {
    const connection = await getDbConnection();
    let query = 'DELETE FROM movie WHERE tmdbid = ? AND ';
    const params = [tmdbid];

    if (user_id) {
      query += 'user_id = ?';
      params.push(user_id);
    } else {
      query += 'email = ?';
      params.push(email);
    }

    const [result] = await connection.execute(query, params);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      res.status(200).json({ message: 'Movie deleted successfully' });
    }

    await connection.end();
  } catch (err) {
    console.error('Error deleting movie:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// tv


app.get('/tvs', async (req, res) => {
  const { user_id, email } = req.query;

  if (!user_id && !email) {
    return res.status(400).json({ error: 'user_id or email is required' });
  }

  try {
    const connection = await getDbConnection();
    let query = 'SELECT * FROM tv WHERE ';
    const params = [];

    if (user_id) {
      query += 'user_id = ?';
      params.push(user_id);
    } else {
      query += 'email = ?';
      params.push(email);
    }

    const [rows] = await connection.execute(query, params);

    res.status(200).json({ tvs: rows });
    await connection.end();
  } catch (err) {
    console.error('Error fetching tvs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/tvs', async (req, res) => {
  const { tmdbid, tvname, image,user_id, email } = req.body;

  if (!tmdbid || !tvname || !image || (!user_id && !email)) {
    return res.status(400).json({ error: 'tmdbid, tvname, and either user_id or email are required' });
  }

  try {
    const connection = await getDbConnection();

    // 获取缺失的字段信息
    let userInfo;
    if (user_id) {
      [userInfo] = await connection.execute('SELECT email FROM users WHERE user_id = ?', [user_id]);
    } else {
      [userInfo] = await connection.execute('SELECT user_id FROM users WHERE email = ?', [email]);
    }

    if (userInfo.length === 0) {
      await connection.end();
      return res.status(404).json({ error: 'User not found' });
    }

    const userEmail = email || userInfo[0].email;
    const userId = user_id || userInfo[0].user_id;

    // 插入 TV 记录
    await connection.execute(
      'INSERT INTO tv (tmdbid, tvname, image,user_id, email) VALUES (?, ?,?, ?, ?)',
      [tmdbid, tvname, image,userId, userEmail]
    );

    res.status(201).json({ message: 'tv added successfully' });
    await connection.end();
  } catch (err) {
    console.error('Error adding tv:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/tvs', async (req, res) => {
  const { tmdbid, user_id, email } = req.query;

  if (!tmdbid || (!user_id && !email)) {
    return res.status(400).json({ error: 'tmdbid and either user_id or email are required' });
  }

  try {
    const connection = await getDbConnection();
    let query = 'DELETE FROM tv WHERE tmdbid = ? AND ';
    const params = [tmdbid];

    if (user_id) {
      query += 'user_id = ?';
      params.push(user_id);
    } else {
      query += 'email = ?';
      params.push(email);
    }

    const [result] = await connection.execute(query, params);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'tv not found' });
    } else {
      res.status(200).json({ message: 'tv deleted successfully' });
    }

    await connection.end();
  } catch (err) {
    console.error('Error deleting tv:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

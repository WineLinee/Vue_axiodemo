require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// 启用CORS
app.use(cors());
app.use(express.json());

// API路由：获取第三方API数据
app.get('/api/posts', async (req, res) => {
  try {

    const response = await axios.get('http://localhost:3000/brands');
    
    // 添加响应日志
    console.log(`API响应状态: ${response.status}`);
    
    res.json(response.data);
  } catch (error) {
    // 更详细的错误处理
    console.error('完整错误信息:');
    console.error(error);
    
    if (error.response) {
      // 请求已发出但服务器响应了错误状态码
      console.error(`响应状态: ${error.response.status}`);
      console.error(`响应数据: ${JSON.stringify(error.response.data)}`);
      console.error(`响应头: ${JSON.stringify(error.response.headers)}`);
      
      res.status(error.response.status).json({
        error: '第三方API返回错误',
        status: error.response.status,
        message: error.response.data.message || error.message
      });
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('无响应:', error.request);
      res.status(504).json({ 
        error: '无法连接到第三方API',
        details: '请求已发出但未收到响应'
      });
    } else {
      // 设置请求时出错
      console.error('请求配置错误:', error.message);
      res.status(500).json({ 
        error: '内部服务器错误',
        details: error.message 
      });
    }
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Node.js后端服务运行在 http://localhost:${PORT}`);
});
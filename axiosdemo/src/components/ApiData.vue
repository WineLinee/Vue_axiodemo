<template>
  <div class="container">
    <div class="header">
      <h1>Vue.js + Node.js API数据展示</h1>
      <p class="subtitle">通过Axios请求第三方API数据并展示</p>
      
      <div class="architecture">
        <div class="step">
          <i class="fas fa-desktop"></i>
          <span>Vue前端</span>
        </div>
        <div class="step">
          <i class="fas fa-arrow-right"></i>
        </div>
        <div class="step">
          <i class="fas fa-server"></i>
          <span>Node.js后端</span>
        </div>
        <div class="step">
          <i class="fas fa-arrow-right"></i>
        </div>
        <div class="step">
          <i class="fas fa-globe"></i>
          <span>第三方API</span>
        </div>
      </div>
    </div>
    
    <div class="controls">
      <button class="btn" @click="fetchData">
        <i class="fas fa-download"></i> 获取API数据
      </button>
      <button class="btn secondary" @click="clearData">
        <i class="fas fa-trash"></i> 清除数据
      </button>
      <button class="btn warning" @click="simulateError">
        <i class="fas fa-bug"></i> 模拟错误
      </button>
    </div>
    
    <div class="status-container">
      <div v-if="loading" class="status loading">
        <i class="fas fa-spinner fa-spin"></i> 正在从API加载数据...
      </div>
      <div v-if="error" class="status error">
        <i class="fas fa-exclamation-triangle"></i> {{ error }}
      </div>
      <div v-if="successMessage" class="status success">
        <i class="fas fa-check-circle"></i> {{ successMessage }}
      </div>
    </div>
    
    <div class="data-container">
      <div v-if="posts.length === 0" class="empty-state">
        <i class="fas fa-database"></i>
        <h3>暂无数据</h3>
        <p>点击上方按钮获取API数据</p>
      </div>
      
      <div v-for="post in posts" :key="post.id" class="card">
        <div class="card-header">
          <span>文章 #{{ post.id }}</span>
          <span class="card-id">用户ID: {{ post.status }}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">{{ post.name }}</h3>
          <p class="card-text">{{ post.date }}</p>
          <img :src="post.img" />
        </div>
        <div class="card-footer">
          <span><i class="fas fa-clock"></i> 示例数据</span>
          <span><i class="fas fa-tag"></i> API</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ApiData',
  data() {
    return {
      posts: [],
      loading: false,
      error: null,
      successMessage: null
    };
  },
  methods: {
    async fetchData() {
      try {
        // 重置状态
        this.loading = true;
        this.error = null;
        this.successMessage = null;
        this.posts = [];
        
        // 通过Axios请求后端API
        const response = await axios.get('http://localhost:5000/api/posts');
        console.log(response)
        // 更新数据
        this.posts = response.data.slice(0, 12);
        this.successMessage = `成功加载 ${this.posts.length} 条数据`;
      } catch (err) {
        this.error = `请求失败: ${err.response?.data?.error || err.message}`;
        console.error('API错误:', err);
      } finally {
        this.loading = false;
      }
    },
    
    clearData() {
      this.posts = [];
      this.error = null;
      this.successMessage = null;
      console.log("数据已清除")
    },
    
    simulateError() {
      this.error = "模拟错误：无法连接到API服务器";
      this.successMessage = null;
      setTimeout(() => {
        this.error = null;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

h1 {
  color: #2c3e50;
  font-size: 2.8rem;
  margin-bottom: 10px;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.architecture {
  display: flex;
  justify-content: center;
  margin: 30px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  font-weight: bold;
}

.step {
  display: flex;
  align-items: center;
  margin: 0 15px;
  color: #2c3e50;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.btn {
  padding: 14px 28px;
  border: none;
  border-radius: 50px;
  background: #3498db;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn:hover {
  background: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.btn:active {
  transform: translateY(1px);
}

.btn.secondary {
  background: #2ecc71;
}

.btn.secondary:hover {
  background: #27ae60;
}

.btn.warning {
  background: #e74c3c;
}

.btn.warning:hover {
  background: #c0392b;
}

.status-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  min-height: 50px;
}

.status {
  padding: 15px 30px;
  border-radius: 50px;
  font-weight: bold;
  text-align: center;
  max-width: 80%;
}

.loading {
  background: rgba(241, 196, 15, 0.9);
  color: #2c3e50;
}

.error {
  background: rgba(231, 76, 60, 0.9);
  color: white;
}

.success {
  background: rgba(46, 204, 113, 0.9);
  color: white;
}

.data-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
}

.card-header {
  background: #3498db;
  color: white;
  padding: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-id {
  background: rgba(0, 0, 0, 0.2);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #2c3e50;
  min-height: 70px;
}

.card-text {
  color: #7f8c8d;
  line-height: 1.6;
}

.card-footer {
  padding: 15px 20px;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.empty-state {
  text-align: center;
  padding: 50px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  grid-column: 1 / -1;
}

.empty-state i {
  font-size: 4rem;
  color: #bdc3c7;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #7f8c8d;
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .architecture {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
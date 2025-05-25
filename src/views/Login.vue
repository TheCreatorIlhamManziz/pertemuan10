<template>
    <div class="login-container">
      <div class="login-box">
        <h2>Login Mahasiswa</h2>
        <div class="form-group">
          <label for="npm">NPM</label>
          <input type="text" id="npm" v-model="npm" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div v-if="error" style="color: red; margin-bottom: 10px;">{{ error }}</div>
        <button @click="login">Login</button>
        <div class="link">
          Belum punya akun? <router-link to="/register">Register</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const npm = ref('')
  const password = ref('')
  const error = ref('')
  const router = useRouter()
  
  const login = () => {
    const users = JSON.parse(localStorage.getItem('users')) || []
  
    const foundUser = users.find(user => user.npm === npm.value && user.password === password.value)
  
    if (foundUser) {
      localStorage.setItem('loggedIn', 'true')
      localStorage.setItem('currentUser', JSON.stringify(foundUser))
      alert(`Selamat datang, ${foundUser.nama}!`)
      router.push('/dashboard')
    } else {
      error.value = 'Akun tidak terdaftar, silakan register terlebih dahulu.'
    }
  }
  </script>
  
  <style scoped>
  /* GUNAKAN CSS YANG SAMA seperti sebelumnya */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ecf0f3;
  }
  
  .login-box {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  h2 {
    margin-bottom: 24px;
    font-size: 24px;
    color: #2c3e50;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    color: #34495e;
  }
  
  input {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    font-size: 14px;
    transition: 0.3s;
  }
  
  input:focus {
    border-color: #2980b9;
  }
  
  button {
    width: 100%;
    padding: 12px;
    background-color: #2980b9;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  button:hover {
    background-color: #1c5980;
  }
  
  .link {
    margin-top: 16px;
    font-size: 14px;
  }
  
  .link a {
    color: #2980b9;
    text-decoration: none;
    font-weight: bold;
  }
  </style>
  
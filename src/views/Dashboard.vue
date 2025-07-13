<template>
  <div class="dashboard-container">
    <div :class="['sidebar', { active: isSidebarOpen }]">
      <div class="toggle-btn" @click="toggleSidebar">📚</div>
      <transition name="fade">
        <ul v-if="isSidebarOpen">
          <li><router-link to="/dashboard">Beranda</router-link></li>
          <li><router-link to="/dashboard/kategori">Kategori Buku</router-link></li>
          <li><router-link to="/dashboard/peminjaman">Peminjaman</router-link></li>
          <li><router-link to="/dashboard/pengembalian">Pengembalian</router-link></li>
          <li><router-link to="/dashboard/denda">Denda</router-link></li>
          <li><router-link to="/dashboard/pengaturan">Pengaturan Akun</router-link></li>
          <li><a href="#" @click.prevent="logout">Logout</a></li>
        </ul>
      </transition>
    </div>

    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'

const isSidebarOpen = ref(false)
const router = useRouter()

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const logout = async () => {
  try {
    await signOut(auth)
    localStorage.removeItem('user')
    localStorage.removeItem('username')
    router.replace('/login')
    location.reload() // ⬅️ memastikan UI reset total
  } catch (err) {
    alert('Gagal logout: ' + err.message)
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.sidebar {
  width: 60px;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 16px 0;
  transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  overflow: hidden;
  position: relative;
  box-shadow: 2px 0 10px rgba(0, 255, 255, 0.1);
}

.sidebar.active {
  width: 220px;
}

.sidebar .toggle-btn {
  font-size: 24px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 20px;
  color: #00e5ff;
}

.sidebar ul {
  list-style: none;
  padding: 0 10px;
}

.sidebar li {
  margin: 14px 0;
}

.sidebar a {
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  display: block;
  padding: 10px 14px;
  border-radius: 8px;
  transition: background 0.2s, transform 0.2s;
  background: transparent;
}

.sidebar a:hover {
  background-color: rgba(0, 229, 255, 0.1);
  transform: translateX(4px);
  color: #00e5ff;
}

.router-link-exact-active {
  background-color: rgba(0, 229, 255, 0.15);
  color: #00e5ff !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #3a2e25;
  color: #f0e6d2;
  overflow-y: auto;
  transition: margin-left 0.4s ease;
  font-family: 'Georgia', 'Times New Roman', serif;
}
</style>

<template>
  <div class="auth-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin" class="auth-form">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Masuk</button>
    </form>

    <p><button @click="forgotPassword" class="link">Lupa password?</button></p>
    <p>Belum punya akun? <RouterLink class="link" to="/register">Daftar di sini</RouterLink></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { useUserStore } from '@/stores/user'

const email = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()

const handleLogin = async () => {
  try {
    const res = await signInWithEmailAndPassword(auth, email.value, password.value)
    userStore.setUser({ email: res.user.email, uid: res.user.uid })
    alert('Login berhasil!')
    router.push('/dashboard')
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      alert('Akun tidak ditemukan. Silakan daftar.')
      router.push('/register')
    } else {
      alert('Email atau password salah!')
    }
  }
}

const forgotPassword = async () => {
  if (!email.value) return alert('Masukkan email dahulu!')
  try {
    await sendPasswordResetEmail(auth, email.value)
    alert(`Link reset dikirim ke ${email.value}`)
  } catch (err) {
    alert('Gagal kirim link reset.')
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 420px;
  margin: 100px auto;
  background-color: #3a2e25; /* Warna kayu klasik */
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  font-family: 'Georgia', serif;
  color: #f0e6d2;
  text-align: center;
}

.auth-container h2 {
  margin-bottom: 20px;
  font-size: 28px;
  color: #f5deb3; /* Krem tua */
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.auth-form input {
  background: #5b4636;
  border: 1px solid #a9825a;
  color: #f0e6d2;
  padding: 12px;
  border-radius: 5px;
  font-size: 1em;
  font-family: 'Georgia', serif;
}

.auth-form input::placeholder {
  color: #cdbba7;
}

.auth-form button {
  background-color: #a9825a;
  color: #fff;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s ease;
}

.auth-form button:hover {
  background-color: #b89266;
}

.link {
  color: #ffdd99;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.95em;
  font-style: italic;
}

.link:hover {
  color: #ffe6b3;
}

body {
  background-color: #2b1d15; /* Background halaman */
}
</style>

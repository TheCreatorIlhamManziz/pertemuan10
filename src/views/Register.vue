<template>
  <div class="auth-container">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister" class="auth-form">
      <input v-model="name" type="text" placeholder="Nama Lengkap" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Daftar</button>
    </form>
    <p>Sudah punya akun? <RouterLink class="link" to="/login">Login di sini</RouterLink></p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useUserStore } from '@/stores/user'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  userStore.loadUser()
  if (userStore.user) {
    router.push('/dashboard')
  }
})

const handleRegister = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    await updateProfile(user, { displayName: name.value }) // simpan nama ke profil firebase
    alert('Registrasi berhasil!')
    router.push('/login')
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Email sudah digunakan. Silakan login.')
    } else {
      alert('Gagal registrasi: ' + error.message)
    }
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

.auth-form input {
  background: #5b4636;
  border: 1px solid #a9825a;
  color: #f0e6d2;
  padding: 12px;
  border-radius: 5px;
  font-size: 1em;
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

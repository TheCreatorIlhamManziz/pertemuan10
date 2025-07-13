<template>
  <div class="pengaturan-container">
    <h2>Pengaturan Akun (bisa diubah langsung dan disave)</h2>

    <div class="form-group">
      <label>Nama</label>
      <input type="text" v-model="form.nama" disabled />
    </div>

    <div class="form-group">
      <label>Umur</label>
      <input type="number" v-model="form.umur" />
    </div>

    <div class="form-group">
      <label>Jenis Kelamin</label>
      <select v-model="form.kelamin">
        <option value="">Pilih</option>
        <option value="Laki-laki">Laki-laki</option>
        <option value="Perempuan">Perempuan</option>
      </select>
    </div>

    <div class="form-group">
      <label>Hobi</label>
      <input type="text" v-model="form.hobi" />
    </div>

    <div class="form-group">
      <label>Deskripsi Diri</label>
      <textarea v-model="form.deskripsi"></textarea>
    </div>

    <div class="form-group">
      <label>Email</label>
      <input type="email" v-model="form.email" />
    </div>

    <div class="form-group">
      <label>Password Baru</label>
      <input type="password" v-model="form.password" />
    </div>

    <button @click="simpanPengaturan">💾 Simpan</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '@/firebase';
import { updateEmail, updatePassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const db = getFirestore();
const user = auth.currentUser;

const form = ref({
  nama: '',
  umur: '',
  kelamin: '',
  hobi: '',
  deskripsi: '',
  email: '',
  password: ''
});

onMounted(async () => {
  if (user) {
    form.value.nama = user.displayName || '';
    form.value.email = user.email || '';

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      form.value.umur = data.umur || '';
      form.value.kelamin = data.kelamin || '';
      form.value.hobi = data.hobi || '';
      form.value.deskripsi = data.deskripsi || '';
    }
  }
});

const simpanPengaturan = async () => {
  try {
    if (!user) return alert("User tidak ditemukan.");

    // Update data tambahan ke Firestore
    await setDoc(doc(db, 'users', user.uid), {
      nama: form.value.nama,
      umur: form.value.umur,
      kelamin: form.value.kelamin,
      hobi: form.value.hobi,
      deskripsi: form.value.deskripsi
    });

    // Update email kalau berubah
    if (form.value.email !== user.email) {
      await updateEmail(user, form.value.email);
      alert("Email berhasil diperbarui.");
    }

    // Update password kalau diisi
    if (form.value.password.length >= 6) {
      await updatePassword(user, form.value.password);
      alert("Password berhasil diperbarui.");
    }

    alert("✅ Pengaturan berhasil disimpan!");
  } catch (err) {
    console.error(err);
    alert("❌ Gagal menyimpan pengaturan: " + err.message);
  }
};
</script>

<style scoped>
.pengaturan-container {
  padding: 20px;
  background: #3a2e25;
  color: #f0e6d2;
  min-height: 100vh;
  font-family: Georgia, serif;
}
h2 {
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}
label {
  font-weight: bold;
  margin-bottom: 5px;
}
input, select, textarea {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #a1886f;
  background-color: #2e1d16;
  color: #f0e6d2;
  font-family: inherit;
}
textarea {
  resize: vertical;
}
button {
  background: #00e5ff;
  color: #000;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
}
button:hover {
  background: #00bcd4;
}
</style>

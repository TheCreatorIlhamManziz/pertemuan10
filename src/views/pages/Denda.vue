<template>
  <div class="denda-container">
    <h2>Daftar Denda</h2>
    <div v-if="fines.length > 0">
      <div v-for="fine in fines" :key="fine.id" class="fine-item">
        <p>📚 <strong>{{ fine.book }}</strong></p>
        <p>👤 Nama: {{ fine.name }}</p>
        <p>📆 Terlambat: {{ fine.days }} hari</p>
        <p>💰 Denda: Rp {{ fine.fine.toLocaleString() }}</p>
        <button class="bayar-btn" @click="bayarDenda(fine.id)">💵 Bayar</button>
      </div>
    </div>
    <p v-else class="no-fine">Tidak ada denda saat ini.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';

const fines = ref([]);

const loadFines = async () => {
  const snapshot = await getDocs(collection(db, 'denda'));
  fines.value = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};

const bayarDenda = async (id) => {
  if (!confirm("Yakin ingin membayar denda ini?")) return;
  await deleteDoc(doc(db, "denda", id));
  fines.value = fines.value.filter((f) => f.id !== id);
  alert("✅ Denda berhasil dibayar.");
};

onMounted(() => {
  loadFines();
});
</script>

<style scoped>
.denda-container {
  background: #3a2e25;
  padding: 20px;
  color: #f0e6d2;
  min-height: 100vh;
}
.fine-item {
  background: #2e1d16;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  line-height: 1.5;
  position: relative;
}
.bayar-btn {
  margin-top: 10px;
  background-color: #00ff95;
  color: #000;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
.bayar-btn:hover {
  background-color: #00e68a;
}
.no-fine {
  font-style: italic;
  margin-top: 20px;
}
</style>

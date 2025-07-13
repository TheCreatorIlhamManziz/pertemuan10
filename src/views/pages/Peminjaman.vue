<template>
  <div class="peminjaman-container">
    <h2>Daftar Peminjaman Buku</h2>
    <button @click="goToKategori" class="add-btn">➕ Tambah Buku</button>

    <div v-if="selectedBooks.length > 0" class="book-list">
      <div v-for="book in selectedBooks" :key="book.id" class="book-item">
        <img :src="book.cover" alt="cover" />
        <div class="book-info">
          <h3>{{ book.title }}</h3>
          <p>{{ book.author }}</p>
        </div>
        <button class="remove-btn" @click="removeBook(book.id)">❌</button>
      </div>

      <div class="date-label">
        <label for="returnDate">Tanggal & Waktu Pengembalian:</label>
        <input type="datetime-local" id="returnDate" v-model="returnDate" />
      </div>

      <button @click="kirimPeminjaman" class="submit-btn">📦 Kirim Peminjaman</button>
    </div>
    
    <p v-else class="empty-note">Belum ada buku yang dipilih.</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { addPeminjaman } from '@/stores/peminjamanStore';

const router = useRouter();
const selectedBooks = ref([]);
const returnDate = ref("");
const username = localStorage.getItem("username") || "User";

onMounted(() => {
  const stored = localStorage.getItem("peminjamanBooks");
  if (stored) {
    const parsed = JSON.parse(stored);
    for (const book of parsed) {
      if (!selectedBooks.value.some((b) => b.id === book.id)) {
        selectedBooks.value.push(book);
      }
    }
    localStorage.removeItem("peminjamanBooks");
  }
});

const goToKategori = () => {
  router.push("/dashboard/kategori?from=peminjaman");
};

const removeBook = (id) => {
  selectedBooks.value = selectedBooks.value.filter((b) => b.id !== id);
};

const kirimPeminjaman = async () => {
  if (!returnDate.value) return alert("Isi tanggal & waktu pengembalian!");

  await addPeminjaman(selectedBooks.value, returnDate.value, username);

  alert("📚 Berhasil dipinjam!");

  selectedBooks.value = [];
  returnDate.value = "";
  router.push("/dashboard/pengembalian");
};
</script>

<style scoped>
.peminjaman-container {
  padding: 20px;
  font-family: 'Georgia', serif;
  color: #f0e6d2;
  background: #3a2e25;
  min-height: 100vh;
}
h2 {
  margin-bottom: 10px;
}
.add-btn, .submit-btn {
  background: #00e5ff;
  color: #000;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.add-btn:hover, .submit-btn:hover {
  background-color: #00bcd4;
}
.book-list {
  margin-top: 20px;
}
.book-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
  background: #2e1d16;
  padding: 10px;
  border-radius: 8px;
  position: relative;
}
.book-item img {
  width: 60px;
  height: 90px;
  object-fit: cover;
  border-radius: 4px;
}
.book-info {
  flex-grow: 1;
}
.remove-btn {
  background: transparent;
  border: none;
  color: #ff7777;
  font-size: 20px;
  cursor: pointer;
  padding: 6px;
  position: absolute;
  top: 8px;
  right: 12px;
}
.remove-btn:hover {
  color: #ff3c3c;
}
.date-label {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 15px;
}
.date-label input[type="datetime-local"] {
  padding: 10px;
  background-color: #2b2019;
  color: #f0e6d2;
  border: 1px solid #a1886f;
  border-radius: 6px;
  font-family: 'Georgia', serif;
}
.empty-note {
  font-style: italic;
  margin-top: 20px;
}
</style>

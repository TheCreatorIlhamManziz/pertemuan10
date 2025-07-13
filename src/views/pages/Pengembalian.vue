<template>
  <div class="pengembalian-container">
    <h2>Daftar Buku Dipinjam</h2>
    <div v-if="borrowedBooks.length > 0">
      <div v-for="book in borrowedBooks" :key="book.id" class="book-return">
        <img :src="book.cover" alt="cover" />
        <div class="info">
          <h3>{{ book.title }}</h3>
          <p>Penulis: {{ book.author }}</p>
          <p>Pengembalian: {{ book.returnDate }}</p>
        </div>
        <button @click="kembalikan(book)">Kembalikan</button>
      </div>
    </div>
    <p v-else class="empty">Tidak ada buku yang sedang dipinjam.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '@/firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc
} from 'firebase/firestore';

const router = useRouter();
const borrowedBooks = ref([]);
const username = localStorage.getItem("username") || "User";

onMounted(async () => {
  const snapshot = await getDocs(collection(db, "peminjaman"));
  const today = new Date();
  const validBooks = [];
  const finesToAdd = [];

  snapshot.forEach(docSnap => {
    const book = docSnap.data();
    const returnDate = new Date(book.returnDate);
    const isLate = today > returnDate;

    if (book.status === 'dipinjam' && isLate) {
      const daysLate = Math.floor((today - returnDate) / (1000 * 60 * 60 * 24));
      const fine = daysLate === 1 ? 150000 : 150000 + (daysLate - 1) * 300000;

      finesToAdd.push({
        id: docSnap.id,
        name: username,
        book: book.title,
        days: daysLate,
        fine
      });
    } else {
      validBooks.push({ ...book, id: docSnap.id });
    }
  });

  borrowedBooks.value = validBooks;

  // Simpan denda ke Firestore jika ada
  for (const fine of finesToAdd) {
    await setDoc(doc(db, "denda", fine.id), fine);
    await deleteDoc(doc(db, "peminjaman", fine.id));
  }

  if (finesToAdd.length > 0) {
    alert("⚠️ Ada buku yang terlambat! Dialihkan ke halaman Denda.");
    router.push("/dashboard/denda");
  }
});

const kembalikan = async (book) => {
  await deleteDoc(doc(db, "peminjaman", book.id));
  borrowedBooks.value = borrowedBooks.value.filter((b) => b.id !== book.id);
  alert("✅ Buku berhasil dikembalikan.");
};
</script>

<style scoped>
.pengembalian-container {
  padding: 20px;
  background-color: #3a2e25;
  min-height: 100vh;
  color: #f0e6d2;
}
.book-return {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  background: #2e1d16;
  padding: 10px;
  border-radius: 8px;
  align-items: center;
}
.book-return img {
  width: 60px;
  height: 90px;
  object-fit: cover;
}
.info {
  flex: 1;
}
button {
  background: #00e5ff;
  color: #000;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background-color: #00bcd4;
}
.empty {
  font-style: italic;
  margin-top: 20px;
}
</style>

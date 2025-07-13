<template>
  <div class="detail-container" v-if="book">
    <div class="top-bar">
      <button class="back-button" @click="goBack">← Kembali</button>
    </div>
    <img :src="book.cover" alt="cover" />
    <h1>{{ book.title }}</h1>
    <p><strong>Penulis:</strong> {{ book.author }}</p>
    <p><strong>Tahun Terbit:</strong> {{ book.year }}</p>
    <p><strong>Genre:</strong> {{ book.genre }}</p>
    <p><strong>Rating:</strong> ⭐ {{ book.rating }}</p>
    <p><strong>Ulasan:</strong> {{ book.review }}</p>
  </div>

  <div v-else class="not-found">
    <p>🔍 Buku tidak ditemukan atau masih dimuat...</p>
  </div>
</template>

<script setup>
import { useBookStore } from "@/stores/bookStore";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useBookStore();
const route = useRoute();
const router = useRouter();
const bookId = parseInt(route.params.id);

// Ambil buku berdasarkan ID
const book = computed(() => store.books.find((b) => b.id === bookId));

// Jika data buku belum ada, fetch dulu
onMounted(() => {
  if (store.books.length === 0) {
    store.fetchBooks();
  }
});

// Fungsi kembali yang fleksibel
const goBack = () => {
  const from = route.query.from;
  if (from === "kategori") {
    router.push("/dashboard/kategori");
  } else {
    router.push("/dashboard");
  }
};
</script>

<style scoped>
.detail-container {
  max-width: 700px;
  margin: 40px auto;
  padding: 2rem;
  background-color: #222;
  color: #f0e6d2;
  border-radius: 10px;
  font-family: 'Georgia', serif;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: relative;
}

.top-bar {
  position: absolute;
  top: 20px;
  left: 20px;
}

.back-button {
  color: #ffd700;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 14px;
  border-radius: 6px;
  transition: background 0.2s;
  border: none;
  cursor: pointer;
}
.back-button:hover {
  background-color: #444;
}

img {
  display: block;
  margin: 40px auto 1rem;
  max-width: 200px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.05);
}

h1 {
  margin-bottom: 1rem;
  font-size: 28px;
  font-weight: bold;
}

p {
  margin: 8px 0;
  text-align: left;
  line-height: 1.5;
}

.not-found {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-size: 18px;
}
</style>

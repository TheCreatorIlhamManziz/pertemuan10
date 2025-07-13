<template>
  <div class="kategori-container">
    <div class="filter-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Cari judul buku..."
        class="search-input"
      />
      <select v-model="selectedFilter" class="filter-select">
        <option value="">Semua</option>
        <option value="new">New</option>
        <option value="populer">Populer</option>
        <option value="old">Old</option>
      </select>

      <!-- ✅ Tombol kirim buku untuk peminjaman -->
      <button v-if="fromPeminjaman" @click="submitSelection" class="submit-btn">
        📚 Masukkan ke Peminjaman
      </button>
    </div>

    <div class="book-grid">
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="book-card"
        @click="handleBookClick(book)"
      >
        <img :src="book.cover" alt="cover" />
        <div v-if="fromPeminjaman && isSelected(book.id)" class="checkmark">✔</div>
        <h3>{{ book.title }}</h3>
        <p><strong>{{ book.author }}</strong></p>
        <p>{{ book.year }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBookStore } from "@/stores/bookStore";

const store = useBookStore();
const router = useRouter();
const route = useRoute();

const searchQuery = ref("");
const selectedFilter = ref("");

// Tambahan peminjaman
const fromPeminjaman = computed(() => route.query.from === "peminjaman");
const selectedBooks = ref([]);

onMounted(() => {
  if (store.books.length === 0) store.fetchBooks();
});

// Navigasi
const handleBookClick = (book) => {
  if (fromPeminjaman.value) {
    toggleBook(book);
  } else {
    router.push({
      name: "BookDetail",
      params: { id: book.id },
      query: { from: "kategori" },
    });
  }
};

// Ceklist logic
const toggleBook = (book) => {
  const index = selectedBooks.value.findIndex((b) => b.id === book.id);
  if (index !== -1) {
    selectedBooks.value.splice(index, 1);
  } else {
    selectedBooks.value.push(book);
  }
};

const isSelected = (bookId) => {
  return selectedBooks.value.some((b) => b.id === bookId);
};

const submitSelection = () => {
  localStorage.setItem("peminjamanBooks", JSON.stringify(selectedBooks.value));
  router.push("/dashboard/peminjaman");
};

// Filter buku
const filteredBooks = computed(() => {
  let books = store.books;

  if (searchQuery.value.trim() !== "") {
    const keyword = searchQuery.value.toLowerCase();
    books = books.filter((b) => b.title.toLowerCase().includes(keyword));
  }

  if (selectedFilter.value === "new") {
    books = books.filter((b) => b.year >= 2020);
  } else if (selectedFilter.value === "old") {
    books = books.filter((b) => b.year <= 2014);
  } else if (selectedFilter.value === "populer") {
    books = books.filter((b) => b.rating >= 4.5);
  }

  return books;
});
</script>

<style scoped>
.kategori-container {
  padding: 20px;
  font-family: 'Georgia', serif;
  color: #f0e6d2;
  background-color: #3a2e25;
  min-height: 100vh;
}

.filter-bar {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.search-input,
.filter-select {
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
}

.search-input {
  flex: 2;
  background-color: #2b2019;
  color: #f0e6d2;
}

.filter-select {
  flex: 1;
  background-color: #4b382e;
  color: #f0e6d2;
}

.submit-btn {
  padding: 10px 16px;
  background-color: #ffd700;
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
}

.book-card {
  position: relative;
  background-color: #2f221b;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s ease;
  cursor: pointer;
  border: 1px solid #a1886f;
}

.book-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(240, 230, 210, 0.2);
}

.book-card img {
  max-width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.checkmark {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #0f0;
  color: #000;
  padding: 5px 7px;
  border-radius: 50%;
  font-weight: bold;
}
</style>

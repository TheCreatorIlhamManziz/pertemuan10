<template>
  <div class="home-container">
    <!-- Selamat Datang -->
    <section class="welcome">
      <h1>Selamat Datang di Pustaka Novel Digital!</h1>
      <p>Temukan berbagai buku terbaru dan paling populer di sini.</p>
    </section>

    <!-- Buku Baru -->
    <section class="section-books">
      <h2>📕 Buku Baru</h2>
      <div class="book-grid">
        <BookCard
          v-for="book in newBooks"
          :key="book.id"
          :book="book"
          label="NEW"
        />
      </div>
    </section>

    <!-- Buku Populer -->
    <section class="section-books">
      <h2>🔥 Buku Populer</h2>
      <div class="book-grid">
        <BookCard
          v-for="book in popularBooks"
          :key="book.id"
          :book="book"
          label="POPULER"
        />
      </div>
    </section>

    <!-- Tujuan & Permintaan Maaf -->
    <section class="footer-message">
      <p>Tujuan kami adalah memberikan akses mudah terhadap buku-buku digital untuk semua kalangan.</p>
      <p>Mohon maaf jika ada tampilan, fitur, dan isi buku yang belum tersedia. Kami terus akan terus mengupdate hal hal yang belum ada diweb ini.</p>
    </section>
  </div>
</template>

<script>
import { useBookStore } from "@/stores/bookStore";
import { onMounted, computed } from "vue";
import BookCard from "@/components/BookCard.vue";

export default {
  components: { BookCard },
  setup() {
    const store = useBookStore();
    onMounted(() => {
      store.fetchBooks(); // GET API
    });

    const newBooks = computed(() => store.books.filter((b) => b.category === "new").slice(0, 10));
    const popularBooks = computed(() => store.books.filter((b) => b.category === "popular"));

    return { newBooks, popularBooks };
  },
};
</script>

<style scoped>
.home-container {
  padding: 2rem;
  color: #f0e6d2;
  background-color: #3a2e25;
  font-family: 'Georgia', serif;
}

.welcome h1 {
  font-size: 2rem;
  color: gold;
}

.section-books h2 {
  font-size: 1.5rem;
  margin-top: 2rem;
  color: #f0d88d;
}

.book-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-message {
  font-style: italic;
  margin-top: 3rem;
  color: #d0c4a8;
}

</style>

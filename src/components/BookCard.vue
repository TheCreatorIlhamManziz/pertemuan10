<template>
  <router-link :to="{ name: 'BookDetail', params: { id: book.id } }" class="book-card">
    <img :src="book.cover" alt="cover" />
    <div class="info">
      <div class="label" v-if="label">{{ label }}</div>
      <h3>{{ book.title }} ({{ book.year }})</h3>
      <div class="rating">⭐ {{ book.rating }}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    book: Object,
    label: String,
  },
};
</script>

<style scoped>
.book-card {
  width: 160px;
  background: #222;
  border-radius: 10px;
  overflow: hidden;
  color: #fff;
  text-decoration: none;
}

.book-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.book-card .info {
  padding: 10px;
}

.book-card .label {
  background-color: red;
  color: white;
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: 4px;
  margin-bottom: 6px;
  display: inline-block;
}
</style>

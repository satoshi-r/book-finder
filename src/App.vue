<template>
  <div id="app">
    <div class="search">
      <label for="search" class="search-label">
        <input
          type="text"
          name="search"
          id="search"
          class="search-input"
          placeholder="Поиск"
          v-model="searchValue"
          @keydown.enter="searchBooks"
        />
        <img
          v-if="searchValue.length > 0"
          @click="clearSearch"
          :src="closeIcon"
          alt="x"
          class="search-clear"
        />
      </label>
      <button class="search-btn" @click="searchBooks">Найти</button>
    </div>

    <div class="result">
      <a
        v-for="(book, idx) in serializeBooks"
        :key="idx"
        :href="book.link"
        class="book"
        target="_blank"
      >
        <div class="book-thumb">
          <img :src="book.thumb || bookThumb" alt="thumb" />
        </div>
        <div class="book-col">
          <div class="book-title">{{ book.title }}</div>
          <div class="book-author">
            <span>{{ book.authors && book.authors.join(", ") }}</span>
          </div>
          <div class="book-description">{{ book.description }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import api from "./api";
import bookThumb from "./assets/img/book-thumb.png";
import closeIcon from "./assets/img/close-black.svg";

export default {
  name: "App",

  data() {
    return {
      searchValue: "",
      books: [],
      bookThumb,
      closeIcon,
    };
  },

  mounted() {},

  methods: {
    async searchBooks() {
      this.books = await api.getBooks(this.searchValue);
      this.books = this.books.items;
    },

    cutDescription(text) {
      if (text && text.length > 200) {
        let sliced = text.slice(0, 200);
        if (sliced.length < text.length) {
          return (sliced += "...");
        }
      }
    },

    clearSearch() {
      this.searchValue = "";
    },
  },

  computed: {
    serializeBooks() {
      return this.books.map((book) => ({
        link: book.volumeInfo?.previewLink,
        thumb: book.volumeInfo?.imageLinks?.thumbnail,
        title: book.volumeInfo?.title,
        authors: book.volumeInfo?.authors,
        description: this.cutDescription(book.volumeInfo?.description),
      }));
    },
  },
};
</script>

<style src="./style.css"></style>

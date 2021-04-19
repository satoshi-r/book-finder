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
    <div v-if="loader" class="loader-overlay">
      <img :src="loaderGif" alt="gif">
    </div>
    <div v-if="books" class="result">
      <a
        v-for="(book, idx) in serializedBooks"
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
          <div v-html="book.description" class="book-description"></div>
          <div class="book-publisher">{{ book.publisher }}</div>
          <div class="book-date">{{ book.publishedDate }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import api from "./api";
import bookThumb from "./assets/img/book-thumb.png";
import closeIcon from "./assets/img/close-black.svg";
import loaderGif from "./assets/img/loader.gif";

export default {
  name: "App",

  data() {
    return {
      searchValue: "",
      books: [],
      loader: false,

      bookThumb,
      closeIcon,
      loaderGif
    };
  },

  mounted() {},

  methods: {
    async searchBooks() {
      if (this.searchValue.length == 0) return;
      this.loader = true;
      this.books = await api.getBooks(this.searchValue);
      this.books = this.books.items;
      this.loader = false;
    },

    clearSearch() {
      this.searchValue = "";
    },

    cutDescription(text) {
      if (text && text.length > 200) {
        let sliced = text.slice(0, 200);
        if (sliced.length < text.length) {
          return (sliced += "...");
        }
      }
    },

    cutDate(date) {
      if (date && date.length > 4) {
        const sliced = date.slice(0, 4);
        return sliced;
      }
    }
  },

  computed: {
    serializedBooks() {
      return this.books.map((book) => ({
        link: book.volumeInfo?.previewLink,
        thumb: book.volumeInfo?.imageLinks?.thumbnail,
        title: book.volumeInfo?.title,
        authors: book.volumeInfo?.authors,
        publisher: book.volumeInfo?.publisher,
        publishedDate: this.cutDate(book.volumeInfo?.publishedDate),
        description: this.cutDescription(book.volumeInfo?.description),
      }));
    },
  },
};
</script>

<style src="./style.css"></style>

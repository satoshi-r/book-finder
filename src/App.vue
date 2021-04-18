<template>
  <div id="app">
    <div>
      <div class="max-w-xs flex justify-center">
        <label for="search" class="block text-sm font-medium text-gray-700"
          >Поиск</label
        >
        <input
          type="text"
          name="search"
          id="search"
          class="pr-10 w-full h-10 rounded-md shadow-md border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Поиск"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style src="./style.css"></style>

<template>
  <div>
    <SearchBox v-on:search-change="searchRequest"></SearchBox>
    <MovieList
      v-bind:initial-search-status="initialSearchStatus"
      v-on:search-again="searchRequest"
    ></MovieList>
  </div>
</template>

<script lang="ts">
import SearchBox from "../components/SearchBox";
import MovieList from "../components/MovieList.vue";
//import MoviesInterface from "../models/interfaces.ts";

export default {
  name: "Home",
  async created() {
    await this.searchRequest(this.allTextSearch);
  },
  methods: {
    searchRequest: async function(textToSearch) {
      if (!textToSearch) {
        textToSearch = this.allTextSearch;
      }
      let controller = new AbortController();
      setTimeout(() => controller.abort(), 6000);
      this.currentTextSearch = textToSearch;
      try {
        this.currentTextSearch = this.currentTextSearch.toLowerCase();
        const response = await fetch(
          "http://localhost:3000/search/" + this.currentTextSearch,
          { signal: controller.signal }
        );
        const searchDataRetrieved = await response.json();
        this.$store.commit("setMovies", searchDataRetrieved.items);
        this.selectedMovieData = null;
        this.initialSearchStatus = true;
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request aborted due to timeout");
        }
        console.log(
          "An error occurred while accessing the search data: " + err.toString()
        );
        this.initialSearchStatus = false;
        this.selectedMovieData = -1;
      }
    }
  },
  data: function() {
    return {
      allTextSearch: "avengers",
      currentTextSearch: "avengers",
      selectedID: null,
      selectedMovieData: null,
      initialSearchStatus: true
    };
  },
  components: {
    SearchBox: SearchBox,
    MovieList: MovieList
  }
};
</script>
<style>
html,
body {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, blue, purple);
  color: white;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>

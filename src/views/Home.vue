<template>
  <div>
    <Facets></Facets>
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
import Facets from "../components/facets/Facets.vue";
//import MoviesInterface from "../models/interfaces.ts";

export default {
  name: "Home",
  async created() {
    await this.searchRequest("");
  },
  methods: {
    searchRequest: async function(textToSearch) {
      let controller = new AbortController();
      setTimeout(() => controller.abort(), 6000);
      if (textToSearch) {
        this.currentTextSearch = textToSearch;
        this.$store.commit("setTextToSearch", this.currentTextSearch);
      }
      try {
        const response = await fetch(
          "http://localhost:8080/search?query=" + this.currentTextSearch,
          { signal: controller.signal }
        );
        const searchDataRetrieved = await response.json();
        this.$store.commit("setMovies", searchDataRetrieved.items);
        const aggregationsForFacets = searchDataRetrieved.aggregations;
        this.$store.commit("setMediaTypes", aggregationsForFacets.types);
        this.$store.commit("setGenres", aggregationsForFacets.genres);
        this.$store.commit("setYears", aggregationsForFacets.year);
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
      currentTextSearch: "",
      selectedID: null,
      selectedMovieData: null,
      initialSearchStatus: true
    };
  },
  components: {
    SearchBox: SearchBox,
    MovieList: MovieList,
    Facets: Facets
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

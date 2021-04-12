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
      if (textToSearch) {
        this.currentTextSearch = textToSearch;
        this.$store.commit("setTextToSearch", this.currentTextSearch);
      }
      await this.$store.dispatch("movieRequest");
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

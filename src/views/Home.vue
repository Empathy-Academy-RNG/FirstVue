<template>
  <div class="main-home-container">
    <Facets></Facets>
    <SearchBox
      ref="searchBoxRef"
      v-on:search-change="searchRequest"
    ></SearchBox>
    <Loading></Loading>
    <MovieList
      v-bind:initial-search-status="initialSearchStatus"
      v-on:search-again="searchRequest"
    ></MovieList>
    <SuggestionsPanel
      v-on:suggestion-select="suggestionSearch"
    ></SuggestionsPanel>
  </div>
</template>

<script lang="ts">
import SearchBox from "../components/SearchBox";
import MovieList from "../components/MovieList.vue";
import Facets from "../components/facets/Facets.vue";
import SuggestionsPanel from "../components/SuggestionsPanel.vue";
import Loading from "../components/Loading.vue";

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
    },
    suggestionSearch: async function(suggestionToSearch) {
      this.$refs.searchBoxRef.searchBySuggestion(suggestionToSearch);
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
    Facets: Facets,
    SuggestionsPanel: SuggestionsPanel,
    Loading: Loading
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

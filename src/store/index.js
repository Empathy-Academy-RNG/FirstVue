import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
    currentTextSearch: "",
    selectedMovieIndex: -1,
    mediaTypes: [],
    genres: [],
    years: []
  },
  mutations: {
    setMovies(state, moviesToAdd) {
      state.movies = moviesToAdd;
    },
    setSelectedMovie(state, selectedMovieId) {
      state.selectedMovieIndex = selectedMovieId;
    },
    setTextToSearch(state, textToSearch) {
      state.currentTextSearch = textToSearch;
    },
    setMediaTypes(state, typesToAdd) {
      const mediaTypeKeys = [];
      for (const key in typesToAdd) {
        mediaTypeKeys.push(key);
      }
      state.mediaTypes = mediaTypeKeys;
    },
    setGenres(state, genresToAdd) {
      const genreKeys = [];
      for (const key in genresToAdd) {
        genreKeys.push(key);
      }
      state.genres = genreKeys;
    },
    setYears(state, yearsToAdd) {
      const yearKeys = [];
      for (const key in yearsToAdd) {
        yearKeys.push(key);
      }
      state.years = yearKeys;
    }
  },
  actions: {
    async movieRequestWithFacets({ commit }, facetsToInclude) {
      try {
        const requestAddr =
          "http://localhost:8080/search?query=" +
          this.state.currentTextSearch +
          facetsToInclude.facetsToInclude;
        const response = await fetch(requestAddr);
        const searchDataRetrieved = await response.json();
        commit("setMovies", searchDataRetrieved.items);
        const aggregationsForFacets = searchDataRetrieved.aggregations;
        commit("setMediaTypes", aggregationsForFacets.types);
        commit("setGenres", aggregationsForFacets.genres);
        commit("setYears", aggregationsForFacets.year);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request aborted due to timeout");
        }
        console.log(
          "An error occurred while accessing the search data: " + err.toString()
        );
      }
    }
  }
});

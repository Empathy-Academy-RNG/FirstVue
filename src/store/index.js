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
    years: [],
    selectedGenreFacets: [],
    selectedMediaTypeFacets: [],
    selectedYearFacets: [],
    parsedGenreFacets: "",
    parsedMediaTypeFacets: "",
    parsedYearFacets: "",
    currentSuggestions: []
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
        mediaTypeKeys.push([key, typesToAdd[key]]);
      }
      state.mediaTypes = mediaTypeKeys;
    },
    setGenres(state, genresToAdd) {
      const genreKeys = [];
      for (const key in genresToAdd) {
        genreKeys.push([key, genresToAdd[key]]);
      }
      state.genres = genreKeys;
    },
    setYears(state, yearsToAdd) {
      const yearKeys = [];
      for (const key in yearsToAdd) {
        yearKeys.push([key, yearsToAdd[key]]);
      }
      state.years = yearKeys;
    },
    setSelectedGenreFacets(state, facetsToAdd) {
      state.selectedGenreFacets.push(facetsToAdd);
    },
    setSelectedMediaTypeFacets(state, facetsToAdd) {
      state.selectedMediaTypeFacets.push(facetsToAdd);
    },
    setSelectedYearFacets(state, facetsToAdd) {
      state.selectedYearFacets.push(facetsToAdd);
    },
    setSuggestions(state, suggestions) {
      state.currentSuggestions = suggestions;
    },
    clearSuggestions(state) {
      state.currentSuggestions = [];
    },
    removeGenreFacet(state, facetToRemove) {
      const indexToRemove = state.selectedGenreFacets.indexOf(facetToRemove);
      let tempFacets = state.selectedGenreFacets;
      tempFacets.splice(indexToRemove, 1);
      state.selectedGenreFacets = tempFacets;
    },
    removeYearFacet(state, facetToRemove) {
      const indexToRemove = state.selectedYearFacets.indexOf(facetToRemove);
      let tempFacets = state.selectedYearFacets;
      tempFacets.splice(indexToRemove, 1);
      state.selectedYearFacets = tempFacets;
    },
    removeMediaTypeFacet(state, facetToRemove) {
      const indexToRemove = state.selectedMediaTypeFacets.indexOf(
        facetToRemove
      );
      let tempFacets = state.selectedMediaTypeFacets;
      tempFacets.splice(indexToRemove, 1);
      state.selectedMediaTypeFacets = tempFacets;
    },
    removeAllFacets(state) {
      state.selectedGenreFacets = [];
      state.selectedMediaTypeFacets = [];
      state.selectedYearFacets = [];
    },
    getParsedGenreFacets(state) {
      if (state.selectedGenreFacets.length === 0) {
        state.parsedGenreFacets = "";
        return;
      }
      state.parsedGenreFacets =
        "&genres=" +
        state.selectedGenreFacets.map(genre => genre.split(",")[0]).join(",");
    },
    getParsedMediaTypeFacets(state) {
      if (state.selectedMediaTypeFacets.length === 0) {
        state.parsedMediaTypeFacets = "";
        return;
      }
      state.parsedMediaTypeFacets =
        "&type=" +
        state.selectedMediaTypeFacets.map(type => type.split(",")[0]).join(",");
    },
    getParsedYearFacets(state) {
      if (state.selectedYearFacets.length === 0) {
        state.parsedYearFacets = "";
        return;
      }
      state.parsedYearFacets =
        "&year=" +
        state.selectedYearFacets.map(decade => decade.split(",")[0]).join(",");
    }
  },
  actions: {
    async movieRequest({ commit }) {
      try {
        commit("getParsedGenreFacets");
        commit("getParsedMediaTypeFacets");
        commit("getParsedYearFacets");
        const requestAddr =
          "http://localhost:8080/search?query=" +
          this.state.currentTextSearch +
          this.state.parsedGenreFacets +
          this.state.parsedMediaTypeFacets +
          this.state.parsedYearFacets;
        console.log("API request: " + requestAddr);
        const response = await fetch(requestAddr);
        const searchDataRetrieved = await response.json();
        if (searchDataRetrieved.total === 0) {
          commit("setSuggestions", searchDataRetrieved.suggestions);
          commit("setMovies", []);
          commit("removeAllFacets");
          return;
        } else {
          commit("clearSuggestions");
        }
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

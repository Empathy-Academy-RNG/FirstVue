import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { movies: [], selectedMovieIndex: -1 },
  mutations: {
    setMovies(state, moviesToAdd) {
      const arrCompare = function arrayCompare(_arr1, _arr2) {
        if (
          !Array.isArray(_arr1) ||
          !Array.isArray(_arr2) ||
          _arr1.length !== _arr2.length
        ) {
          return false;
        }
        const arr1 = _arr1.concat().sort();
        const arr2 = _arr2.concat().sort();
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
            return false;
          }
        }
        return true;
      };

      if (!arrCompare(state.movies, moviesToAdd)) {
        state.movies = moviesToAdd;
      }
    },
    setSelectedMovie(state, selectedMovieId) {
      state.selectedMovieIndex = selectedMovieId;
    }
  },
  actions: {
    async loadMovies(context) {
      const moviesRequest = await fetch("http://localhost:4000/search");
      const movieData = await moviesRequest.json();
      console.log(movieData);
      context.commit("setMovies", movieData);
    }
  }
});

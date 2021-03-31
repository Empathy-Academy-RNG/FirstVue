import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: { movies: [], selectedMovieIndex: -1 },
  mutations: {
    setMovies(state, moviesToAdd) {
      state.movies = moviesToAdd;
    },
    setSelectedMovie(state, selectedMovieId) {
      state.selectedMovieIndex = selectedMovieId;
    }
  },
  actions: {},
  plugins: [createPersistedState()]
});

<template>
  <div class="main-list-container">
    <div
      v-if="$store.state.movies || this.currentTextSearch !== ''"
      id="list-of-movies"
      data-test="list-of-movies"
    >
      <ul id="main-list-movies">
        <transition-group name="fade">
          <MovieListComponent
            class="movie-list-element"
            v-for="(movie, index) in $store.state.movies"
            :key="movie.id"
            data-test="movie-list-item"
            v-bind:movie-data="$store.state.movies[index]"
          >
          </MovieListComponent>
        </transition-group>
      </ul>
    </div>
    <div v-if="!initialSearchStatus" id="search-fail-panel">
      <img src="../assets/warning.png" alt="" id="search-fail-image" />
      <h1>Something went wrong, please try again.</h1>
      <button
        data-test="retry-btn"
        id="try-again-btn"
        @click.prevent="emitSearchRequest"
      >
        Search again
      </button>
    </div>
  </div>
</template>

<script>
import MovieListComponent from "@/components/MovieListComponent";
export default {
  name: "MovieList",
  components: { MovieListComponent },
  props: ["movies", "initialSearchStatus"],
  async created() {
    await this.$store.commit("removeAllFacets");
    this.$emit("search-again");
  },
  methods: {
    sendToMovie(selectedMovieIndex) {
      this.$router.push({
        name: "Movie",
        params: { movieId: this.$store.state.movies[selectedMovieIndex].id }
      });
    },
    emitSearchRequest() {
      this.$emit("search-again");
    }
  },
  data: function() {
    return {
      currentTextSearch: ""
    };
  }
};
</script>
<style scoped>
.main-list-container {
  width: 85%;
  float: right;
}

#list-of-movies {
  width: 100%;
  text-align: left;
  margin-top: -200px;
}

#search-fail-panel {
  margin-top: 40px;
  width: 100%;
  text-align: center;
  color: white;
  position: fixed;
  top: 190px;
}

#search-fail-image {
  width: 8em;
  filter: invert(100%);
}

#try-again-btn {
  border: 1px solid white;
  padding: 10px 20px;
  color: white;
  background-color: transparent;
  font-family: Avenir, sans-serif;
  font-size: 1em;
}

#try-again-btn:hover {
  color: black;
  background-color: white;
  cursor: pointer;
}

ul {
  text-align: center;
  padding-left: 0;
}

#main-list-movies {
  width: 100%;
}

@keyframes animBackgroundColor {
  from {
    background-color: transparent;
  }
  to {
    background-color: white;
  }
}

@media (max-width: 1000px) {
  #list-of-movies {
    width: 70%;
    border: none;
  }
}
</style>

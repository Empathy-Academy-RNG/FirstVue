<template>
  <div class="main-list-container">
    <div
      v-if="$store.state.movies || this.currentTextSearch !== ''"
      id="list-of-movies"
      data-test="list-of-movies"
    >
      <ul id="main-list-movies">
        <li
          class="movie-list-element"
          v-for="movie in $store.state.movies"
          :key="movie.id"
          data-test="movie-list-item"
        >
          <a
            class="movie-list-link"
            @click.prevent="sendToMovie(movie.id)"
            href=""
            data-test="movie-list-link"
            >{{ movie.title }} ({{ movie.startYear }})</a
          >
        </li>
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
export default {
  name: "MovieList",
  props: ["movies", "initialSearchStatus"],
  async created() {
    this.$emit("search-again");
  },
  methods: {
    sendToMovie(movieIdFromListItem) {
      this.$router.push({
        name: "Movie",
        params: { movieId: movieIdFromListItem }
      });
    },
    emitSearchRequest() {
      this.$emit("search-again");
    }
  },
  data: function() {
    return {
      allTextSearch: "avengers",
      currentTextSearch: "avengers"
    };
  }
};
</script>
<style scoped>
.main-list-container {
  width: 100%;
}

#list-of-movies {
  width: 100%;
  text-align: center;
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

li.movie-list-element {
  list-style: none;
  padding: 20px;
  font-size: 1.25em;
  height: 100px;
}

a.movie-list-link {
  text-decoration: none;
  font-size: 1em;
  padding: 24px;
  color: white;
  line-height: 2px;
}

a.movie-list-link:hover {
  background-color: white;
  color: black;
  animation: animBackgroundColor 0.4s ease-in-out;
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
    width: 50%;
    border: none;
  }
}
</style>

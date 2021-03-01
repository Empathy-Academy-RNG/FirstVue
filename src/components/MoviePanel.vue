<style scoped>
.movie-panel-main {
  height: 100vh;
  width: 50%;
  float: right;
  text-align: center;
}

.movie-panel-container {
  position: absolute;
  height: 100vh;
  width: 50%;
}

.movie-panel-content {
  z-index: 10;
  filter: none;
  position: relative;
  color: white;
}

.no-movie-selected-panel {
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-movie-selected-panel h1 {
  display: table-cell;
  vertical-align: middle;
  margin: 0 auto;
  color: white;
  text-align: center;
  max-width: 50%;
}

li {
  font-size: 12px;
  list-style: disc;
}
</style>

<template>
  <div class="movie-panel-main">
    <div
      class="movie-panel-content"
      v-if="selectedMovieData.movieIndexSelected !== -1"
    >
      <h1>{{ movies[selectedMovieData.movieIndexSelected].title }} <br /></h1>
      <h2>{{ movies[selectedMovieData.movieIndexSelected].type }}</h2>
      <h2>
        {{ movies[selectedMovieData.movieIndexSelected].startYear }} -
        <span
          v-if="movies[selectedMovieData.movieIndexSelected].endYear !== null"
          >{{ movies[selectedMovieData.movieIndexSelected].endYear }}</span
        >
        <span v-else> ... </span>
      </h2>
      <h2>
        {{ movies[selectedMovieData.movieIndexSelected].averageRating }}/10 out
        of {{ movies[selectedMovieData.movieIndexSelected].votes }} votes
      </h2>
      <h3>Genres:</h3>
      <li
        v-for="(genre, index) in movies[selectedMovieData.movieIndexSelected]
          .genres"
        v-bind:key="index"
      >
        {{ genre }}
      </li>
    </div>

    <div
      class="movie-panel-container"
      v-if="selectedMovieData.movieIndexSelected !== -1"
    ></div>
    <div v-else class="no-movie-selected-panel">
      <h1>Select a movie to see its details</h1>
    </div>
  </div>
</template>

<script>
import { searchResults } from "@/mocks/movies.js";

export default {
  name: "MoviePanel",
  props: ["selectedMovieData"],
  data: function() {
    return {
      movies: searchResults.items
    };
  }
};
</script>

<style scoped></style>

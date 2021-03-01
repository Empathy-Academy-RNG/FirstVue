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
</style>

<template>
  <div class="movie-panel-main">
    <div
      class="movie-panel-content"
      v-if="selectedMovieData.movieIndexSelected !== -1"
    >
      <h1>
        {{ movies[selectedMovieData.movieIndexSelected].title }} <br />
        Year:
        {{ movies[selectedMovieData.movieIndexSelected].startYear }} <br />
      </h1>
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

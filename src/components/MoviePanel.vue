<style scoped>
.movie-panel-main {
  height: 100vh;
  width: 50%;
  float: right;
  text-align: center;
}

.movie-panel-content {
  width: 50%;
  filter: none;
  position: fixed;
  color: white;
}

.no-movie-selected-panel {
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 50%;
}

.no-movie-selected-panel h1 {
  display: table-cell;
  vertical-align: middle;
  margin: 0 auto;
  color: white;
  text-align: center;
  max-width: 50%;
}

.no-movie-selected-panel img{
  margin-top: 30px;
  width: 80px;
  filter: invert(1);
}

li {
  font-size: 12px;
  list-style: disc;
}

.genre-list-element {
  border: 1px solid white;
  display: inline;
  padding: 0.5em;
  margin: 10px;
}

.genre-list-element:hover {
  color: black;
  background-color: white;
  cursor: pointer;
}

.movie-poster-image{
  width: 100px;
}

.no-movie-poster-image{
  margin-top: 40px;
  filter: invert(1);
  width: 100px;
}

/* TRANSITIONS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<template>
  <div class="movie-panel-main">
    <transition name="fade">
      <div
        class="movie-panel-content"
        v-if="selectedMovieData.movieIndexSelected !== -1"
        :key="movies[selectedMovieData.movieIndexSelected].id"
      >
        <h1>{{ movies[selectedMovieData.movieIndexSelected].title }} <br /></h1>
        <h2>{{ movies[selectedMovieData.movieIndexSelected].type }}</h2>
        <h2>
          {{ movies[selectedMovieData.movieIndexSelected].startYear }} -
          <span v-if="movies[selectedMovieData.movieIndexSelected].endYear">{{
            movies[selectedMovieData.movieIndexSelected].endYear
          }}</span>
          <span v-else> ongoing </span>
        </h2>
        <h2>
          {{ movies[selectedMovieData.movieIndexSelected].averageRating }}/10
          out of {{ movies[selectedMovieData.movieIndexSelected].votes }} votes
        </h2>
        <h3>Genres:</h3>
        <li
          class="genre-list-element"
          v-for="(genre, index) in movies[selectedMovieData.movieIndexSelected]
            .genres"
          v-bind:key="index"
        >
          {{ genre }}
        </li>
        <br>
        <img v-if="movies[selectedMovieData.movieIndexSelected].posterUrl" src="movies[selectedMovieData.movieIndexSelected].posterUrl"
             alt="Poster of the movie" class="movie-poster-image">
        <img v-else src="../assets/no-poster-image.png" alt="No poster found placeholder image"
        class="no-movie-poster-image">
      </div>
      <div v-else class="no-movie-selected-panel">
        <h1>Select a movie to see the details</h1>
        <br>
        <img src="../assets/film.png" alt="Film placeholder image">
      </div>
    </transition>
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

<template>
  <div class="movie-panel-main" data-test="movie-panel-main">
    <transition name="fade">
      <div
        class="movie-panel-content"
        v-if="selectedMovieData && selectedMovieData !== -1"
        :key="selectedMovieData.id"
        data-test="movie-panel"
      >
        <h1 data-test="movie-title">{{ selectedMovieData.title }} <br /></h1>
        <h2 data-test="movie-type">{{ selectedMovieData.type }}</h2>
        <h2 data-test="movie-years">
          {{ selectedMovieData.startYear }} -
          <span v-if="selectedMovieData.endYear">{{
            selectedMovieData.endYear
          }}</span>
          <span v-else> ongoing </span>
        </h2>
        <h2 data-test="movie-rating">
          {{ selectedMovieData.averageRating }}/10 out of
          {{ selectedMovieData.votes }} votes
        </h2>
        <h2 v-if="selectedMovieData.posterUrl">
          {{ selectedMovieData.votes }}
        </h2>
        <h3>Genres:</h3>
        <ul>
          <li
            class="genre-list-element"
            v-for="(genre, index) in selectedMovieData.genres"
            v-bind:key="index"
            data-test="movie-genres"
          >
            {{ genre }}
          </li>
        </ul>
        <br />
        <img
          v-if="selectedMovieData.posterUrl"
          v-bind:src="selectedMovieData.posterUrl"
          alt="Poster of the movie"
          class="movie-poster-image"
        />
        <img
          v-else
          src="../assets/no-poster-image.png"
          alt="No poster found placeholder image"
          class="no-movie-poster-image"
        />
      </div>
      <div id="movie-fail-panel" v-else-if="selectedMovieData === -1">
        <h2>There was an error trying to access the data, please try again.</h2>
      </div>
      <div v-else class="no-movie-selected-panel">
        <h1>Select a movie to see the details</h1>
        <br />
        <img src="../assets/film.png" alt="Film placeholder image" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MoviePanel",
  props: ["selectedMovieData"]
};
</script>

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

.no-movie-selected-panel img {
  margin-top: 100px;
  width: 80px;
  filter: invert(1);
}

ul {
  padding: 0px;
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

.movie-poster-image {
  width: 300px;
}

.no-movie-poster-image {
  margin-top: 40px;
  filter: invert(1);
  width: 100px;
  padding: 0;
}

#movie-fail-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  position: fixed;
  top: 200px;
  color: white;
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

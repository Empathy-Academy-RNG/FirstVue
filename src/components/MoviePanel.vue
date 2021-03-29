<template>
  <div class="movie-panel-main" data-test="movie-panel-main">
    <transition name="fade">
      <div
        class="movie-panel-content"
        v-if="selectedMovieData && selectedMovieData !== -1"
        :key="selectedMovieData.id"
        data-test="movie-panel"
      >
        <!--:style="{
          'background-image': 'url(\'' + selectedMovieData.posterUrl + '\')'
        }"
        -->

        <h1 data-test="movie-title">{{ selectedMovieData.title }} <br /></h1>
        <h2 data-test="movie-years">
          {{ selectedMovieData.type }}: {{ selectedMovieData.startYear }} -
          <span v-if="selectedMovieData.endYear">{{
            selectedMovieData.endYear
          }}</span>
          <span v-else> ongoing </span>
        </h2>
        <h2 data-test="movie-rating">
          {{ selectedMovieData.averageRating }}/10 out of
          {{ selectedMovieData.votes }} votes
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
  margin-top: 100px;
  width: 100%;
  float: right;
  text-align: center;
}

.movie-panel-content {
  vertical-align: top;
  width: 100%;
  filter: none;
  position: fixed;
  color: white;
  text-align: center;
}

.movie-panel-content h1 {
  font-size: 2.5em;
  text-transform: uppercase;
}

li {
  font-size: 12px;
  list-style: disc;
}

.genre-list-element {
  border: 1px solid white;
  display: inline;
  padding: 1.2em;
  margin: 10px;
}

.genre-list-element:hover {
  color: black;
  background-color: white;
  cursor: pointer;
}

.movie-poster-image {
  width: 22em;
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

@media (max-height: 1000px) {
  .movie-poster-image {
    width: 10em;
  }
  .movie-panel-content h1 {
    font-size: 1.2em;
  }
  .movie-panel-content h2 {
    font-size: 1em;
  }
  .movie-panel-content h3 {
    font-size: 0.8em;
  }
  li {
    padding: -5px;
    font-size: 10px;
  }
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

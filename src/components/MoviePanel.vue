<template>
  <div class="movie-panel-main" data-test="movie-panel-main">
    <transition name="fade">
      <div
        class="movie-panel-content"
        v-if="selectedMovieData"
        :key="selectedMovieData.id"
        data-test="movie-panel"
      >
        <h1 data-test="movie-title">{{ selectedMovieData.title }} <br /></h1>
        <h2 v-if="selectedMovieData.original_title !== selectedMovieData.title">
          ({{ selectedMovieData.original_title }})
        </h2>
        <h2 data-test="movie-years">
          {{ selectedMovieData.type }}: {{ selectedMovieData.start_year }}
          <span
            v-if="
              selectedMovieData.end_year && selectedMovieData.type !== 'movie'
            "
            >{{ " - " + selectedMovieData.end_year }}</span
          >
          <span v-else-if="selectedMovieData.type.toLowerCase() !== 'tvseries'">
          </span>
          <span v-else> - ongoing </span>
        </h2>
        <h2
          data-test="movie-rating"
          v-if="
            selectedMovieData.average_rating && selectedMovieData.average_rating
          "
        >
          {{ selectedMovieData.average_rating }}/10 out of
          {{ selectedMovieData.num_votes }} votes
        </h2>
        <h2 data-test="movie-runtime" v-if="selectedMovieData.runtime_minutes">
          Runtime: {{ selectedMovieData.runtime_minutes }} mins.
        </h2>
        <h3 data-test="movie-adult" v-if="selectedMovieData.is_adult === true">
          Adult movie
        </h3>
        <h3>Genres:</h3>
        <ul class="genre-list-container">
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
        <transition name="fade-poster">
          <img
            v-if="selectedMovieData.posterUrl"
            :src="selectedMovieData.posterUrl"
            alt="Poster of the movie"
            class="movie-poster-image"
          />
        </transition>
        <img
          v-if="!selectedMovieData.posterUrl"
          :src="this.$data.defaultPosterUrl"
          alt="Default placeholder poster"
          class="no-movie-poster-image"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import defaultPoster from "../assets/poster-not-loaded.png";
export default {
  name: "MoviePanel",
  props: {
    selectedMovieData: {
      required: true
    }
  },
  data: function() {
    return { defaultPosterUrl: defaultPoster };
  }
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
  color: white;
  text-align: center;
}

.movie-panel-content h1 {
  font-size: 2.5em;
  text-transform: uppercase;
}

.genre-list-container {
  padding-left: 0;
}

ul {
  border: 1px solid white;
  width: 400px;
  margin: 0 auto;
  padding: 20px;
}

li {
  font-size: 12px;
  list-style: disc;
}

.genre-list-element {
  display: inline;
  padding: 1.2em;
  margin: 10px;
  font-size: 0.9em;
}

.movie-poster-image {
  width: 22em;
}

.no-movie-poster-image {
  margin-top: 40px;
  width: 100px;
  padding: 0;
}

@media (max-height: 1000px) {
  .movie-poster-image {
    width: 15em;
  }
  .movie-panel-content h1 {
    font-size: 1.4em;
  }
  .movie-panel-content h2 {
    font-size: 1.2em;
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
.fade-poster-enter-active,
.fade-poster-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fade-poster-enter-active,
.fade-poster-leave-active {
  transition: opacity 1s;
}
.fade-poster-enter, .fade-poster-leave-to /* .fade-poster-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<style>
html,
body {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, blue, purple);
  color: white;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#list-of-movies {
  width: 49.5%;
  float: left;
  text-align: center;
  border-right: 2px solid white;
}

ul {
  width: 100%;
}

li.movie-list-element {
  list-style: none;
  width: 80%;
  text-align: center;
  padding: 20px;
  font-size: 1.25em;
  height: 100px;
}

a {
  text-decoration: none;
}

a.movie-list-link {
  font-size: 1em;
  padding: 10px;
  color: white;
  line-height: 2px;
  border-bottom: 2px solid transparent;
}

a.movie-list-link:hover {
  border-bottom: 2px solid white;
}

@media (max-width: 1000px) {
  #list-of-movies {
    width: 50%;
    border: none;
  }
}
</style>
<template>
  <div>
    <div id="list-of-movies">
      <ul>
        <li
          class="movie-list-element"
          v-for="(movie, index) in movies"
          v-bind:key="movie.id"
        >
          <a class="movie-list-link" @click.prevent="selectMovie(index)" href=""
            >{{ movie.title }} ({{ movie.startYear }})</a
          >
        </li>
      </ul>
    </div>
    <div id="movie-info-panel">
      <MoviePanel
        v-bind:selected-movie-data="selectedMovieData"
      ></MoviePanel>
    </div>
  </div>
</template>

<script>
import { searchResults } from "@/mocks/movies";
import MoviePanel from "@/components/MoviePanel";

export default {
  name: "Home",
  methods: {
    selectMovie: function(indexChosen) {
      this.selectedMovieData = this.movies[indexChosen];
    }
  },
  data: function() {
    return {
      movies: searchResults.items,
      selectedMovieData: null
    };
  },
  components: {
    MoviePanel: MoviePanel
  }
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  background-color: #4a69bd;
  color: white;
}
#list-of-movies {
  width: 50%;
  float: left;
  text-align: center;
}
ul {
  width: 100%;
}
li.movie-list-element {
  list-style: none;
  width: 100%;
  text-align: center;
  padding: 20px;
  font-size: 1.25em;
}

a {
  text-decoration: none;
}

a.movie-list-link {
  padding: 10px;
  color: white;
  line-height: 2px;
  border-bottom: 2px solid transparent;
}

a.movie-list-link:hover {
  border-bottom: 2px solid white;
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
        v-bind:selected-movie-data="this.selectedMovieData"
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
      console.log(indexChosen);
      this.selectedMovieData.movieIndexSelected = indexChosen;
    }
  },
  data: function() {
    return {
      movies: searchResults.items,
      selectedMovieData: {
        movieIndexSelected: -1
      }
    };
  },

  components: {
    MoviePanel: MoviePanel
  }
};
</script>

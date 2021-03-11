<template>
  <div>
    <div v-if="movies" id="list-of-movies">
      <ul>
        <li
          class="movie-list-element"
          v-for="(movie, index) in movies"
          :key="movie.id"
        >
          <a class="movie-list-link" @click.prevent="selectMovie(index)" href=""
            >{{ movie.title }} ({{ movie.startYear }})</a
          >
        </li>
      </ul>
    </div>
    <div v-else id="search-fail-panel">
      <h1>The search request failed, please try again.</h1>
      <button id="try-again-btn" @click.prevent="searchRequest()">
        Search again
      </button>
    </div>
    <div id="movie-info-panel">
      <MoviePanel :selected-movie-data="selectedMovieData"></MoviePanel>
    </div>
  </div>
</template>

<script>
import MoviePanel from "@/components/MoviePanel";

export default {
  name: "Home",
  async created() {
    await this.searchRequest();
  },
  methods: {
    async searchRequest() {
      try {
        const response = await fetch("http://localhost:3000/search");
        const searchDataRetrieved = await response.json();
        this.movies = searchDataRetrieved.items;
        this.selectedMovieData = null;
      } catch (err) {
        console.log(
          "An error occurred while accessing the search data: " + err.toString()
        );
        this.selectedMovieData = -1;
        this.movies = null;
      }
    },
    selectMovie: async function(indexChosen) {
      this.selectedID = this.movies[indexChosen].id;
      try {
        const allMovieDataResponse = await fetch(
          "http://localhost:3000/movies/" + this.selectedID
        );
        const posterDataResponse = await fetch(
          "http://omdbapi.com/?apikey=490b2246&i=" + this.selectedID
        );
        const omdbDataRetrieved = await posterDataResponse.json();
        this.selectedMovieData = await allMovieDataResponse.json();
        this.$set(
          this.selectedMovieData,
          "posterUrl",
          omdbDataRetrieved.Poster
        );
      } catch (err) {
        console.log(
          "An error occurred while trying to access the movie data: " +
            err.toString()
        );
        this.selectedMovieData = -1;
      }
      await this.retrievePoster(this.selectedID);
    }
  },
  data: function() {
    return {
      movies: null,
      selectedID: null,
      selectedMovieData: null
    };
  },
  components: {
    MoviePanel: MoviePanel
  }
};
</script>
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

#search-fail-panel {
  width: 49.5%;
  float: left;
  text-align: center;
  color: white;
  position: fixed;
  top: 190px;
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

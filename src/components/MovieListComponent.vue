<template>
  <div>
    <li
      class="movie-list-element"
      :key="movieData.id"
      data-test="movie-list-item"
    >
      <a
        class="movie-list-link"
        @click.prevent="sendToMovie(movieData.id)"
        href=""
        data-test="movie-list-link"
      >
        <img :src="this.$data.posterUrl" alt="Poster for the movie" />
        <span>{{ movieData.title }} ({{ movieData.start_year }})</span></a
      >
    </li>
  </div>
</template>

<script>
import defaultPoster from "../assets/poster-not-loaded.png";
export default {
  name: "MovieListComponent",
  props: ["movieData"],
  data: function() {
    return { posterUrl: defaultPoster };
  },
  created() {
    this.getMoviePoster(this.$props.movieData.id);
  },
  methods: {
    sendToMovie(selectedMovieId) {
      this.$router.push({
        name: "Movie",
        params: { movieId: selectedMovieId }
      });
    },
    getMoviePoster: async function(idForPoster) {
      try {
        const posterDataResponse = await fetch(
          "http://omdbapi.com/?apikey=7fd77710&i=" + idForPoster
        );
        let posterUrl = await posterDataResponse.json();
        if (posterUrl.Poster !== "N/A") {
          this.posterUrl = await posterUrl.Poster;
        }
      } catch (err) {
        if (err.name === "Abort error") {
          console.log("Request aborted due to timeout");
        }
        console.log(
          "An error occurred while trying to access the movie data: " +
            err.toString()
        );
      }
    }
  }
};
</script>

<style scoped>
li.movie-list-element {
  list-style: none;
  padding: 40px;
  font-size: 1.25em;
  height: 100px;
  margin: 40px auto;
  width: 50%;
  text-align: left;
}

a.movie-list-link {
  text-decoration: none;
  font-size: 1em;
  padding: 24px;
  color: white;
  line-height: 2px;
  display: inline-flex;
  align-items: center;
  margin-left: 25%;
}

a.movie-list-link:hover {
  background-color: white;
  color: black;
  animation: animBackgroundColor 0.4s ease-in-out;
}

img {
  width: 100px;
}

span {
  margin-left: 30px;
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

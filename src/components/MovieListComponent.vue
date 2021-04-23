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
        <transition-group name="fade">
          <img
            v-if="this.$data.posterUrl"
            :src="this.$data.posterUrl"
            alt="Poster for the movie"
            :key="movieData.id"
          />
          <img
            v-else
            :src="this.$data.defaultUrl"
            alt="Default poster for the movie"
            :key="movieData.id"
          />
        </transition-group>

        <span class="movie-title" v-if="movieData.title.length < 25"
          >{{ movieData.title }} ({{ movieData.start_year }})</span
        >
        <span class="movie-title" v-else>
          {{ movieData.title.substring(0, 40) + "..." }} ({{
            movieData.start_year
          }})
        </span>
      </a>
    </li>
  </div>
</template>

<script>
import defaultPoster from "../assets/poster-not-loaded.png";
export default {
  name: "MovieListComponent",
  props: ["movieData"],
  data: function() {
    return { posterUrl: "", defaultUrl: defaultPoster };
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
  width: 100%;
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
  /*
  background-color: white;
  color: black;
  animation: animBackgroundColor 0.4s ease-in-out;
  */
}

img {
  width: 100px;
  box-shadow: 2px 4px 12px purple;
}

span.movie-title {
  margin-left: 30px;
  border-bottom: 3px solid rgba(255, 255, 255, 0);
  padding: 100px 0;
  height: 100%;
  transition: border 0.3s linear;
}

span.movie-title:after {
  content: "";
  display: block;
  border-bottom: 4px solid white;
  width: 0;
  position: relative;
  top: 20px;
  margin-bottom: 5px;
  transition: 0.6s ease;
}

span.movie-title:hover:after {
  width: 100%;
}

@keyframes animBackgroundColor {
  from {
    background-color: transparent;
  }
  to {
    background-color: white;
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

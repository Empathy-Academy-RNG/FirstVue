<template>
  <MoviePanel v-bind:selected-movie-data="selectedMovieData"> </MoviePanel>
</template>

<script>
import MoviePanel from "@/components/MoviePanel";

export default {
  name: "Movie",
  async created() {
    this.idSelected = this.$route.params.movieId;
    this.selectedMovieData = await this.specificMovieRequest(this.idSelected);
    await this.getMoviePoster();
  },
  methods: {
    async specificMovieRequest(idOfMovieRequested) {
      try {
        const requestAddr =
          "http://localhost:8080/titles/" + idOfMovieRequested;
        const response = await fetch(requestAddr);
        return await response.json();
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request aborted due to timeout");
        }
        console.log(
          "An error occurred while accessing the search data: " + err.toString()
        );
      }
    },
    getMoviePoster: async function() {
      let controller = new AbortController();
      setTimeout(() => controller.abort(), 4000);
      try {
        const posterDataResponse = await fetch(
          "http://omdbapi.com/?apikey=7fd77710&i=" + this.idSelected
        );
        const omdbDataRetrieved = await posterDataResponse.json();
        this.$set(
          this.selectedMovieData,
          "posterUrl",
          omdbDataRetrieved.Poster
        );
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
  },
  data: function() {
    return {
      idSelected: -1,
      selectedMovieData: null
    };
  },
  components: {
    MoviePanel: MoviePanel
  }
};
</script>

<style scoped></style>

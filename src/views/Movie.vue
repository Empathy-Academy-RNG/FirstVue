<template>
  <MoviePanel v-bind:selected-movie-data="selectedMovieData"> </MoviePanel>
</template>

<script>
import MoviePanel from "@/components/MoviePanel";

export default {
  name: "Movie",
  async created() {
    await this.getMovieData(this.$route.params.movieId);
  },
  methods: {
    getMovieData: async function(idForMovieSelected) {
      let controller = new AbortController();
      setTimeout(() => controller.abort(), 3000);
      this.selectedID = idForMovieSelected;
      try {
        const allMovieDataResponse = await fetch(
          "http://localhost:3000/movies/" + this.selectedID,
          { signal: controller.signal }
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
        this.specificMovieDataStatus = true;
      } catch (err) {
        if (err.name === "Abort error") {
          console.log("Request aborted due to timeout");
        }
        console.log(
          "An error occurred while trying to access the movie data: " +
            err.toString()
        );
        this.selectedMovieData = -1;
        this.specificMovieDataStatus = false;
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

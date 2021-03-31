<template>
  <MoviePanel v-bind:selected-movie-data="selectedMovieData"> </MoviePanel>
</template>

<script>
import MoviePanel from "@/components/MoviePanel";

export default {
  name: "Movie",
  async created() {
    this.idSelected = this.$route.params.movieId;
    let tempIdForFilter = this.idSelected;
    if (this.$store.state.movies.length !== 0) {
      this.selectedMovieData = this.$store.state.movies.filter(function(movie) {
        return movie.id === tempIdForFilter;
      })[0];
    }
    await this.getMoviePoster();
  },
  methods: {
    getMoviePoster: async function() {
      let controller = new AbortController();
      setTimeout(() => controller.abort(), 4000);
      try {
        const posterDataResponse = await fetch(
          "http://omdbapi.com/?apikey=490b2246&i=" + this.idSelected
        );
        const omdbDataRetrieved = await posterDataResponse.json();
        //this.selectedMovieData.posterUrl = omdbDataRetrieved.Poster;
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

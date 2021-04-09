<template>
  <div class="genre-facet-panel">
    <h3 class="facet-title">Genre</h3>
    <div
      class="genre-facet-container"
      v-for="(genre, index) in $store.state.genres"
      :key="index"
    >
      <input
        type="radio"
        id="'radio-genre-' + index"
        name="mediaType"
        :value="genre"
        @click="genreFacetChanged"
      />
      <label :for="'radio-genre-' + index" class="radio-custom-label">{{
        genre[0]
      }}</label>
      <span class="number-facets"> ({{ genre[1] }})</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GenreFacet",
  methods: {
    genreFacetChanged: function(event) {
      const genreFacet = "&genres=" + event.target.value.toLowerCase();
      console.log(genreFacet);
      this.$store.dispatch("movieRequestWithFacets", {
        facetsToInclude: genreFacet
      });
    }
  }
};
</script>

<style scoped>
.genre-facet-panel {
  width: 100%;
  height: 300px;
  box-sizing: content-box;
  overflow-y: scroll;
  margin-top: 60px;
}

.facet-title {
  width: 80%;
  text-align: center;
  text-transform: uppercase;
  color: white;
  position: sticky;
  top: 0;
  border-bottom: 1px solid white;
  margin: 0 auto 10px;
  background-color: rgb(13, 0, 242);
  padding: 8px;
}

input {
  margin: 10px;
}

.genre-facet-container {
  margin-top: 30px;
}

label {
  color: white;
  font-size: 1em;
  text-transform: capitalize;
}
</style>

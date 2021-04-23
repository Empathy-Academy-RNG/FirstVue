<template>
  <div class="genre-facet-panel">
    <h3 class="facet-title">Genre</h3>
    <div
      class="genre-facet-container"
      v-for="(genre, index) in $store.state.genres"
      :key="index"
    >
      <input
        type="checkbox"
        id="'checkbox-genre-' + index"
        name="genre"
        :value="genre"
        @click="genreFacetChanged"
        v-model="selected"
        :checked="true"
      />
      <label :for="'checkbox-genre-' + index" class="checkbox-custom-label">{{
        genre[0]
      }}</label>
      <span class="number-facets"> ({{ genre[1] }})</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GenreFacet",
  data: function() {
    return {
      selected: [this.$store.state.genres]
    };
  },
  methods: {
    genreFacetChanged: function(event) {
      let genreChanged = event.target.value;
      if (event.target.checked) {
        this.$store.commit("setSelectedGenreFacets", genreChanged);
      } else {
        this.$store.commit("removeGenreFacet", genreChanged);
      }
      this.$store.dispatch("movieRequest");
    },
    clearFacets: function() {
      for (let i = 0; i < this.$store.state.genres.length; i++) {
        let indexToRemove = this.$data.selected.indexOf(
          this.$store.state.genres[i]
        );
        this.$data.selected.splice(indexToRemove, 1);
      }
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

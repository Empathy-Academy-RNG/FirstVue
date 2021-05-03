<template>
  <div
    class="genre-facet-panel"
    :style="{
      height: collapsed ? '80px' : '300px'
    }"
  >
    <h3 class="facet-title">
      Genre
      <span class="collapse-facet-span"
        ><img
          src="../../assets/collapse.png"
          class="collapse-facet-img"
          alt=""
          @click="collapseFacets"
          :style="{
            transform: collapsed ? 'scaleY(1)' : 'scaleY(-1)'
          }"
      /></span>
    </h3>
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
        :checked="checked.indexOf(genre[0].split(',')[0]) !== -1"
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
      checked: [],
      collapsed: false
    };
  },
  methods: {
    genreFacetChanged: function(event) {
      let genreChanged = event.target.value;
      if (event.target.checked) {
        this.$store.commit("setSelectedGenreFacets", genreChanged);
        this.$data.checked.push(event.target.value.split(",")[0]);
      } else {
        this.$store.commit("removeGenreFacet", genreChanged);
        let indexToRemove = this.$data.checked.indexOf(
          event.target.value.split(",")[0]
        );
        this.$data.checked.splice(indexToRemove, 1);
      }
      this.$store.dispatch("movieRequest");
    },
    clearFacets: function() {
      this.$data.checked = [];
    },
    collapseFacets: function() {
      this.$data.collapsed = !this.$data.collapsed;
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

.collapse-facet-span {
  padding-left: 20px;
  position: absolute;
  bottom: 1px;
}

.collapse-facet-img {
  margin-left: 10px;
  width: 40px;
  display: inline;
  filter: invert(100%);
  cursor: pointer;
}

input {
  margin: 10px;
}

.genre-facet-container {
  margin-top: 30px;
  overflow: hidden;
}

label {
  color: white;
  font-size: 1em;
  text-transform: capitalize;
}
</style>

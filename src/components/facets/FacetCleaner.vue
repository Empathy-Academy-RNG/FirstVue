<template>
  <div
    :style="{
      opacity:
        this.$store.state.selectedYearFacets.length > 0 ||
        this.$store.state.selectedMediaTypeFacets.length > 0 ||
        this.$store.state.selectedGenreFacets.length > 0
          ? '1'
          : '0'
    }"
    class="facet-cleaner-main"
  >
    <button class="facet-cleaner-btn" @click.prevent="clearFacets()">
      <span class="facet-cleaner-text">Clear filters</span>
      <img
        class="facet-cleaner-image"
        src="../../assets/clear-facets.png"
        alt="Clear facets symbol"
      />
    </button>
  </div>
</template>

<script>
export default {
  name: "FacetCleaner",
  methods: {
    clearFacets() {
      this.$store.commit("removeAllFacets");
      this.$store.dispatch("movieRequest");
      this.$emit("suggestion-clear");
    }
  }
};
</script>

<style scoped>
.facet-cleaner-main {
  margin-top: 100px;
  transition: opacity 400ms ease-out;
}

.facet-cleaner-btn {
  padding: 10px 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1em;
  border: none;
  background-color: transparent;
  color: white;
}

.facet-cleaner-btn:hover {
  filter: contrast(200%);
  cursor: pointer;
}

.facet-cleaner-image {
  vertical-align: middle;
  width: 2em;
  filter: invert(100%);
}

.facet-cleaner-text {
  padding-right: 10px;
}
</style>

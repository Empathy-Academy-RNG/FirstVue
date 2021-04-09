<template>
  <div class="year-facet-panel">
    <h3 class="facet-title">Years</h3>
    <div
      class="year-facet-container"
      v-for="(decade, index) in $store.state.years"
      :key="index"
    >
      <input
        type="radio"
        id="'radio-years-' + index"
        name="mediaType"
        :value="decade"
        @click="yearFacetChanged"
      />
      <label :for="'radio-years-' + index" class="radio-custom-label">{{
        decade
      }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "YearFacet",
  methods: {
    yearFacetChanged: function(event) {
      const yearsTextFormatted = event.target.value.split("-").join("/");
      const yearFacet = "&year=" + yearsTextFormatted;
      console.log(yearFacet);
      this.$store.dispatch("movieRequestWithFacets", {
        facetsToInclude: yearFacet
      });
    }
  }
};
</script>

<style scoped>
.year-facet-panel {
  margin-top: 40px;
  width: 100%;
  height: 250px;
  overflow-y: scroll;
  box-sizing: content-box;
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

.year-facet-container {
  margin-top: 30px;
}

input {
  margin: 10px;
}

label {
  color: white;
  font-size: 1em;
}
</style>

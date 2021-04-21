<template>
  <div class="year-facet-panel">
    <h3 class="facet-title">Years</h3>
    <div
      class="year-facet-container"
      v-for="(decade, index) in $store.state.years"
      :key="index"
    >
      <input
        type="checkbox"
        id="'radio-years-' + index"
        name="mediaType"
        :value="decade"
        @click="yearFacetChanged($event)"
        v-model="selected"
      />
      <label :for="'checkbox-years-' + index" class="checkbox-custom-label">{{
        decade[0]
      }}</label>
      <span class="number-facets"> ({{ decade[1] }})</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "YearFacet",
  data: function() {
    return {
      selected: [this.$store.state.years]
    };
  },
  methods: {
    yearFacetChanged: function(event) {
      let yearsTextFormatted = event.target.value.split("-").join("/");
      yearsTextFormatted = yearsTextFormatted.replace("*", "2022");
      if (event.target.checked) {
        this.$store.commit("setSelectedYearFacets", yearsTextFormatted);
      } else {
        this.$store.commit("removeYearFacet", yearsTextFormatted);
      }
      this.$store.dispatch("movieRequest");
    },
    clearFacets: function() {
      for (let i = 0; i < this.$store.state.years.length; i++) {
        let indexToRemove = this.$data.selected.indexOf(
          this.$store.state.years[i]
        );
        this.$data.selected.splice(indexToRemove, 1);
      }
    }
  }
};
</script>

<style scoped>
.year-facet-panel {
  margin-top: 60px;
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

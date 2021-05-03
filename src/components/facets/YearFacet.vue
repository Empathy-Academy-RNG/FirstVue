<template>
  <div
    class="year-facet-panel"
    :style="{
      height: collapsed ? '80px' : '300px'
    }"
  >
    <h3 class="facet-title">
      Years
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
        :checked="checked.indexOf(decade[0].split(',')[0]) !== -1"
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
      checked: [],
      collapsed: false
    };
  },
  methods: {
    yearFacetChanged: function(event) {
      let yearChanged = event.target.value.split("-").join("/");
      yearChanged = yearChanged.replace("*", "2022");
      if (event.target.checked) {
        this.$store.commit("setSelectedYearFacets", yearChanged);
        this.$data.checked.push(event.target.value.split(",")[0]);
      } else {
        this.$store.commit("removeYearFacet", yearChanged);
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

label {
  color: white;
  font-size: 1em;
}
</style>

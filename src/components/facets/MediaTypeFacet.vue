<template>
  <div class="media-type-facet-panel">
    <h3 class="facet-title">Media type</h3>
    <div v-for="(mediaType, index) in $store.state.mediaTypes" :key="index">
      <input
        type="radio"
        id="'radio-type-' + index"
        name="mediaType"
        :value="mediaType"
        @click="mediaTypeFacetChanged"
      />
      <label :for="'radio-type-' + index" class="radio-custom-label">{{
        mediaType
      }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "MediaTypeFacet",
  methods: {
    mediaTypeFacetChanged: function(event) {
      const typeFacet = "&type=" + event.target.value.toLowerCase();
      console.log(typeFacet);
      this.$store.dispatch("movieRequestWithFacets", {
        facetsToInclude: typeFacet
      });
    }
  }
};
</script>

<style scoped>
.media-type-facet-panel {
  margin: 40px 0;
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

input {
  margin: 10px;
}

label {
  color: white;
  font-size: 1em;
  text-transform: capitalize;
}
</style>

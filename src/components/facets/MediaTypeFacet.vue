<template>
  <div
    class="media-type-facet-panel"
    :style="{
      height: collapsed ? '80px' : '300px'
    }"
  >
    <h3 class="facet-title">
      Media type
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
      v-for="(mediaType, index) in $store.state.mediaTypes"
      :key="index"
      class="media-type-facet-container"
    >
      <input
        type="checkbox"
        id="'checkbox-type-' + index"
        name="mediaType"
        :value="mediaType"
        @click="mediaTypeFacetChanged"
        :checked="checked.indexOf(mediaType[0].split(',')[0]) !== -1"
      />
      <label :for="'checkbox-type-' + index" class="checkbox-custom-label">{{
        mediaType[0]
      }}</label>
      <span class="number-facets"> ({{ mediaType[1] }})</span>
    </div>
  </div>
</template>

<script type="ts">
export default {
  name: "MediaTypeFacet",
  data: function() {
    return {
      checked: [],
      collapsed: false,
    };
  },
  methods: {
    mediaTypeFacetChanged: function(event) {
      let mediaTypeChanged = event.target.value;
      if (event.target.checked) {
        this.$store.commit("setSelectedMediaTypeFacets", mediaTypeChanged);
        this.$data.checked.push(event.target.value.split(",")[0]);
      } else {
        this.$store.commit("removeMediaTypeFacet", mediaTypeChanged);
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
.media-type-facet-panel {
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

.media-type-facet-container {
  margin-top: 30px;
}

input {
  margin: 10px;
}

label {
  color: white;
  font-size: 1em;
  text-transform: capitalize;
}

.collapse-facet-span {
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
</style>

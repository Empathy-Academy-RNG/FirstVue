<template>
  <div class="facets-main-panel">
    <FacetCleaner v-on:suggestion-clear="uncheckFacets"></FacetCleaner>
    <GenreFacet ref="genreFacet"></GenreFacet>
    <MediaTypeFacet ref="mediaFacet"></MediaTypeFacet>
    <YearFacet ref="yearFacet"></YearFacet>
  </div>
</template>

<script>
import MediaTypeFacet from "@/components/facets/MediaTypeFacet";
import GenreFacet from "@/components/facets/GenreFacet";
import YearFacet from "@/components/facets/YearFacet";
import FacetCleaner from "@/components/facets/FacetCleaner";

export default {
  name: "Facets",
  methods: {
    uncheckFacets: function() {
      this.$refs.genreFacet.clearFacets();
      this.$refs.mediaFacet.clearFacets();
      this.$refs.yearFacet.clearFacets();
    }
  },
  components: {
    MediaTypeFacet: MediaTypeFacet,
    GenreFacet: GenreFacet,
    YearFacet: YearFacet,
    FacetCleaner: FacetCleaner
  }
};
</script>

<style>
.facets-main-panel {
  display: inline;
  float: left;
  width: 15%;
  overflow: hidden;
}
.number-facets {
  color: white;
}
</style>

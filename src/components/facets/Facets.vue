<template>
  <div class="facets-main-panel">
    <MediaTypeFacet></MediaTypeFacet>
    <GenreFacet></GenreFacet>
    <YearFacet></YearFacet>
  </div>
</template>

<script>
import MediaTypeFacet from "@/components/facets/MediaTypeFacet";
import GenreFacet from "@/components/facets/GenreFacet";
import YearFacet from "@/components/facets/YearFacet";

export default {
  name: "Facets",
  components: {
    MediaTypeFacet: MediaTypeFacet,
    GenreFacet: GenreFacet,
    YearFacet: YearFacet
  }
};
</script>

<style scoped>
.facets-main-panel {
  display: inline;
  float: left;
  width: 15%;
  overflow: hidden;
}
</style>

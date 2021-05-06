<template>
  <div class="search-box-container">
    <input
      @input="onSearchChange"
      type="search"
      placeholder="Search for a movie"
      :value="suggestionString.suggestion"
    />
    <img class="search-box-image" src="../assets/search.png" alt="" />
  </div>
</template>

<script>
const _ = require("lodash");
export default {
  name: "SearchBox",
  methods: {
    sendRequestPetition: function(textOfRequest) {
      this.$emit("search-change", textOfRequest);
    },
    //Applying the debounce to the search here to avoid extra emits to the parent
    onSearchChange: _.debounce(function(event) {
      if (event.target.value === "") {
        return;
      }
      this.$emit("search-change", event.target.value);
    }, 700),
    searchBySuggestion: function(suggestionText) {
      this.$data.suggestionString.suggestion = suggestionText;
      this.sendRequestPetition(suggestionText);
    }
  },
  data: function() {
    return {
      suggestionString: {
        suggestion: ""
      }
    };
  }
};
</script>

<style scoped>
input {
  display: inline-block;
  padding: 20px;
  width: 26em;
  border: 1px solid black;
  margin: 100px auto;
  font-size: 1.5em;
  transition: width 0.2s ease-in-out;
}
input:focus {
  border: 1px solid white;
  width: 32em;
}

input:focus::placeholder {
  color: transparent;
}

input:focus + img.search-box-image {
  opacity: 0;
}

.search-box-image {
  transition: opacity 0.3s ease-in-out;
}

.search-box-image {
  filter: invert(100%);
  width: 50px;
  padding-left: 20px;
  display: inline;
  padding-top: 50px;
  position: relative;
  top: 1em;
}
</style>

<template>
  <div class="search-box-container">
    <input
      @input="onSearchChange"
      type="search"
      placeholder="Search for a movie"
      :value="suggestionString.suggestion"
    />
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
    onSearchChange: _.debounce(function(event) {
      if (event.target.value === "") {
        return;
      }
      console.log(event.target.value);
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
  display: block;
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
</style>

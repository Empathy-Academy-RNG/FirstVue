<template>
  <div class="suggestions-main-panel">
    <div
      v-if="
        $store.state.currentSuggestions &&
          $store.state.currentSuggestions.length !== 0
      "
    >
      <h2>Maybe you were trying to say...</h2>
      <ul>
        <li
          class="suggestion-list-element"
          v-for="(suggestion, index) in $store.state.currentSuggestions"
          :key="index"
        >
          <a href="#" @click.prevent="onSuggestionClick">{{ suggestion }}</a>
        </li>
      </ul>
    </div>
    <div
      v-else-if="
        $store.state.movies.length === 0 && !$store.state.currentSuggestions
      "
    >
      <h2>
        There were no results or suggestions for your query, <br />
        please try again
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuggestionsPanel",
  methods: {
    onSuggestionClick: function(event) {
      this.sendSuggestionPetition(event.target.innerText);
    },
    sendSuggestionPetition: function(suggestionSelected) {
      this.$emit("suggestion-select", suggestionSelected);
    }
  }
};
</script>

<style scoped>
* {
  color: white;
}

.suggestions-main-panel {
  margin-top: -100px;
}

ul {
  text-align: center;
  padding-left: 0;
}

li.suggestion-list-element {
  text-align: center;
  display: block;
  margin: 0 auto;
  width: 20%;
  list-style-type: none;
  color: white;
  font-size: 1.25em;
  padding: 20px;
  border: 1px solid transparent;
}
</style>

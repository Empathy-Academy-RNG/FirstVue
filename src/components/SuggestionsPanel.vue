<template>
  <div class="suggestions-main-panel">
    <div v-if="$store.state.currentSuggestions.length !== 0">
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

ul {
  text-align: center;
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

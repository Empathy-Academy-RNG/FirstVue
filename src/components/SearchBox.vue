<template>
  <div>
    <input
      @keyup="onSearchChange"
      type="search"
      placeholder="Search for a movie"
    />
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  methods: {
    sendRequestPetition: function(textOfRequest) {
      this.$emit("search-change", textOfRequest);
    },
    onSearchChange: function(event) {
      const ref = this;
      setTimeout(function() {
        ref.sendRequestPetition(event.target.value);
      }, 700);
    }
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

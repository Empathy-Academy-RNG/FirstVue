<template>
  <div>
    <input
      v-on:input="onSearchChange"
      type="text"
      placeholder="Search for a movie"
    />
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  methods: {
    onSearchChange: function(event) {
      //TODO calcular tiempo para esperar
      this.$emit("search-change", event.target.value);
    }
  }
};
</script>

<style scoped>
input {
  display: block;
  padding: 20px;
  width: 20em;
  border: 1px solid black;
  margin: 0 auto 100px;
  font-size: 1em;
  transition: width 0.3s ease-in-out;
}
input:focus {
  border: 1px solid white;
  width: 26em;
}

input:focus::placeholder {
  color: transparent;
}
</style>

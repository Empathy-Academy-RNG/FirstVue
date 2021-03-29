<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Films</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

#nav {
  padding: 30px;
  position: fixed;
  top: 0;
  width: 100%;
  background-image: linear-gradient(to right, blue, purple);
  text-align: left;
  a {
    border-bottom: 1px solid transparent;
    font-weight: bold;
    color: white;
    padding: 10px 60px;
    font-size: 1.5em;
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
      border-bottom: 1px solid white;
    }
  }
}
</style>

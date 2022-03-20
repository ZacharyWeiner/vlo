<template>
  <nav class="text-gray-100 bg-black">
    <router-link class="text-gray-100" to="/">Home</router-link> |
    <router-link class="text-gray-100" to="/about">About</router-link> |
    <router-link class="text-gray-100" to="/lock">Lock</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

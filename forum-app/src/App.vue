<template>
  <div id="app">
    <AppNavbar />
    <router-view />
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'

export default {
  name: 'App',
  components: { AppNavbar }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>

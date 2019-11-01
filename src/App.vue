<template>
  <div id="app">
    <Navbar v-if="!homePage" />
    <router-view />
  </div>
</template>

<style lang="scss"></style>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar
  },
  computed: {
    homePage() {
      return this.$route.path === "/";
    }
  }
};
</script>

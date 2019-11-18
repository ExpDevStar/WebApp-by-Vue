<template>
  <div id="app">
    <Navbar v-if="!homePage" />

    <router-view />

    <footer class="footer content has-text-centered">
      <p class="">karaoke-app</p>
      <p>
        <a href="https://github.com/karaoke-app/frontend">
          <i class="fab fa-github fa-2x"></i>
        </a>
      </p>
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#app > main {
  flex: 1;
}

.modal-close {
  background-color: rgba(10, 10, 10, 0.2) !important;
}
</style>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  components: {
    Navbar
  },
  computed: {
    homePage() {
      return this.$route.path === "/";
    }
  },
  created: function () {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });
  }
};
</script>

<template>
  <div>
    <section class="hero is-primary is-large is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h2 class="subtitle is-2">
            Access denied!
          </h2>
          <h1 class="title is-1">401</h1>
          <div class="buttons">
            <b-button type="is-success">
              <router-link to="/" class="has-text-white"
                >Take me home!</router-link
              >
            </b-button>
            <button
              v-if="!isLogged"
              class="button is-success"
              @click="showLoginModal()"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";

export default {
  methods: {
    showLoginModal() {
      this.$buefy.modal.open({
        parent: this.$root,
        component: LoginModal,
        hasModalCard: true
      });
    }
  },
  computed: {
    isLogged: function() {
      return this.$store.getters.isLogged;
    }
  }
};
</script>

<style scoped>
  .buttons{
    justify-content: center;
  }
</style>

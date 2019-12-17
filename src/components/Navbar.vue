<template>
  <b-navbar
    wrapper-class="container"
    transparent
    spaced
    :shadow="!homepage"
    :class="{ 'is-homepage': homepage }"
  >
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }" class="logo"
        ><img src="@/assets/discoball64.png" /> karaoke-app</b-navbar-item
      >
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/list' }"
        >Song list</b-navbar-item
      >
      <b-navbar-item
        v-if="isLogged"
        tag="router-link"
        :to="{ path: '/creator' }"
        >Creator</b-navbar-item
      >
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <button
            v-if="!isLogged"
            class="button is-primary"
            @click="showRegisterModal()"
            :class="{ 'is-inverted': homepage }"
          >
            Sign up
          </button>
          <button
            v-if="!isLogged"
            class="button is-primary is-outlined"
            @click="showLoginModal()"
            :class="{ 'is-inverted': homepage }"
          >
            Log in
          </button>

          <button
            v-if="isLogged"
            class="button is-primary is-outlined"
            @click="logout"
            :class="{ 'is-inverted': homepage }"
          >
            Logout
          </button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";
import RegisterModal from "@/components/RegisterModal.vue";

export default {
  components: {},
  props: ["homepage"],
  methods: {
    showLoginModal() {
      this.$buefy.modal.open({
        parent: this.$root,
        component: LoginModal,
        hasModalCard: true
      });
    },
    showRegisterModal() {
      this.$buefy.modal.open({
        parent: this.$root,
        component: RegisterModal,
        hasModalCard: true
      });
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
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

<style lang="scss">
nav.is-homepage .navbar-burger {
  color: rgba(255, 255, 255, 0.7);

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
}

.navbar-brand .logo {
  font-weight: bold;

  img {
    margin-right: 1em;
  }
}
</style>

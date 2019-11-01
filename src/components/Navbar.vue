<template>
  <b-navbar wrapper-class="container" transparent spaced :shadow="!homepage">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }"
        >karaoke-app</b-navbar-item
      >
    </template>

    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">Home</b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/about' }"
        >About</b-navbar-item
      >
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary" :class="{ 'is-inverted': homepage }"
            >Sign up</a
          >
          <a
            class="button is-primary is-outlined"
            :class="{ 'is-inverted': homepage }"
            >Login</a
          >
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  props: ["homepage"]
};
</script>

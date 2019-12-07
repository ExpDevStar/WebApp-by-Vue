<template>
  <main>
    <section class="hero is-primary is-large is-bold">
      <div class="hero-head">
        <Navbar homepage="true" />
      </div>

      <div class="hero-body">
        <div class="container">
          <h1 class="title">karaoke-app</h1>
          <b-button tag="router-link" to="/list" class="is-success"
            >Sing along</b-button
          >
        </div>
      </div>

      <div class="hero-foot"></div>
    </section>

    <section class="section">
      <div class="container">
        <h3 class="subtitle is-4">Hot songs</h3>
        <div class="columns">
          <div class="column">
            <img src="http://placehold.jp/500x350.png" alt="placeholder" />
          </div>
          <div class="column">
            <img src="http://placehold.jp/500x350.png" alt="placeholder" />
          </div>
          <div class="column">
            <img src="http://placehold.jp/500x350.png" alt="placeholder" />
          </div>
          <div class="column">
            <img src="http://placehold.jp/500x350.png" alt="placeholder" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar
  }
};
</script>

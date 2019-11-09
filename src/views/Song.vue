<template>
  <main>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <SongPlayer provider="youtube" embedId="FTQbiNvZqaY" />
      </div>
    </section>
  </main>
</template>

<script>
import SongPlayer from "@/components/SongPlayer.vue";

export default {
  components: { SongPlayer }
};
</script>

<template>
  <section>
    <div class="columns is-multiline">
      <song-preview
        :song="song"
        class="column is-3"
        v-for="song in songs"
        :key="song.video_id"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import SongPreview from "./songPreview";

export default {
  name: "List-Table",
  components: { SongPreview },
  data() {
    return {};
  },
  mounted() {
    this.fetchSongs();
  },
  methods: {
    fetchSongs() {
      this.$store.dispatch("fetchSongs");
    }
  },
  computed: {
    ...mapGetters(["selectedGenres", "songs"])
  }
};
</script>

<style scoped lang="scss"></style>

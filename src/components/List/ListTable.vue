<template>
  <section>
    <div class="columns">
      <div
        class="column thumbnail"
        v-for="song in filteredSongs"
        v-bind:key="song.id"
      >
        <div class="thumbnail-title has-text-centered">
          <p class="title">
            {{ song.author }}
          </p>
          <p class="subtitle">
            {{ song.title }}
          </p>
        </div>
        <img src="http://placehold.jp/500x350.png" alt="placeholder" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "List-Table",
  props: ["search"],
  data() {
    return {
      songs: [
        {
          id: 1,
          title: "Africa",
          author: "Toto",
          genres: ["soft rock"]
        },
        {
          id: 2,
          title: "You Can Call Me Al",
          author: "Paul Simons",
          genres: ["pop"]
        },
        {
          id: 3,
          title: "September",
          author: "Earth, Wind & Fire",
          genres: ["funk"]
        },
        {
          id: 4,
          title: "Amish Paradise",
          author: "Weird Al",
          genres: ["Comedy rap"]
        },

      ]
    };
  },
  computed: {
    filteredSongs: function() {
      let result = this.songs;
      const searchValue = this.search.toLowerCase();

      const filter = song =>
        song.title.toLowerCase().includes(searchValue) ||
        song.author.toLowerCase().includes(searchValue) ||
        song.genres.some(genre =>
          genre.toLowerCase().includes(this.selectedGenres.name)
        );

      return result.filter(filter);
    },
    ...mapGetters(["selectedGenres"])
  }
};
</script>

<style scoped lang="scss">
.thumbnail {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
.thumbnail-title {
  position: absolute;
  display: flex;
  flex-direction: column;
}
</style>

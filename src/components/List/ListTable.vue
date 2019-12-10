<template>
  <section>
    <div class="columns is-multiline">
      <div class="column is-3" v-for="song in songs" :key="song.id">
        <div class="thumbnail">
          <div class="thumbnail-title has-text-centered">
            <h1 class="title">{{ song.author }}</h1>
            <h2 class="subtitle">{{ song.title }}</h2>
          </div>
          <img src="http://placehold.jp/500x350.png" alt="placeholder" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "List-Table",
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
        {
          id: 5,
          title: "Amish Paradise",
          author: "Weird Al",
          genres: ["Comedy rap"]
        }
      ]
    };
  },
  methods: {},
  computed: {
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

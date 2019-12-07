<template>
  <section>
    <div class="modal-card" style="width:auto">
      <header class="modal-card-head column">
        <p class="modal-card-title">Filter by genre:</p>
      </header>
      <section class="modal-card-body">
        <div class="field" v-for="genre in genres" v-bind:key="genre.id">
          <b-checkbox
            v-model="selection"
            v-bind:native-value="{ id: genre.id, name: genre.name }"
          >
            {{ genre.name }}
          </b-checkbox>
        </div>
      </section>
      <footer class="modal-card-foot">
        <b-button class="is-success" @click="saveSelection"
          >Add selected</b-button
        >
      </footer>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AddGenreModal",

  data() {
    return {
      selection: [],
      genres: [
        {
          id: 1,
          name: "soft rock"
        },
        {
          id: 2,
          name: "pop"
        },
        {
          id: 3,
          name: "indie"
        },
        {
          id: 4,
          name: "altRock"
        },
        {
          id: 5,
          name: "only Queen"
        },
        {
          id: 6,
          name: "metal"
        },
        {
          id: 7,
          name: "rap"
        },
        {
          id: 8,
          name: "japanese"
        }
      ]
    };
  },
  methods: {
    saveSelection: function() {
      this.$store.commit("setSelectedGenres", this.selection);
    }
  },
  computed: {
    ...mapGetters(["selectedGenres"])
  },
  created() {
    this.selection = this.selectedGenres;
  }
};
</script>

<style scoped></style>

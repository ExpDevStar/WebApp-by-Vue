<template>
  <main>
    <section class="hero is-primary is-medium">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-4 is-offset-4">
              <b-button class="is-success" @click="showAddGenreModal"
                >Genre filter</b-button
              >
              <h2>Genres:</h2>
              <b-taglist>
                <b-tag
                  closable
                  class="is-success"
                  v-for="genre in selectedGenres"
                  v-bind:key="genre.id"
                  @close="unselectGenre(genre)"
                  >{{ genre.name }}</b-tag
                >
              </b-taglist>
              <b-field>
                <b-input
                  placeholder="Search..."
                  v-model="searchInput"
                  type="search"
                >
                </b-input>
                <p class="control">
                  <b-button class="button is-success" @click="search"
                    >Search</b-button
                  >
                </p>
              </b-field>
            </div>
            <div class="column is-4"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="container" style="margin-top: 1rem">
      <ListTable />
    </section>
  </main>
</template>

<script>
import AddGenreModal from "../components/List/AddGenreModal";
import ListTable from "../components/List/ListTable";
import { mapGetters } from "vuex";

export default {
  name: "List",
  data() {
    return {
      searchInput: ""
    };
  },
  components: {
    ListTable
  },
  methods: {
    search: function() {},
    showAddGenreModal: function() {
      this.$buefy.modal.open({
        parent: this.$root,
        component: AddGenreModal,
        hasModalCard: true
      });
    },
    unselectGenre: function(genre) {
      this.$store.commit("unselectGenre", genre);
    }
  },
  computed: {
    ...mapGetters(["selectedGenres"])
  }
};
</script>

<style scoped></style>

<template>
  <main>
    <KaraokeModule
      :provider="song.provider_id"
      :embed-id="song.video_id"
      :cues="song.cues"
    />
    <!-- <KaraokeModule provider="vimeo" embed-id="298282989" :cues="cues" /> -->

    <header class="section">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h4 class="title is-4">{{ song.artist }} - {{ song.title }}</h4>
            </div>

            <div class="level-item">
              <b-rate icon-pack="fas" spaced size="is-small" />
            </div>

            <div class="level-item">{{ song.playCount }} plays</div>
          </div>

          <div class="level-right">
            <div class="level-item">
              <figure class="avatar image is-32x32">
                <img class="is-rounded" :src="authorMeta.avatar" />
              </figure>
            </div>

            <div class="level-item">updated {{ updatedAt }}</div>

            <div class="level-item">
              <b-tooltip label="Report" type="is-dark"
                ><b-button type="is-text" @click="reportModal"
                  ><i class="fas fa-exclamation-triangle"/></b-button
              ></b-tooltip>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="section suggestions">
      <div class="container">
        <h3 class="subtitle is-4">Songs from {{ song.artist }}</h3>

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

        <h3 class="subtitle is-4">Songs made by {{ authorMeta.name }}</h3>

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
import KaraokeModule from "@/components/KaraokeModule.vue";
import ReportModal from "@/components/ReportModal.vue";
import moment from "moment";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  components: { KaraokeModule },

  data() {
    return {
      songMeta: {
        updatedAt: Date.now()
      },
      authorMeta: {
        name: "User",
        avatar: "http://placehold.jp/200x200.png"
      }
    };
  },

  beforeRouteEnter(to, from, next) {
    Promise.all([store.dispatch("fetchSong", to.params.songId)]).then(() => {
      next();
    });
  },

  computed: {
    updatedAt() {
      return moment(this.songMeta.updatedAt).fromNow();
    },

    ...mapGetters(["song"])
  },
  methods: {
    reportModal() {
      this.$buefy.modal.open({
        parent: this.$root,
        component: ReportModal,
        hasModalCard: true
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.suggestions {
  padding-top: 0;
}
</style>

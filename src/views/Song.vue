<template>
  <main>
    <KaraokeModule provider="youtube" embed-id="FTQbiNvZqaY" :cues="cues" />
    <!-- <KaraokeModule provider="vimeo" embed-id="298282989" :cues="cues" /> -->

    <header class="section">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h4 class="title is-4">
                {{ songMeta.artist }} - {{ songMeta.title }}
              </h4>
            </div>

            <div class="level-item">
              <b-rate icon-pack="fas" spaced size="is-small"></b-rate>
            </div>

            <div class="level-item">{{ songMeta.playCount }} plays</div>
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
                  ><i class="fas fa-exclamation-triangle"></i></b-button
              ></b-tooltip>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="section suggestions">
      <div class="container">
        <h3 class="subtitle is-4">Songs from {{ songMeta.artist }}</h3>

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
import cuesData from "@/assets/example-cues.json";
import moment from "moment";

export default {
  components: { KaraokeModule },

  data() {
    return {
      songMeta: {
        title: "Africa",
        artist: "Toto",
        updatedAt: Date.now(),
        playCount: 138
      },

      authorMeta: {
        name: "User",
        avatar: "http://placehold.jp/200x200.png"
      },

      cues: cuesData.cues
    };
  },

  computed: {
    updatedAt() {
      return moment(this.songMeta.updatedAt).fromNow();
    },

    heading() {
      return `${this.songMeta.artist} - ${this.songMeta.title}`;
    }
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

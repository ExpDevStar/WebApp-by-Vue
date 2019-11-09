<template>
  <main>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <SongPlayer provider="youtube" embedId="FTQbiNvZqaY" />
      </div>
    </section>
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
          </div>

          <div class="level-right">
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
  </main>
</template>

<script>
import SongPlayer from "@/components/SongPlayer.vue";
import ReportModal from "@/components/ReportModal.vue";
import moment from "moment";

export default {
  components: { SongPlayer },
  data() {
    return {
      songMeta: {
        title: "Africa",
        artist: "Toto",
        updatedAt: Date.now()
      }
    };
  },
  computed: {
    updatedAt() {
      return moment(this.songMeta.updatedAt).fromNow();
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

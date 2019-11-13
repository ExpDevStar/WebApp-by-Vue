<template>
  <div class="columns">
    <div class="column is-half">
      <div
        id="player"
        :data-plyr-provider="video.provider"
        :data-plyr-embed-id="video.embedId"
      ></div>

      <div v-if="!player" class="card player-placeholder">
        <div class="wrapper">
          <b-button @click="loadVideoModal">Load video</b-button>
        </div>
      </div>

      <div class="controls">
        <b-field v-if="player">
          <p class="control">
            <b-button @click="player.rewind(1)"
              ><i class="fas fa-angle-double-left"></i
            ></b-button>
          </p>
          <p class="control">
            <b-button @click="player.rewind()"
              ><i class="fas fa-angle-left"></i
            ></b-button>
          </p>
          <b-input type="text" :value="currentTime" class="time" />
          <p class="control">
            <b-button @click="player.forward()"
              ><i class="fas fa-angle-right"></i
            ></b-button>
          </p>
          <p class="control">
            <b-button @click="player.forward(1)"
              ><i class="fas fa-angle-double-right"></i
            ></b-button>
          </p>
        </b-field>
      </div>
    </div>

    <div class="column is-half">
      <article class="card">
        <header class="card-header">
          <p class="card-header-title">Cues</p>
        </header>

        <div class="cues-container" v-if="cues.length > 0">
          <template v-for="(cue, index) in cues">
            <CreatorCue
              :cue="cue"
              :key="index"
              :currentTime="currentTime"
              v-on:seek="seekTo($event)"
            ></CreatorCue>
          </template>
        </div>

        <div class="cues-container empty" v-else>
          Import lyrics
        </div>

        <footer class="card-footer">
          <b-button @click="importLyricsModal">Import lyrics</b-button>
          <b-button @click="validate" type="is-primary">Next</b-button>
        </footer>
      </article>
    </div>
  </div>
</template>

<script>
import ModalImportLyrics from "@/components/ModalImportLyrics.vue";
import ModalLoadVideo from "@/components/ModalLoadVideo.vue";
import CreatorCue from "@/components/CreatorCue.vue";

import Plyr from "plyr";
import "plyr/dist/plyr.css";

export default {
  components: {
    CreatorCue
  },

  data() {
    return {
      player: null,
      currentTime: 0
    };
  },

  computed: {
    cues() {
      return this.$store.getters.cues;
    },
    video() {
      return this.$store.getters.video;
    }
  },

  methods: {
    importLyricsModal() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalImportLyrics,
        hasModalCard: true,
        events: {
          import: lyrics => {
            this.importLyrics(lyrics);
          }
        }
      });
    },

    loadVideoModal() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalLoadVideo,
        hasModalCard: true,
        events: {
          load: video => {
            this.$store.commit("setVideo", video);
            this.loadVideo();
          }
        }
      });
    },

    importLyrics(lyrics) {
      let cues = lyrics
        .split(/\r?\n/)
        .filter(text => text.length > 0)
        .map(text => ({
          text,
          startTime: null,
          endTime: null
        }));

      this.$store.commit("setCues", cues);
    },

    loadVideo() {
      this.$nextTick(() => {
        const player = new Plyr("#player", {
          ratio: "16:9",
          seekTime: 0.1,
          fullscreen: {
            enabled: false
          }
        });

        player.on("timeupdate seeking", this.update);

        this.player = player;
      });
    },

    update() {
      this.currentTime = +Number(this.player.currentTime).toFixed(3);
    },

    seekTo(time) {
      this.player.currentTime = time;
      this.player.play();
    },

    validate() {
      let error = "";
      if (!this.video.provider || !this.video.embedId) {
        error = "You haven't provided video source";
      }
      if (this.cues.length < 1) {
        error = "There aren't any cues on the list";
      }
      if (error.length > 0) {
        this.$buefy.toast.open({
          message: error,
          position: "is-bottom",
          type: "is-danger"
        });
        return;
      }
      this.$emit("finished");
    }
  },

  mounted() {
    if (this.video.provider.length > 0 && this.video.embedId.length > 0) {
      this.loadVideo();
    }
  },

  destroyed() {
    if (this.player) {
      this.player.destroy();
    }
  }
};
</script>

<style lang="scss" scoped>
.controls {
  margin-top: 1em;
  display: flex;
  justify-content: center;

  .time {
    width: 6em;
  }
}

.cues-container {
  height: 500px;
  max-height: 500px;
  overflow-y: scroll;

  &.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aaa;
  }
}

.card-footer {
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
}

.player-placeholder {
  position: relative;
  overflow: hidden;
  height: 0;
  padding-top: 56.25%;
  background: #eee;

  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

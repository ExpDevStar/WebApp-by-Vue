<template>
  <section
    class="hero is-dark is-bold"
    ref="songPlayer"
    :class="{ 'is-fullheight': fullscreen }"
  >
    <div class="hero-body">
      <div class="container" :class="{ 'is-fluid': fullscreen }">
        <div class="buttons">
          <span class="icon is-medium control-button" @click="restart"
            ><i class="fas fa-redo"></i
          ></span>
          <span class="icon is-medium control-button" @click="toggleFullscreen"
            ><i
              class="fas fa-lg"
              :class="{ 'fa-expand': !fullscreen, 'fa-compress': fullscreen }"
            ></i
          ></span>
        </div>

        <div class="columns">
          <div class="column">
            <div
              id="player"
              :data-plyr-provider="provider"
              :data-plyr-embed-id="embedId"
            ></div>
          </div>

          <div class="column lyrics-container">
            <template v-if="ended">
              <div class="control-button icon is-large" @click="restart">
                <i class="fas fa-redo fa-3x"></i>
              </div>
            </template>

            <template v-else>
              <div class="current-text" :class="{ active: isCueActive }">
                {{ currentText }}
              </div>
              <div class="future-text">{{ futureText }}</div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-foot">
      <div class="progress-bar">
        <span :style="{ width: progress }"></span>
      </div>
    </div>
  </section>
</template>

<script>
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import cuesData from "@/assets/example-cues.json";

export default {
  props: ["provider", "embedId"],
  data() {
    return {
      player: null,
      cues: cuesData.cues,
      cueIndex: -1,
      animation: null,
      isCueActive: false,
      fullscreen: false,
      progress: 0,
      ended: false
    };
  },
  computed: {
    currentText() {
      return this.cueIndex > -1 ? this.cues[this.cueIndex].text : "...";
    },
    futureText() {
      return typeof this.cues[this.cueIndex + 1] !== "undefined"
        ? this.cues[this.cueIndex + 1].text
        : "";
    }
  },
  methods: {
    update() {
      const time = this.player.currentTime;

      const currentCueIndex = this.cues.findIndex(
        cue => time >= cue.startTime && time <= cue.endTime
      );

      if (currentCueIndex > -1) {
        this.cueIndex = currentCueIndex;
        this.isCueActive = true;
      } else {
        this.isCueActive = false;
      }

      this.progress = (time / this.player.duration) * 100 + "%";

      this.animation = window.requestAnimationFrame(this.update);
    },
    restart() {
      this.player.restart();
      this.cueIndex = -1;
      this.isCueActive = false;
      this.ended = false;

      if (!this.player.playing) {
        this.player.play();
      }
    },
    start() {},
    toggleFullscreen() {
      if (!this.fullscreen) {
        this.$refs.songPlayer.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    },
    onFullscreenChange() {
      this.fullscreen = document.fullscreen;
    }
  },
  mounted() {
    this.player = new Plyr("#player", {
      ratio: "16:9",
      controls: ["play", "volume", "settings"],
      fullscreen: {
        enabled: false
      }
    });

    this.player.on("ended", () => {
      this.ended = true;
    });

    this.player.on("playing", () => {
      if (this.ended) {
        this.restart();
      }
    });

    this.animation = window.requestAnimationFrame(this.update);

    document.addEventListener("fullscreenchange", this.onFullscreenChange);
  },
  destroyed() {
    window.cancelAnimationFrame(this.animation);
    this.animation = null;

    document.removeEventListener("fullscreenchange", this.onFullscreenChange);
  }
};
</script>

<style lang="scss" scoped>
.current-text {
  text-align: center;
}

.lyrics-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > div {
    text-align: center;
    margin: 0.2em 0;

    &.current-text {
      font-weight: bold;
      font-size: 1.5em;
      opacity: 0.5;
      transition: opacity 0.5s ease-out;
      transition-delay: 0.2s;

      &.active {
        opacity: 1;
        transition: none;
      }
    }

    &.future-text {
      opacity: 0.8;
    }
  }
}

.buttons {
  position: absolute;
  right: 0em;
  top: 0em;
  z-index: 1;
}

.control-button {
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}

.progress-bar {
  height: 6px;
  position: relative;

  > span {
    display: block;
    height: 100%;
    overflow: hidden;
    position: relative;
    background: #7957d5;
  }
}

.hero.is-fullheight .lyrics-container {
  font-size: 1.6em;
}
</style>

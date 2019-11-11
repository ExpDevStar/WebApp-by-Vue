<template>
  <section class="hero karaoke-module" ref="karaoke-module" :class="heroClass">
    <div class="controls">
      <span class="icon is-large" @click="changeFontSize"
        ><i class="fas fa-font fa-lg"></i
      ></span>
      <span class="icon is-large" @click="restart"
        ><i class="fas fa-redo fa-lg"></i
      ></span>
      <span class="icon is-large" @click="toggleFullscreen"
        ><i class="fas fa-lg" :class="expandIcon"></i
      ></span>
    </div>

    <div class="hero-body">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column video-container">
            <div
              id="player"
              :data-plyr-provider="provider"
              :data-plyr-embed-id="embedId"
            ></div>
          </div>

          <div class="column lyrics-container" :style="lyricsStyle">
            <template v-if="isFinished">
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

export default {
  props: {
    provider: String,
    embedId: String,
    cues: Array
  },

  data() {
    return {
      player: null,
      cueIndex: -1,
      animation: null,
      isCueActive: false,
      isFullscreen: false,
      isFinished: false,
      fontSize: 1.2,
      progress: 0
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
    },

    heroClass() {
      return this.isFullscreen ? "is-fullheight is-black" : "is-dark is-bold";
    },

    expandIcon() {
      return this.isFullscreen ? "fa-compress" : "fa-expand";
    },

    lyricsStyle() {
      return { "font-size": this.fontSize + "em" };
    }
  },

  methods: {
    update() {
      this.updateCues();
      this.updateProgress();
    },

    updateCues() {
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
    },

    updateProgress() {
      this.progress =
        (this.player.currentTime / this.player.duration) * 100 + "%";
    },

    restart() {
      this.player.restart();
      this.cueIndex = -1;
      this.isCueActive = false;
      this.isFinished = false;

      if (!this.player.playing) {
        this.player.play();
      }
    },

    toggleFullscreen() {
      if (!this.isFullscreen) {
        this.$refs["karaoke-module"].requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    },

    onFullscreenChange() {
      this.isFullscreen = document.fullscreen;
    },

    changeFontSize() {
      this.fontSize = this.fontSize + 0.5;
      if (this.fontSize > 2.2) {
        this.fontSize = 1.2;
      }
      localStorage.fontSize = this.fontSize;
    },

    cancelUpdate() {
      window.cancelAnimationFrame(this.animation);
      this.animation = null;
    },

    createPlayer() {
      const player = new Plyr("#player", {
        ratio: "16:9",
        controls: ["play", "volume", "settings"],
        fullscreen: {
          enabled: false
        }
      });

      player.on("ended", () => {
        this.isFinished = true;
      });
      player.on("playing", () => {
        if (this.isFinished) {
          this.restart();
        }
      });
      player.on("timeupdate", this.update);

      this.player = player;
    }
  },

  mounted() {
    if (localStorage.fontSize) {
      this.fontSize = +localStorage.fontSize;
    }
    this.createPlayer();
    document.addEventListener("fullscreenchange", this.onFullscreenChange);
  },

  destroyed() {
    this.player.destroy();
    document.removeEventListener("fullscreenchange", this.onFullscreenChange);
  }
};
</script>

<style lang="scss" scoped>
.lyrics-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1.2em;

  > div {
    text-align: center;
    margin: 0.2em 0;

    &.current-text {
      font-weight: bold;
      font-size: 1.5em;
      opacity: 0.5;
      transition: opacity 0.4s ease-out;

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

.karaoke-module {
  position: relative;
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

.controls {
  position: absolute;
  right: 1.5em;
  top: 1.5em;
  z-index: 1;

  .icon {
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
}
</style>

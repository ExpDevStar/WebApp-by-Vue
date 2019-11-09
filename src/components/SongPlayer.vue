<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div
          id="player"
          :data-plyr-provider="provider"
          :data-plyr-embed-id="embedId"
        ></div>
      </div>
      <div class="column lyrics-container">
        <div class="current-text" :class="{ active: isCueActive }">
          {{ currentText }}
        </div>
        <div class="future-text">{{ futureText }}</div>
      </div>
    </div>
  </div>
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
      isCueActive: false
    };
  },
  mounted() {
    this.player = new Plyr("#player", {
      ratio: "16:9"
    });

    this.animation = window.requestAnimationFrame(this.update);
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

      this.animation = window.requestAnimationFrame(this.update);
    }
  },
  destroyed() {
    window.cancelAnimationFrame(this.animation);
    this.animation = null;
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
</style>

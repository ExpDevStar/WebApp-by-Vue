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
      <div class="column cues-container">
        <span class="current-text">{{ currentText }}</span>
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
      currentTime: 0,
      currentText: "",
      animation: null
    };
  },
  mounted() {
    this.player = new Plyr("#player", {
      ratio: "16:9"
    });

    this.animation = window.requestAnimationFrame(this.update);
  },
  methods: {
    update() {
      this.currentTime = this.player.currentTime;

      for (let cue of this.cues) {
        if (
          this.currentTime >= cue.startTime &&
          this.currentTime <= cue.endTime
        ) {
          this.currentText = cue.text;
          break;
        }
        this.currentText = "";
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
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
}
.cues-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

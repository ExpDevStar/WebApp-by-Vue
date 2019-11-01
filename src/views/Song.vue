<template>
  <main>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <div
                id="player"
                data-plyr-provider="youtube"
                data-plyr-embed-id="FTQbiNvZqaY"
              ></div>
              <input type="text" :value="currentTime" />
            </div>
            <div class="column">
              <span class="current-text">{{ currentText }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import cuesData from "@/assets/example-cues.json";

export default {
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

<style lang="scss">
.current-text {
  font-weight: bold;
  font-size: 1.5em;
}
</style>

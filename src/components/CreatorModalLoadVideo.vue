<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Load video</p>
    </header>

    <section class="modal-card-body">
      <b-field label="Video URL">
        <b-input v-model="url"></b-input>
      </b-field>
      <p>
        Currently supported services: <strong>Youtube</strong> and
        <strong>Vimeo</strong>
      </p>
    </section>

    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
      <button
        class="button is-primary"
        type="button"
        @click="parseVideoURL(url) && $parent.close()"
      >
        Load
      </button>
    </footer>
  </div>
</template>

<script>
import { error } from "@/utils/toasts.js";

export default {
  data() {
    return {
      url: ""
    };
  },

  methods: {
    parseVideoURL(url) {
      if (url.indexOf("youtube.com/") >= 0 || url.indexOf("youtu.be/") >= 0) {
        return this.matchYoutube(url);
      }

      if (url.indexOf("vimeo.com/") >= 0) {
        return this.matchVimeo(url);
      }

      return error("You've provided wrong video URL");
    },

    matchYoutube(url) {
      const regexp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regexp);
      if (match && match[2].length == 11) {
        this.$emit("load", { provider: "youtube", embedId: match[2] });
        return true;
      } else {
        error("Couldn't find video id in given URL");
      }
    },

    matchVimeo(url) {
      const regexp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
      const match = url.match(regexp);
      if (match && match[3].length > 0) {
        this.$emit("load", { provider: "vimeo", embedId: match[3] });
        return true;
      } else {
        error("Couldn't find video id in given URL");
      }
    }
  }
};
</script>

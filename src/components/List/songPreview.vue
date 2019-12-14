<template>
  <router-link :song="song" :to="songLink">
    <div class="thumbnail">
      <div class="thumbnail-title has-text-centered">
        <h1 class="title">{{ song.artist }}</h1>
        <h2 class="subtitle">{{ song.title }}</h2>
      </div>
      <img src="http://placehold.jp/500x350.png" alt="placeholder" />
    </div>
  </router-link>
</template>

<script>
export default {
  name: "songPreview",
  props: {
    song: { type: Object, required: true }
  },
  computed: {
    songLink: function() {
      return {
        name: "song",
        params: {
          songId: this.song.video_id
        }
      };
    }
  }
};
</script>

<style scoped lang="scss">
.thumbnail {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}

.thumbnail-title {
  position: absolute;
  display: flex;
  flex-direction: column;
}
</style>

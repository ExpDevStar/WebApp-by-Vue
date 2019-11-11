<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Load video</p>
    </header>

    <section class="modal-card-body">
      <b-field grouped>
        <b-field label="Provider">
          <b-select placeholder="Choose provider" v-model="video.provider">
            <option value="youtube">Youtube</option>
            <option value="vimeo">Vimeo</option>
          </b-select>
        </b-field>

        <b-field label="Video ID" expanded>
          <b-input v-model="video.embedId"></b-input>
        </b-field>
      </b-field>
    </section>

    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
      <button
        class="button is-primary"
        type="button"
        @click="$emit('load', video) && $parent.close()"
      >
        Load
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      video: {
        provider: null,
        embedId: null
      }
    };
  }
};
</script>

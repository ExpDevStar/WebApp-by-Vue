<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Import lyrics</p>
    </header>

    <section class="modal-card-body">
      <b-field label="Song lyrics">
        <b-input
          type="textarea"
          minlength="10"
          placeholder="Paste lyrics here"
          v-model="lyrics"
        ></b-input>
      </b-field>
    </section>

    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
      <button
        class="button is-primary"
        type="button"
        @click="$emit('import', lyrics) && $parent.close()"
      >
        Import
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lyrics: ""
    };
  }
};
</script>

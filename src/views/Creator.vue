<template>
  <main class="section">
    <div class="container">
      <h4 class="title is-4">Creator</h4>

      <template v-if="step === 0">
        <p>
          Song creator allows you to bring your favorite karaoke hits into the
          platform through an easy and intuitive interface. You'll have to
          provide video from currently supported video services (<strong
            >Youtube</strong
          >
          and <strong>Vimeo</strong>) and manually synchronize lyrics with the
          audio track.
        </p>
        <hr />
        <p class="buttons">
          <b-button type="is-primary" @click="step++"
            >Let's get started</b-button
          >
        </p>
      </template>

      <CreatorModule v-if="step === 1" v-on:finished="nextStep" />

      <template v-if="step === 2">
        <div class="columns is-centered">
          <div class="column is-half">
            <h3 class="title is-3 has-text-centered">Great job!</h3>
            <p class="has-text-centered">
              Now you'll have to provide some song metadata.
            </p>
            <hr />
            <b-field label="Song artist">
              <b-input type="text"></b-input>
            </b-field>
            <b-field label="Song title">
              <b-input type="text"></b-input>
            </b-field>
            <b-field>
              <div class="buttons">
                <b-button @click="step--">Go back</b-button>
                <b-button type="is-primary">Publish</b-button>
              </div>
            </b-field>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import CreatorModule from "@/components/CreatorModule.vue";

export default {
  components: { CreatorModule },

  data() {
    return {
      step: 0
    };
  },

  methods: {
    nextStep() {
      this.step++;
    }
  }
};
</script>

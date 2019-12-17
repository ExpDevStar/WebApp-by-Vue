<template>
  <main class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h4 class="title is-4">Creator</h4>
          </div>
        </div>
        <div class="level-right" v-show="step === 1">
          <div class="level-item">
            <b-button @click="showHelpModal"
              ><i class="far fa-question-circle"></i
            ></b-button>
          </div>
        </div>
      </div>

      <template v-if="step === 0">
        <p>
          Song creator allows you to bring your favorite karaoke hits into the
          platform through a
          <b-tooltip
            position="is-top"
            type="is-black"
            dashed
            label="(pl: prosto, acz schludnie)"
            >simple, yet elegant</b-tooltip
          >
          interface. You'll have to provide video from currently supported video
          services (<strong>Youtube</strong> and <strong>Vimeo</strong>) and
          manually synchronize lyrics with the audio track.
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
              <b-input type="text" v-model="artist"></b-input>
            </b-field>
            <b-field label="Song title">
              <b-input type="text" v-model="title"></b-input>
            </b-field>
            <b-field>
              <div class="buttons">
                <b-button @click="step--">Go back</b-button>
                <b-button type="is-primary" @click="publish">Publish</b-button>
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
import CreatorModalHelp from "@/components/CreatorModalHelp.vue";
import { error as errorToast, success } from "@/utils/toasts.js";

export default {
  components: { CreatorModule },

  data() {
    return {
      step: 0
    };
  },

  computed: {
    artist: {
      get() {
        return this.$store.state.artist;
      },
      set(value) {
        this.$store.commit("updateArtist", value);
      }
    },

    title: {
      get() {
        return this.$store.state.title;
      },
      set(value) {
        this.$store.commit("updateTitle", value);
      }
    }
  },

  methods: {
    nextStep() {
      this.step++;
    },

    showHelpModal() {
      this.$buefy.modal.open({
        parent: this.$root,
        component: CreatorModalHelp,
        hasModalCard: true
      });
    },

    publish() {
      this.$store
        .dispatch("storeSong")
        .then(resp => {
          if (resp.data.success && resp.data.success === true) {
            success("Song published successfully!", 5000);
            this.$router.push("/");
          } else {
            errorToast("Something went wrong");
          }
        })
        .catch(() => {
          errorToast("Something went wrong");
        });
    }
  }
};
</script>

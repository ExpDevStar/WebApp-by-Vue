<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Creator guide</p>
    </header>

    <section class="modal-card-body">
      <h6 class="title is-6">Loading video</h6>

      <p>
        You have to provide video source for your karaoke song. Currently
        supported providers are Youtube and Vimeo. In order to load video, click
        the <b-button type="is-small">Load video</b-button> button, choose the
        right provider and fill out the <strong>Video ID</strong> input. Video
        id is included in url of the video you'd like to use, e.g.
      </p>

      <pre>https://www.youtube.com/watch?v=<strong style="text-decoration: underline;">dQw4w9WgXcQ</strong></pre>

      <h6 class="title is-6">Importing lyrics</h6>

      <p>
        The next step is to import song lyrics. Click on the
        <b-button type="is-small">Import lyrics</b-button> button and paste the
        song lyrics, bearing in mind, that each line of the lyrics will be
        separated into nodes, called cues.
      </p>

      <h6 class="title is-6">Synchronizing lyrics</h6>

      <p>
        Each cue has its own <strong>start</strong> (represented by the left
        input) and <strong>end time</strong> (right input). Those values
        represent times at when the text line appears and disappears
        respectively in the karaoke song.
      </p>

      <p>
        The
        <b-button type="is-small"><i class="far fa-dot-circle"></i></b-button>
        button puts the current time into the input.
      </p>

      <p>
        Clicking directly on the line of text makes the player seek to start
        time of the cue.
      </p>
    </section>

    <footer class="modal-card-foot">
      <b-button @click="$parent.close()">Close</b-button>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.modal-card-body {
  p,
  pre {
    margin-bottom: 1em;
  }

  h6:not(:first-child) {
    margin-top: 2em;
  }
}
</style>

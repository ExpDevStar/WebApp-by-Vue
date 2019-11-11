<template>
  <div class="modal-card">
    <form action="">
      <header class="modal-card-head">
        <p class="modal-card-title">Report a song</p>
      </header>

      <section class="modal-card-body">
        <b-field label="What's wrong with this song?">
          <b-input type="textarea" minlength="10" maxlength="100"> </b-input>
        </b-field>
      </section>

      <footer class="modal-card-foot">
        <button class="button" type="button">Send report</button>
      </footer>
    </form>
  </div>
</template>

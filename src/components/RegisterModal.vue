<template>
  <div class="modal-card">
    <form action="">
      <header class="modal-card-head">
        <p class="modal-card-title">Register</p>
      </header>
      <div class="modal-card-body">
        <b-field label="Username">
          <b-input placeholder="Username" minlength="3"></b-input>
        </b-field>
        <b-field label="Email">
          <b-input placeholder="Email" type="email"></b-input>
        </b-field>
        <b-field>
          <template slot="label">
            Password
            <b-tooltip type="is-dark" label="At least 6 characters">
              <i class="far fa-question-circle"></i>
            </b-tooltip>
          </template>
          <b-input
            placeholder="Password"
            type="password"
            minlength="6"
          ></b-input>
        </b-field>
        <b-field label="Confirm password">
          <b-input
            placeholder="Confirm password"
            type="password"
            minlength="6"
          ></b-input>
        </b-field>
        <b-field>
          <b-checkbox>
            I accept the Terms & Conditions
          </b-checkbox>
        </b-field>
        <b-button expanded class="is-success">Register</b-button>
      </div>
      <div class="modal-card-foot">
        <span
          >Already have an account?&nbsp;
          <a @click="showLoginModal()">Log in!</a></span
        >
      </div>
    </form>
  </div>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";

export default {
  methods: {
    showLoginModal() {
      this.$parent.close();
      this.$buefy.modal.open({
        parent: this.$root,
        component: LoginModal,
        hasModalCard: true
      });
    }
  }
};
</script>

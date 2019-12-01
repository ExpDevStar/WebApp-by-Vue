<template>
  <div class="modal-card">
    <form>
      <header class="modal-card-head">
        <p class="modal-card-title">Register</p>
      </header>
      <div class="modal-card-body">
        <b-field label="Username">
          <b-input
            v-model="name"
            placeholder="Username"
            minlength="3"
          ></b-input>
        </b-field>
        <b-field label="Email">
          <b-input v-model="email" placeholder="Email" type="email"></b-input>
        </b-field>
        <b-field>
          <template slot="label">
            Password
            <b-tooltip type="is-dark" label="At least 6 characters">
              <span class="icon">
                <i class="far fa-question-circle"></i>
              </span>
            </b-tooltip>
          </template>
          <b-input
            v-model="password"
            placeholder="Password"
            type="password"
            minlength="6"
          ></b-input>
        </b-field>
        <b-field label="Confirm password">
          <b-input
            v-model="confirmPassword"
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
        <b-button expanded class="is-success" @click="register"
          >Register</b-button
        >
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
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmPassword: null
    };
  },
  methods: {
    register: function() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
      this.$parent.close();
    },
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

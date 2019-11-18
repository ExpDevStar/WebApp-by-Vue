<template>
  <div class="modal-card login-modal" style="width:auto">
    <form>
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>

      <section class="modal-card-body">
        <div class="buttons social-buttons">
          <b-button expanded class="is-facebook">
            <span class="icon">
              <i class="fab fa-facebook"></i>
            </span>
            <span>Login with Facebook</span>
          </b-button>

          <b-button expanded class="is-google">
            <span class="icon">
              <i class="fab fa-google"></i>
            </span>
            <span>Login with Google</span>
          </b-button>
        </div>

        <div class="separator">OR</div>

        <b-field>
          <b-input
            v-model="email"
            placeholder="Username or email"
            required
            icon-pack="fas"
            icon="user"
          ></b-input>
        </b-field>

        <b-field>
          <b-input
            v-model="password"
            type="password"
            placeholder="Password"
            password-reveal
            required
            icon-pack="fas"
            icon="key"
          ></b-input>
        </b-field>

        <div class="buttons">
          <b-button expanded type="is-success" @click="login">Login</b-button>
        </div>
      </section>

      <footer class="modal-card-foot">
        <span
          >You don't have an account?
          <a @click="showRegisterModal()">Sign up now!</a></span
        >
      </footer>
    </form>
  </div>
</template>

<script>
import RegisterModal from "@/components/RegisterModal.vue";

export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    showRegisterModal() {
      this.$parent.close();
      this.$buefy.modal.open({
        parent: this.$root,
        component: RegisterModal,
        hasModalCard: true
      });
    },
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    this.$parent.close();
    }
  }
};
</script>

<style lang="scss" scoped>
.social-buttons {
  margin-bottom: 0 !important;
}
.separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 0.25em;
  margin-bottom: 0.7em;
  color: rgb(176, 176, 176);
}
.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid rgba(176, 176, 176, 0.51);
}
.separator::before {
  margin-right: 0.25em;
}
.separator::after {
  margin-left: 0.25em;
}
</style>

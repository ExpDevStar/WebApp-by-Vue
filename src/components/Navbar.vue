<template>
  <nav>
    <b-navbar wrapper-class="container" transparent spaced :shadow="!homepage">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }"
          >karaoke-app</b-navbar-item
        >
      </template>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/' }"
          >Home</b-navbar-item
        >
        <b-navbar-item tag="router-link" :to="{ path: '/about' }"
          >About</b-navbar-item
        >
      </template>
      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <button
              class="button is-primary"
              @click="activateRegisterModal()"
              :class="{ 'is-inverted': homepage }"
            >
              Sign up
            </button>
            <button
              class="button is-primary is-outlined"
              @click="activateLoginModal()"
              :class="{ 'is-inverted': homepage }"
            >
              Login
            </button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <!--
    login modal
    -->
    <b-modal :active.sync="isLoginModalActive">
      <div class="container form">
        <form action="" class="box">
          <header class="card-header-title">
            Login to Karaoke-app!
          </header>
          <div class="buttons">
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
          <b-field label="Email">
            <b-input placeholder="Email"></b-input>
          </b-field>
          <b-field label="Password">
            <b-input type="password" placeholder="Password"> </b-input>
          </b-field>
          <div class="buttons">
            <b-button expanded type="is-success">Login</b-button>
            <span
              >You don't have an account?
              <a @click="changeAuthModalView">Sign up!</a></span
            >
          </div>
        </form>
      </div>
    </b-modal>
    <!--
    register modal
    -->
    <b-modal :active.sync="isRegisterModalActive">
      <div class="container form">
        <form action="" class="box" style="width:412.31px">
          <header class="card-header-title">
            Sign up to Karaoke-app!
          </header>
          <b-field label="Username">
            <b-input placeholder="Username" minlength="3"></b-input>
          </b-field>
          <b-field label="Email">
            <b-input placeholder="Email"></b-input>
          </b-field>
          <b-field label="Password">
            <b-input
              placeholder="At least 6 chars."
              type="password"
              minlength="6"
              validation-message="Password must contain at least 6 characters!"
            ></b-input>
          </b-field>
          <b-field label="Confirm Password">
            <b-input
              placeholder="Confirm Password"
              type="password"
              minlength="6"
              validation-message="Password must contain at least 6 characters!"
            ></b-input>
          </b-field>
          <b-checkbox>
            I accept the Terms & Conditions
          </b-checkbox>
          <b-button expanded class="is-success">
            <span>Register</span>
          </b-button>
          <span
            >Already have an account?
            <a @click="changeAuthModalView">Login!</a>
          </span>
        </form>
      </div>
    </b-modal>
  </nav>
</template>

<script>
export default {
  components: {},
  props: ["homepage"],
  data() {
    return {
      isLoginModalActive: false,
      isRegisterModalActive: false
    };
  },
  methods: {
    changeAuthModalView() {
      this.isLoginModalActive = !this.isLoginModalActive;
      this.isRegisterModalActive = !this.isRegisterModalActive;
    },
    activateLoginModal() {
      this.isLoginModalActive = true;
    },
    activateRegisterModal() {
      this.isRegisterModalActive = true;
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 0.25em;
  margin-bottom: 0.3em;
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

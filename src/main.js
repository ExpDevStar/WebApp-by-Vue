import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "buefy/dist/buefy.css";
import "./assets/bulma-social.min.css";
import axios from "axios";
import "./vee-validate";

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: "fas"
});

Vue.prototype.$http = axios;
const access_token = localStorage.getItem("token");
if (access_token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] =
    "Bearer " + access_token;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

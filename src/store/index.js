import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { API_URL } from "@/common/config";

import creator from "./modules/creator.module";
import auth from "./modules/auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    creator,
    auth
  },
  state: {
    state: {
      status: "",
      token: localStorage.getItem("token") || "",
      user: {}
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({
          url: API_URL,
          data: user,
          method: "POST"
        })
          .then(resp => {
            console.log(resp);
            resolve(resp);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    }
  }
});

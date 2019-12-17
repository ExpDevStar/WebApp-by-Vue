import Vue from "vue";
import Vuex from "vuex";

import creator from "./modules/creator.module";
import auth from "./modules/auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    creator,
    auth
  },
  state: {},
  getters: {},
  actions: {},
  mutations: {}
});

import Vue from "vue";
import Vuex from "vuex";

import creator from "./modules/creator.module";
import list from "./modules/list.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    creator,
    list
  }
});

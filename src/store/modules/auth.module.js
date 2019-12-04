import { API_URL } from "../../common/config";
import axios from "axios";

const state = {
  status: "",
  token: localStorage.getItem("token") || "",
  user: {}
};

const getters = {
  isLogged() {
    return !!state.token;
  },
  authStatus() {
    return state.status;
  }
};
const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.status = "success";
    state.token = token;
    state.user = user;
  },
  auth_error(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
  }
};
const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      // The Promise used for router redirect in login
      commit("auth_request");
      axios({ url: API_URL + "/login", data: user, method: "POST" })
        .then(resp => {
          const token = resp.data.access_token;
          localStorage.setItem("token", token); // store the token in localstorage
          commit("auth_success", token);
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error", err);
          localStorage.removeItem("token"); // if the request fails, remove any possible user token if possible
          reject(err);
        });
    });
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios({
        url: API_URL + "/register",
        data: user,
        method: "POST"
      })
        .then(resp => {
          const token = resp.data.access_token;
          const user = resp.data.user;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", token, user);
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error", err);
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit("logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

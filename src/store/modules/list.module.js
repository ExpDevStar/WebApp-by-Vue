import axios from "axios";
import { API_URL } from "../../common/config";

const state = {
  selectedGenres: [],
  songs: [],
  isLoadingList: false
};

const getters = {
  selectedGenres() {
    return state.selectedGenres;
  },
  songs() {
    return state.songs;
  }
};

const mutations = {
  setSelectedGenres(state, selectedGenres) {
    state.selectedGenres = selectedGenres;
  },
  unselectGenre(state, deletedSelection) {
    state.selectedGenres.splice(
      state.selectedGenres.indexOf(deletedSelection),
      1
    );
  },
  fetchStart(state) {
    state.isLoadingList = true;
  },
  fetchEnd(state, songs) {
    state.songs = songs;
    state.isLoading = false;
  }
};

const actions = {
  fetchSongs({ commit }) {
    commit("fetchStart");
    return new Promise((resolve, reject) => {
      axios({
        url: API_URL + "/songs",
        method: "GET"
      })
        .then(resp => {
          commit("fetchEnd", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default {
  actions,
  state,
  getters,
  mutations
};

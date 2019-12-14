import axios from "axios";

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
    return new Promise(resolve => {
      axios({
        url: "http://www.mocky.io/v2/5df516b53000006300111c2b",
        method: "GET"
      })
        .then(resp => {
          commit("fetchEnd", resp.data.songs);
          resolve(resp);
        })
        .catch(err => {
          throw new Error(err);
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

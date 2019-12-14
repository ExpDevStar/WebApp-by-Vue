import axios from "axios";

const state = {
  song: {
    video_id: null,
    artist: {},
    title: {},
    cues: []
  },
  isLoadingSong: false,
  songError: null
};

const getters = {
  song() {
    return state.song;
  }
};

const mutations = {
  fetchSongStart(state) {
    state.isLoadingSong = true;
  },
  fetchSongEnd(state, song) {
    state.isLoadingSong = false;
    state.song = song;
  },
  fetchSongErr(state, err) {
    state.isLoadingSong = false;
    state.songError = err;
  }
};

const actions = {
  fetchSong({ commit }, songId) {
    commit("fetchSongStart");
    return new Promise(resolve => {
      axios({
        //!!
        //Change url to contain song id when ready!!!
        //!!
        url: "http://www.mocky.io/v2/5df52ea63000006300111c62",
        data: songId,
        method: "GET"
      })
        .then(resp => {
          commit("fetchSongEnd", resp.data);
          resolve(resp);
        })
        .catch(err => {
          commit("fetchSongErr", err);
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

import axios from "axios";
import { API_URL } from "../../common/config";

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
        url: API_URL + "/songs/" + songId,
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

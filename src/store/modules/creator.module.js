import axios from "axios";
import { API_URL } from "../../common/config";

const state = {
  cues: [],
  video: {
    provider: "",
    embedId: ""
  },
  artist: "",
  title: ""
};

const getters = {
  cues() {
    return state.cues;
  },

  video() {
    return state.video;
  },

  storeSongData() {
    return {
      title: state.title,
      artist: state.artist,
      cues: state.cues,
      provider_id: state.video.provider,
      video_id: state.video.embedId
    };
  }
};

const mutations = {
  setCues(state, cues) {
    state.cues = cues;
  },

  updateCue(state, { cue, startTime = cue.startTime, endTime = cue.endTime }) {
    cue.startTime = startTime;
    cue.endTime = endTime;
  },

  setVideo(state, video) {
    state.video = video;
  },

  updateArtist(state, artist) {
    state.artist = artist;
  },

  updateTitle(state, title) {
    state.title = title;
  }
};

const actions = {
  storeSong({ getters }) {
    return axios({
      url: API_URL + "/songs",
      method: "POST",
      data: getters.storeSongData
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

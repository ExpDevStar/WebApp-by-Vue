const state = {
  cues: [],
  video: {
    provider: "",
    embedId: ""
  }
};

const getters = {
  cues() {
    return state.cues;
  },

  video() {
    return state.video;
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
  }
};

export default {
  state,
  getters,
  mutations
};

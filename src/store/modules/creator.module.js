const state = {
  cues: []
};

const getters = {
  cues() {
    return state.cues;
  }
};

const mutations = {
  setCues(state, cues) {
    state.cues = cues;
  },

  updateCue(state, { cue, startTime = cue.startTime, endTime = cue.endTime }) {
    cue.startTime = startTime;
    cue.endTime = endTime;
  }
};

export default {
  state,
  getters,
  mutations
};

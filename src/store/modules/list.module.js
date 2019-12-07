const state = {
  selectedGenres: []
};

const getters = {
  selectedGenres() {
    return state.selectedGenres;
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
  }
};

export default {
  state,
  getters,
  mutations
};

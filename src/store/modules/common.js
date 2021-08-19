const common = {
  namespaced: true,
  state: {
    isLoading: false,
    showModal: false,
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SHOW_MODAL(state, payload) {
      state.showModal = payload;
    },
  },
};

export default common;

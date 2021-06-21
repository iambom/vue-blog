import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: null,
      profileImage: null,
      uid: null,
    },
    items: [],
    imageFileName: [],
    postItem: null,
    tags: [],
    filteredTag: [],
    isLoading: false,
    showTaglist: false,
    showAddBtn: false,
    showGoToMainBtn: false,
  },
  getters: {
    isLogin(state) {
      return (
        state?.user?.username !== null &&
        state?.user?.profileImage !== null &&
        state?.user?.uid !== null
      );
    },
    getReadData(state) {
      return state.postItem !== null;
    },
  },
  mutations,
});

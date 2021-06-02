import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    profileImage: '',
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setProfileImage(state, profileImage) {
      state.profileImage = profileImage;
    },
    clearUsername(state) {
      state.username = '';
    },
  },
});

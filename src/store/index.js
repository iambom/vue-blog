import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    profileImage: '',
    uid: '',
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
    setUid(state, uid) {
      state.uid = uid;
    },
    clearUsername(state) {
      state.username = '';
    },
    cleartProfileImage(state) {
      state.profileImage = '';
    },
    clearUid(state) {
      state.uid = '';
    },
  },
});

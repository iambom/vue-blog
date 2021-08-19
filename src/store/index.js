import Vue from 'vue';
import Vuex from 'vuex';
import common from '@/store/modules/common.js';
import authStore from '@/store/modules/authStore.js';
import postStore from '@/store/modules/postStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    authStore,
    postStore,
  },
  // state: {
  //   user: {
  //     username: null,
  //     profileImage: null,
  //     uid: null,
  //   },
  //   items: [],
  //   imageFileName: [],
  //   postItem: null,
  //   tags: [],
  //   filteredTag: [],
  //   isLoading: false,
  //   emailValidText: '',
  //   passwordValidText: '',
  //   showModal: false,
  // },
  // getters: {
  //   isLogin(state) {
  //     return (
  //       state?.user?.username !== null &&
  //       state?.user?.profileImage !== null &&
  //       state?.user?.uid !== null
  //     );
  //   },
  //   getReadData(state) {
  //     return state.postItem !== null;
  //   },
  // },
  // mutations,
});

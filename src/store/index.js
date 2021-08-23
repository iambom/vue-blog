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
});

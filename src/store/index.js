import Vue from 'vue';
import Vuex from 'vuex';
import { saveData, removeData } from '@/service/repository';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: null,
      profileImage: null,
      uid: null,
    },
    items: [],
    postItem: {
      id: '',
      name: '',
      title: '',
      contents: '',
      publishedAt: '',
    },
  },
  getters: {
    isLogin(state) {
      return (
        state.user.username !== null &&
        state.user.profileImage !== null &&
        state.user.uid !== null
      );
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = {
        username: payload.username,
        profileImage: payload.profileImage,
        uid: payload.uid,
      };
    },
    clearUser(state) {
      state.user = null;
    },
    setItems(state, items) {
      state.items = items;
    },
    getPostItem(state, id) {
      const obj = state.items.filter(item => item.id === id)[0];
      state.postItem = obj;
    },
    saveEditItem(state, payload) {
      const index = state.items.findIndex(i => i.id === payload.id);
      state.items.splice(index, 1, payload.editItem);
      saveData(state.user.uid, payload.editItem);
    },
    addPostItem(state, newItem) {
      state.items.push(newItem);
      saveData(state.user.uid, newItem);
    },
    deleteItem(state, id) {
      const deleteItem = state.items.filter(item => item.id === id)[0];
      const remainItems = state.items.filter(item => item.id !== id);
      state.items = remainItems;
      removeData(state.user.uid, deleteItem);
    },
  },
});

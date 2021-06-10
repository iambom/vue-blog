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
    getPostItem(state, id) {
      console.log('스토어 items ', state.items);
      // const obj = state.items.filter(item => item.id === id)[0];
      const obj = state.items.filter(item => {
        console.log('필터 ', item);
        // item.id === id;
      });
      console.log('스토어 obj', obj);
      state.postItem = obj;
      console.log('스토어 getPostItem ', state.postItem);
    },
    saveEditItem(state, payload) {
      const index = state.items.findIndex(i => i.id === payload.id);
      state.items.splice(index, 1, payload.editItem);
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

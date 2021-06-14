import Vue from 'vue';
import Vuex from 'vuex';
import { saveData, removeData, syncData } from '@/service/repository';

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
  },
  getters: {
    isLogin(state) {
      return (
        state.user.username !== null &&
        state.user.profileImage !== null &&
        state.user.uid !== null
      );
    },
    getReadData(state) {
      return state.postItem !== null;
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
    setImageFileName(state, imageFileName) {
      state.imageFileName.push(imageFileName);
    },
    getPostItem(state, id) {
      if (state.items.length > 0) {
        const obj = state.items.filter(item => item.id === id)[0];
        state.postItem = obj;
      } else {
        syncData(state.user.uid, data => {
          let itemsArray = Object.values(data);
          const obj = itemsArray.filter(item => item.id === id)[0];
          state.postItem = obj;
        });
      }
    },
    clearPostItem(state) {
      state.postItem = null;
    },
    saveEditItem(state, payload) {
      const index = state.items.findIndex(i => i.id === payload.id);
      state.items.splice(index, 1, payload.editItem);
      console.log('수정 ', state.items);
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

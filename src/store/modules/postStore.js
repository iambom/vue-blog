import { saveData, removeData, syncData } from '@/service/repository';
import authStore from './authStore';
const postStore = {
  namespaced: true,
  state: {
    items: [],
    imageFileName: [],
    postItem: null,
    tags: [],
    filteredTag: [],
  },
  getters: {
    getReadData(state) {
      return state.postItem !== null;
    },
    tags(state) {
      return state.tags;
    },
  },
  mutations: {
    SET_TAGS(state, tags) {
      let tagArray = [];
      tagArray.push(tags);
      tagArray.forEach(element => {
        if (!state.tags.includes(element)) {
          state.tags.push(element);
        }
      });
    },
    FILTER_TAG(state, tag) {
      state.filteredTag = state.items.filter(item => {
        return item.contents.includes(`#${tag}`);
      });
    },
    CLEAR_TAGS(state) {
      state.tags = [];
    },
    SET_ITEMS(state, items) {
      state.items = items;
    },
    GET_POSTITEM(state, id) {
      if (state.items.length > 0) {
        // MainPage의 list를 클릭 해서 ReadPage로 갈 때
        const obj = state.items.filter(item => item.id === id)[0];
        state.postItem = obj;
      } else {
        // ReadPage에서 새로고침 할 때
        syncData(authStore.state.user.uid, data => {
          let itemsArray = Object.values(data);
          state.items = itemsArray;
          const obj = itemsArray.filter(item => item.id === id)[0];
          state.postItem = obj;
        });
      }
    },
    CLEAR_POSTITEM(state) {
      state.postItem = null;
    },
    SAVE_EDITITEM(state, payload) {
      const index = state.items.findIndex(i => i.id === payload.id);
      state.items.splice(index, 1, payload.editItem);
      saveData(authStore.state.user.uid, payload.editItem);
    },
    ADD_POSTITEM(state, newItem) {
      state.items.push(newItem);
      saveData(authStore.state.user.uid, newItem);
    },
    DELETE_ITEM(state, id) {
      const deleteItem = state.items.filter(item => item.id === id)[0];
      const remainItems = state.items.filter(item => item.id !== id);
      state.items = remainItems;
      removeData(authStore.state.user.uid, deleteItem);
    },
    SET_IMAGE_FILE_NAME(state, imageFileName) {
      state.imageFileName.push(imageFileName);
    },
  },
};

export default postStore;

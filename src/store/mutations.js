import { saveData, removeData, syncData } from '@/service/repository';

export default {
  SET_USER(state, payload) {
    state.user = {
      username: payload.username,
      profileImage: payload.profileImage,
      uid: payload.uid,
    };
  },
  CLEAR_USER(state) {
    state.user = null;
  },
  SET_ITEMS(state, items) {
    state.items = items;
  },
  SET_IMAGE_FILE_NAME(state, imageFileName) {
    state.imageFileName.push(imageFileName);
  },
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
  GET_POSTITEM(state, id) {
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
  CLEAR_POSTITEM(state) {
    state.postItem = null;
  },
  SAVE_EDITITEM(state, payload) {
    const index = state.items.findIndex(i => i.id === payload.id);
    state.items.splice(index, 1, payload.editItem);
    console.log('수정 ', state.items);
    saveData(state.user.uid, payload.editItem);
  },
  ADD_POSTITEM(state, newItem) {
    state.items.push(newItem);
    saveData(state.user.uid, newItem);
  },
  DELETE_ITEM(state, id) {
    const deleteItem = state.items.filter(item => item.id === id)[0];
    const remainItems = state.items.filter(item => item.id !== id);
    state.items = remainItems;
    removeData(state.user.uid, deleteItem);
  },
};

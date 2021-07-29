import { saveData, removeData, syncData } from '@/service/repository';

export default {
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SET_USER(state, payload) {
    state.user = {
      username: payload.username,
      profileImage: payload.profileImage,
      uid: payload.uid,
    };
  },
  CHECK_VALUE(state, errorCode) {
    if (errorCode === 'auth/invalid-email') {
      state.passwordValidText = '';
      state.emailValidText = '타당하지 않은 이메일 형식입니다.';
    } else if (errorCode === 'auth/weak-password') {
      state.emailValidText = '';
      state.passwordValidText =
        '비밀번호가 취약합니다. 특수문자를 조합해주세요';
    }
  },
  CLEAR_VALUE(state, target) {
    if (target === 'email') {
      state.emailValidText = '';
    } else {
      state.passwordValidText = '';
    }
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
      // MainPage의 list를 클릭 해서 ReadPage로 갈 때
      const obj = state.items.filter(item => item.id === id)[0];
      state.postItem = obj;
    } else {
      // ReadPage에서 새로고침 할 때
      syncData(state.user.uid, data => {
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
  CLEAR_TAGS(state) {
    state.tags = [];
  },
  SAVE_EDITITEM(state, payload) {
    const index = state.items.findIndex(i => i.id === payload.id);
    state.items.splice(index, 1, payload.editItem);
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

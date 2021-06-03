import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    profileImage: '',
    uid: '',
    items: [
      {
        id: '1',
        name: 'kim',
        title: '제목1',
        contents:
          'Object로 바꾸면 더 이상 배열이 아니어서 map을 사용할 수 없으므로 map을 써준 곳을 전부 수정해주어야 한다. Cards 안에 있는 모든 key를 받아 와서 각 key의 value object들을 card의 prop으로 넘겨준다',
        publishedAt: '21시간 전',
      },
      {
        id: '2',
        name: 'kim',
        title: '제목2',
        contents:
          '생성자 함수로 객체를 찍어낼 때마다 미리 정의한 함수를 사용할 수 있으므로 생성자 함수로 뷰에서 API나 속성을 정의해 놓고 가져다 쓰거나 재사용 하게 될 수 있다.',
        publishedAt: '2021. 6. 2',
      },
      {
        id: '3',
        name: 'kim',
        title: '제목3',
        contents:
          'Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.',
        publishedAt: '2021. 6. 1',
      },
    ],
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

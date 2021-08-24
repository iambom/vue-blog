const authStore = {
  namespaced: true,
  state: {
    user: {
      username: null,
      profileImage: null,
      uid: null,
    },
    emailValidText: '',
    passwordValidText: '',
  },
  getters: {
    isLogin(state) {
      return (
        state?.user?.username !== null &&
        state?.user?.profileImage !== null &&
        state?.user?.uid !== null
      );
    },
    isEmailValid(state) {
      return state.emailValidText;
    },
    isPasswordValid(state) {
      return state.passwordValidText;
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = {
        username: payload.username,
        profileImage: payload.profileImage,
        uid: payload.uid,
      };
    },
    VALIDATE_INPUT(state, errorCode) {
      switch (errorCode) {
        case 'auth/invalid-email':
          state.passwordValidText = '';
          state.emailValidText = '타당하지 않은 이메일 형식입니다.';
          break;
        case 'auth/email-already-in-use':
          state.passwordValidText = '';
          state.emailValidText = '이미 존재하는 이메일입니다.';
          break;
        case 'auth/weak-password':
          state.emailValidText = '';
          state.passwordValidText =
            '비밀번호가 취약합니다. 특수문자를 조합해주세요';
          break;
        case 'auth/user-not-found':
          state.passwordValidText = '';
          state.emailValidText = '가입하지 않은 회원입니다.';
          break;
        case 'auth/wrong-password':
          state.emailValidText = '';
          state.passwordValidText = '비밀번호가 틀렸습니다.';
          break;
        case 'nothing':
          state.emailValidText = '';
          state.passwordValidText = '';
          break;
      }
    },
    CLEAR_INPUT(state, target) {
      if (target === 'email') {
        state.emailValidText = '';
      } else {
        state.passwordValidText = '';
      }
    },
    CLEAR_USER(state) {
      state.user = null;
    },
  },
};

export default authStore;

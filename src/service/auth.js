import {
  firebaseAuth,
  facebookProvider,
  googleProvider,
} from '@/service/firebase';
import store from '@/store/index';
import router from '@/routes/index';

const sampleProfileImage = process.env.VUE_APP_PROFILE_SAMPLE;

function signupUser(email, password, displayName) {
  firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      userCredential.user.updateProfile({
        displayName,
      });
      store.commit('common/SHOW_MODAL', true);
    })
    .catch(error => {
      store.commit('authStore/VALIDATE_INPUT', error.code);
    });
}

function loginUser(loginType, email, password) {
  if (loginType === 'btn-sign') {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => store.commit('authStore/VALIDATE_INPUT', 'nothing'))
      .catch(error => store.commit('authStore/VALIDATE_INPUT', error.code));
  } else {
    const authProvider = getProvider(loginType);
    firebaseAuth
      .signInWithPopup(authProvider)
      .then(result => {
        console.log('어디서 에러가 ?', result);
        const userData = {
          username: result.additionalUserInfo.profile.name,
          uid: result.user.uid,
          profileImage: result.additionalUserInfo.profile.picture,
        };
        store.commit('authStore/SET_USER', userData);
        return result;
      })
      .catch(error => console.log('로그인 실패 ', error.message));
  }
}

function getProvider(providerName) {
  switch (providerName) {
    case 'google':
      return googleProvider;
    case 'facebook':
      return facebookProvider;
    default:
      throw new Error(`not supported provider : ${providerName}`);
  }
}

function logoutUser() {
  // store.commit('authStore/CLEAR_USER');
  firebaseAuth.signOut();
}

function onAuthChange() {
  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      if (router.history.current.path === '/signup') {
        firebaseAuth.signOut();
        store.commit('authStore/VALIDATE_INPUT', 'nothing');
      } else {
        // 로그인 된 경우
        const userData = {
          username: user.displayName,
          uid: user.uid,
          profileImage:
            user.photoURL !== null ? user.photoURL : sampleProfileImage,
        };
        store.commit('authStore/SET_USER', userData);
        if (router.history.current.path === '/login') {
          router.push('/');
        }
      }
    } else {
      // 로그인 하지 않은 경우 (로그아웃, 로그인 하지 않고 다른 링크 접속)
      if (
        router.history.current.path !== '/login' &&
        router.history.current.path !== '/signup'
      ) {
        store.commit('common/SET_LOADING', true);
        console.log('1 : 로그인 하지 않음');
        store.commit('authStore/CLEAR_USER');
        console.log('2 : CLEAR_USER');
        router.push('/login');
        console.log('3 : /login');
      }
      store.commit('common/SET_LOADING', false);
    }
  });
}
export { signupUser, loginUser, logoutUser, onAuthChange };

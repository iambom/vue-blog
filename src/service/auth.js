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
    })
    .catch(error => {
      store.commit('VALIDATE_INPUT', error.code);
    });
}

function loginUser(loginType, email, password) {
  if (loginType === 'btn-sign') {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => store.commit('VALIDATE_INPUT', 'nothing'))
      .catch(error => store.commit('VALIDATE_INPUT', error.code));
  } else {
    const authProvider = getProvider(loginType);
    firebaseAuth
      .signInWithPopup(authProvider)
      .then(result => {
        const userData = {
          username: result.additionalUserInfo.profile.name,
          uid: result.user.uid,
          profileImage: result.additionalUserInfo.profile.picture,
        };
        store.commit('SET_USER', userData);
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
  firebaseAuth.signOut();
}

function onAuthChange() {
  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      if (router.history.current.path === '/signup') {
        store.commit('SET_LOADING', true);
        firebaseAuth.signOut();
        store.commit('SET_LOADING', false);
        store.commit('VALIDATE_INPUT', 'nothing');
        router.push('/login');
      } else {
        // 로그인 된 경우
        const userData = {
          username: user.displayName,
          uid: user.uid,
          profileImage:
            user.photoURL !== null ? user.photoURL : sampleProfileImage,
        };
        store.commit('SET_USER', userData);
        if (router.history.current.path === '/login') {
          router.push('/');
        }
      }
    } else {
      // 로그인 하지 않은 경우
      if (router.history.current.path !== '/login') {
        store.commit('CLEAR_USER');
        router.push('/login');
      }
      store.commit('SET_LOADING', false);
    }
  });
}
export { signupUser, loginUser, logoutUser, onAuthChange };

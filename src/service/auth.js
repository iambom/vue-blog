import firebase from 'firebase';
import store from '@/store/index';
import router from '@/routes/index';

function loginUser() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const userData = {
        username: result.additionalUserInfo.profile.name,
        uid: result.user.uid,
        profileImage: result.additionalUserInfo.profile.picture,
      };
      store.commit('setUser', userData);
      router.push({
        path: 'main',
        name: 'AuthMain',
        params: {
          uid: result.user.uid,
        },
      });
      return result;
    })
    .catch(error => console.log('로그인 실패 ', error));
}

function logoutUser() {
  firebase.auth().signOut();
  store.commit('clearUser');
}

function onAuthChange() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // 로그인 된 경우
      const userData = {
        username: user.displayName,
        uid: user.uid,
        profileImage: user.photoURL,
      };
      store.commit('setUser', userData);
      if (router.currentRoute.path === '/login') {
        router.push('/main');
      }
    } else {
      // 로그인 하지 않은 경우
      if (router.currentRoute.path !== '/login') {
        router.push('/login');
      }
    }
  });
}
export { loginUser, logoutUser, onAuthChange };

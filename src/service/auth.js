import firebase from 'firebase';
import store from '@/store/index';
import router from '@/routes/index';

function loginUser() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      console.log('로그인 성공', result);
      console.log('UID', result.user.uid);
      store.commit('setUsername', result.additionalUserInfo.profile.name);
      store.commit(
        'setProfileImage',
        result.additionalUserInfo.profile.picture,
      );
      store.commit('setUid', result.user.uid);
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
  store.commit('clearUsername');
  store.commit('cleartProfileImage');
  store.commit('clearUid');
}

function onAuthChange() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      router.push({
        path: 'main',
        name: 'AuthMain',
        params: {
          uid: user.uid,
        },
      });
      store.commit('setUsername', user.displayName);
    }
  });
}
export { loginUser, logoutUser, onAuthChange };

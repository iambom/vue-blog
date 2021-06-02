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
      store.commit('setUsername', result.additionalUserInfo.profile.given_name);
      store.commit(
        'setProfileImage',
        result.additionalUserInfo.profile.picture,
      );

      router.push('/main');
      return result;
    })
    .catch(error => console.log('로그인 실패 ', error));
}

function logoutUser() {
  firebase.auth().signOut();
  store.commit('clearUsername');
}
export { loginUser, logoutUser };

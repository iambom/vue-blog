import { firebaseAuth, googleProvider } from '@/service/firebase';
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
      alert('회원 가입 완료!');
    })
    .catch(error => console.log(error));
}

function loginUser(event, email, password) {
  if (event.target.className === 'btn-sign') {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('로그인 성공'))
      .catch(error => console.log('Error!', error.message));
  } else {
    // const provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth
      .signInWithPopup(googleProvider)
      .then(result => {
        const userData = {
          username: result.additionalUserInfo.profile.name,
          uid: result.user.uid,
          profileImage: result.additionalUserInfo.profile.picture,
        };
        store.commit('SET_USER', userData);
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
}

function logoutUser() {
  firebaseAuth.signOut();
  store.commit('CLEAR_USER');
}

function onAuthChange() {
  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      if (router.history.current.path === '/signup') {
        store.commit('SET_LOADING', true);
        firebaseAuth.signOut();
        store.commit('SET_LOADING', false);
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
        console.log('2');
      }
    } else {
      // 로그인 하지 않은 경우
      if (router.history.current.path !== '/login') {
        router.push('/login');
      }
      store.commit('SET_LOADING', false);
    }
  });
}
export { signupUser, loginUser, logoutUser, onAuthChange };

<template>
  <div>
    <h1>Login</h1>
    <button v-on:click="login">Google 로그인</button>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          console.log('로그인 성공', result);
        })
        .catch(error => console.log('로그인 실패 ', error));
    },
  },
};
</script>

<style></style>

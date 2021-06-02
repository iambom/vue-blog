<template>
  <div>
    <h1>Login</h1>
    <button v-on:click="login">Google 로그인</button>
  </div>
</template>

<script>
import { loginUser, onAuthChange } from '@/service/auth';
export default {
  created() {
    onAuthChange();
    console.log('왜 자꾸');
  },
  methods: {
    login() {
      loginUser();
    },
  },
};
</script>

<style></style>

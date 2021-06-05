<template>
  <div>
    <h1>Login</h1>
    <button v-on:click="login">Google 로그인</button>
  </div>
</template>

<script>
import { loginUser } from '@/service/auth';
export default {
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    login() {
      loginUser();
    },
  },
};
</script>

<style></style>

<template>
  <div>
    <h1>Login</h1>
    <button v-on:click="login">Google 로그인</button>
  </div>
</template>

<script>
import { loginUser } from '@/service/auth';
export default {
  methods: {
    login() {
      loginUser();
    },
  },
};
</script>

<style></style>

<template>
  <div class="sign-form-wrapper">
    <div class="sign-form-container">
      <p class="main-text">로그인</p>
      <form class="form sign">
        <div>
          <label for="email">Email</label>
          <div class="input-wrap">
            <i class="far fa-envelope"></i>
            <input id="email" type="text" v-model="email" />
          </div>
        </div>
        <div>
          <label for="password">Password</label>
          <div class="input-wrap">
            <i class="fas fa-lock"></i>
            <input id="password" type="password" v-model="password" />
          </div>
        </div>
        <button class="btn-sign" type="submit">로그인</button>
      </form>
      <p class="text">또는, 다른 계정으로 로그인</p>
      <div class="btn-wrap">
        <button class="github">github 로그인</button>
        <button class="google" v-on:click="login">Google 로그인</button>
      </div>
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/service/auth';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
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

<template>
  <header v-if="isUserLogin">
    <span>profile</span>
    <button v-on:click="logout">Logout</button>
  </header>
</template>

<script>
import { logoutUser } from '@/service/auth';
export default {
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    logout() {
      logoutUser();
      this.$router.push('/login');
    },
  },
};
</script>

<style></style>

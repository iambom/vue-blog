<template>
  <header v-if="isUserLogin">
    <div class="img-wrap">
      <img :src="profileImage" alt="profile" />
      <button v-on:click="logout" class="btn-logout">Logout</button>
    </div>
    <div>
      <p class="username">
        안녕하세요! <span>{{ username }}</span
        >님
      </p>
      <div class="create-button-wrap">
        <router-link to="/add" class="create-button">
          <i class="fas fa-pen"><span>+</span></i>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { logoutUser } from '@/service/auth';
export default {
  data() {
    return {
      profileImage: this.$store.state.user.profileImage,
      username: this.$store.state.user.username,
    };
  },
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

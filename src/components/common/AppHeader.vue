<template>
  <header v-if="isUserLogin">
    <div class="img-wrap" @click="toggleButton">
      <img :src="profileImage" alt="profile" />
      <button
        @click="logout"
        class="btn-logout"
        :class="{ visible: visibleBtnLogout }"
      >
        로그아웃
      </button>
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
      visibleBtnLogout: false,
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
    toggleButton() {
      this.visibleBtnLogout
        ? (this.visibleBtnLogout = false)
        : (this.visibleBtnLogout = true);
    },
  },
};
</script>

<style></style>

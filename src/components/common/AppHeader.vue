<template>
  <header v-if="isUserLogin">
    <div class="user-info">
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
      <p class="username">
        안녕하세요! <span>{{ username }}</span
        >님
      </p>
    </div>
    <div class="create-button-wrap" v-if="showAddBtn">
      <router-link to="/add" class="create-button">
        <i class="fas fa-pen"><span>+</span></i>
      </router-link>
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
    showAddBtn() {
      return this.$store.state.showAddBtn;
    },
  },
  methods: {
    logout() {
      logoutUser();
      this.$store.commit('CLEAR_TAGS');
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

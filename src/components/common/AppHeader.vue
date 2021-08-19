<template>
  <header v-if="isUserLogin">
    <div class="user-info">
      <div class="img-wrap">
        <img :src="profileImage" alt="profile" @click="toggleButton" />
        <button
          @click="logout"
          class="btn-logout"
          :class="{ visible: visibleBtnLogout }"
        >
          <i class="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
      <p class="username">
        안녕하세요! <span>{{ username }}</span
        >님
      </p>
    </div>
    <div class="create-button-wrap" v-if="isAddBtn">
      <router-link to="/add" class="create-button">
        <i class="fas fa-pen"><span>+</span></i>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { logoutUser } from '@/service/auth';
export default {
  props: {
    routeName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visibleBtnLogout: false,
    };
  },
  computed: {
    ...mapState('authStore', {
      profileImage: state => state.user.profileImage,
      username: state => state.user.username,
    }),
    ...mapGetters('authStore', {
      isUserLogin: 'isLogin',
    }),
    isAddBtn() {
      return this.routeName !== 'AddPage';
    },
  },
  methods: {
    logout() {
      logoutUser();
      this.$store.commit('postStore/CLEAR_TAGS');
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

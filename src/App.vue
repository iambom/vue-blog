<template>
  <loading-spinner v-if="isLoading"></loading-spinner>
  <div id="wrap" v-else>
    <!-- <div class="app-contents"> -->
    <router-view></router-view>
    <!-- </div> -->
  </div>
</template>

<script>
import { onAuthChange } from '@/service/auth';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
export default {
  components: {
    LoadingSpinner,
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  watch: {
    isUserLogin(value) {
      if (value && value !== null) this.$store.commit('SET_LOADING', false);
    },
  },
  mounted() {
    this.$store.commit('SET_LOADING', true);
    onAuthChange(); // 새로고침 해도 로그인 인증 유지
  },
};
</script>
<style>
@import './css/reset.css';
@import './css/common.css';
</style>

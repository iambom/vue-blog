<template>
  <loading-spinner v-if="isLoading"></loading-spinner>
  <div id="wrap" v-else>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { onAuthChange } from '@/service/auth';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

export default {
  components: {
    LoadingSpinner,
  },
  computed: {
    ...mapGetters('authStore', {
      isUserLogin: 'isLogin',
    }),
    isLoading() {
      return this.$store.state.common.isLoading;
    },
  },
  watch: {
    isUserLogin(value) {
      if (value && value !== null)
        this.$store.commit('common/SET_LOADING', false);
    },
  },
  created() {
    this.$store.commit('common/SET_LOADING', true);
    onAuthChange(); // 새로고침 해도 로그인 인증 유지
  },
};
</script>
<style>
@import './css/reset.css';
@import './css/common.css';
</style>

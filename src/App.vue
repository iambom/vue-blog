<template>
  <div>
    <loading-spinner v-if="isLoading"></loading-spinner>

    <div class="app-contents" v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { onAuthChange } from '@/service/auth';
import LoadingSpinner from './components/common/LoadingSpinner.vue';
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
    console.log('1');
    this.$store.commit('SET_LOADING', true);
    onAuthChange();
  },
};
</script>
<style>
@import './css/reset.css';
@import './css/common.css';
</style>

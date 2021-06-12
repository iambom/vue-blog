<template>
  <div>
    <loading-spinner v-if="isLoading"></loading-spinner>

    <div class="app-contents" v-else>
      <app-header v-if="isUserLogin"></app-header>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthChange } from '@/service/auth';
import AppHeader from './components/common/AppHeader.vue';
import LoadingSpinner from './components/common/LoadingSpinner.vue';
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    AppHeader,
    LoadingSpinner,
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  watch: {
    isUserLogin(value) {
      if (value !== null) this.isLoading = false;
    },
  },
  mounted() {
    this.isLoading = true;
    onAuthChange();
  },
};
</script>
<style>
@import './css/reset.css';
@import './css/common.css';
</style>

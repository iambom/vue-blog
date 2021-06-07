<template>
  <div class="app-contents">
    <app-header v-if="isUserLogin"></app-header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { onAuthChange } from '@/service/auth';
import AppHeader from './components/common/AppHeader.vue';
export default {
  components: {
    AppHeader,
  },
  created() {
    onAuthChange();
    console.log(this.$store.state.user.profileImage);
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
};
</script>
<style>
@import './css/reset.css';
@import './css/common.css';
</style>

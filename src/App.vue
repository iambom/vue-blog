<template>
  <div>
    <app-header v-if="isUserLogin"></app-header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/common/AppHeader.vue';
export default {
  components: {
    AppHeader,
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
</style>

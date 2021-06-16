<template>
  <div>
    <loading-spinner v-if="isLoading"></loading-spinner>

    <div class="app-contents" v-else>
      <app-header v-if="isUserLogin"></app-header>
      <tags-list-page></tags-list-page>
      <div>
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthChange } from '@/service/auth';
import AppHeader from './components/common/AppHeader.vue';
import LoadingSpinner from './components/common/LoadingSpinner.vue';
import TagsListPage from './views/TagsListPage.vue';
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    AppHeader,
    LoadingSpinner,
    TagsListPage,
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

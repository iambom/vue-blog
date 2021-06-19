<template>
  <loading-spinner v-if="isLoading"></loading-spinner>

  <div v-else>
    <app-header v-if="isUserLogin"></app-header>
    <tags-list-page></tags-list-page>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import TagsListPage from '@/views/TagsListPage.vue';
export default {
  components: {
    AppHeader,
    LoadingSpinner,
    TagsListPage,
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
};
</script>

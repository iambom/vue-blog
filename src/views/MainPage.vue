<template>
  <loading-spinner v-if="isLoading"></loading-spinner>

  <div v-else>
    <app-header v-if="isUserLogin"></app-header>
    <router-link to="/" v-if="showGoHomeBtn" class="btn-go-home"
      ><i class="fas fa-long-arrow-alt-left"></i> Go home</router-link
    >
    <tags-list-page v-if="showTagList"></tags-list-page>
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
    showTagList() {
      return this.$store.state.showTaglist;
    },
    showGoHomeBtn() {
      return this.$store.state.showGoHomeBtn;
    },
  },
  watch: {
    isUserLogin(value) {
      if (value && value !== null) this.$store.commit('SET_LOADING', false);
    },
  },
};
</script>

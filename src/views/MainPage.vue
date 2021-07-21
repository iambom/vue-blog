<template>
  <div class="app-contents home">
    <div class="container">
      <loading-spinner v-if="isLoading"></loading-spinner>

      <template v-else>
        <app-header v-if="isUserLogin"></app-header>
        <router-link to="/" v-if="showGoHomeBtn" class="btn-go-home"
          ><i class="fas fa-long-arrow-alt-left"></i> Go home</router-link
        >
        <tags-list-page v-if="showTagList"></tags-list-page>
        <!-- 랜딩 시 호출되는 전체 리스트와 해쉬태그로 필터된 리스트의 동일한 컴포넌트 사용으로 :key 속성 부여-->
        <router-view :key="$route.fullPath"></router-view>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
    ...mapState({
      isLoading: state => state.isLoading,
      showTagList: state => state.showTaglist,
      showGoHomeBtn: state => state.showGoHomeBtn,
    }),
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  watch: {
    isUserLogin(value) {
      if (value && value !== null) this.$store.commit('SET_LOADING', false);
    },
  },
};
</script>

<template>
  <div>
    <ul class="list-container">
      <post-list-item
        v-for="postItem in postItems"
        :key="postItem.id"
        :postItem="postItem"
      ></post-list-item>
    </ul>
  </div>
</template>

<script>
import PostListItem from '../components/posts/PostListItem.vue';
import { syncData } from '@/service/repository';
export default {
  name: 'AuthMain',
  data() {
    return {
      postItems: [],
      isLoading: false,
    };
  },
  created() {
    // this.isLoading = true;
    const userId = this.$store.state.user.uid;
    syncData(userId, data => {
      console.log('syncDAta', data);
      this.$store.state.items = { ...data };
      this.postItems = this.$store.state.items;
    });
  },
  components: {
    PostListItem,
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
};
</script>

<style></style>

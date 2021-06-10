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
    const userId = this.$store.state.user.uid;
    syncData(userId, data => {
      let itemsArray = Object.values(data);
      this.postItems = itemsArray;
      this.$store.commit('setItems', this.postItems);
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

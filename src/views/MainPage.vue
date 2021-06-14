<template>
  <div>
    <ul class="tags-container">
      <tags-list-item
        v-for="(tag, index) in tags"
        :key="index"
        :tag="tag"
      ></tags-list-item>
    </ul>
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
import TagsListItem from '../components/TagsListItem.vue';
import { syncData } from '@/service/repository';
export default {
  name: 'AuthMain',
  data() {
    return {
      postItems: [],
      tags: this.$store.state.tags,
      isLoading: false,
    };
  },
  created() {
    this.$store.commit('clearPostItem');
    const userId = this.$store.state.user.uid;
    syncData(userId, data => {
      let itemsArray = Object.values(data);
      this.postItems = itemsArray;
      this.$store.commit('setItems', this.postItems);
    });
  },
  components: {
    PostListItem,
    TagsListItem,
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
};
</script>

<style></style>

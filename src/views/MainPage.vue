<template>
  <ul class="list-container">
    <post-list-item
      v-for="postItem in postItems"
      :key="postItem.id"
      :postItem="postItem"
    ></post-list-item>
  </ul>
</template>

<script>
import PostListItem from '../components/posts/PostListItem.vue';
export default {
  name: 'AuthMain',
  data() {
    return {
      postItems: [],
    };
  },
  created() {
    this.postItems = this.$store.state.items;
  },
  components: {
    PostListItem,
  },
};
</script>

<style></style>

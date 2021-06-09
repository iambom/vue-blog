<template>
  <div>
    <loading-spinner v-if="isLoading"></loading-spinner>
    <ul class="list-container" v-else>
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
import LoadingSpinner from '../components/common/LoadingSpinner.vue';
export default {
  name: 'AuthMain',
  data() {
    return {
      postItems: [],
      isLoading: false,
    };
  },
  created() {
    this.isLoading = true;
    this.postItems = this.$store.state.items;
    this.isLoading = false;
  },
  components: {
    PostListItem,
    LoadingSpinner,
  },
};
</script>

<style></style>

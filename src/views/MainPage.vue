<template>
  <div>
    <h2>Main Page</h2>
    <ul class="list-container">
      <post-list-item
        v-for="postItem in postItems"
        :key="postItem.id"
        :postItem="postItem"
      ></post-list-item>
    </ul>
    <router-link to="/add" class="create-button">
      <i class="fas fa-plus"></i
    ></router-link>
  </div>
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
    console.log(this.postItems);
  },
  components: {
    PostListItem,
  },
};
</script>

<style></style>

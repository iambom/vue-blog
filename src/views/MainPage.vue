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
  mounted() {
    this.$store.commit('CLEAR_POSTITEM');
    const userId = this.$store.state.user.uid;

    if (this.$route.name === 'hashtag') {
      this.postItems = this.$store.state.filteredTag;
    } else {
      syncData(userId, data => {
        let itemsArray = Object.values(data);
        this.postItems = itemsArray;
        this.getHashtags(this.postItems);

        this.$store.commit('SET_ITEMS', this.postItems);
      });
    }
  },
  components: {
    PostListItem,
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    getHashtags(postItems) {
      postItems.map(item => {
        item.contents.split(/(#[^\s]+)/g).map(value => {
          if (value.match(/#[^\s]+/)) {
            this.$store.commit('SET_TAGS', value);
          }
        });
      });
    },
  },
};
</script>

<style></style>

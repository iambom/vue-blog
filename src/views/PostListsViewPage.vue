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
import PostListItem from '@/components/posts/PostListItem.vue';
import { syncData } from '@/service/repository';
export default {
  name: 'AuthMain',
  data() {
    return {
      postItems: [],
    };
  },
  mounted() {
    this.$store.commit('CLEAR_POSTITEM');
    const userId = this.$store.state.user.uid;
    console.log('3');

    syncData(userId, data => {
      let itemsArray = Object.values(data);
      this.postItems = itemsArray;
      this.getHashtags(this.postItems);

      if (this.$route.name === 'Hashtag') {
        this.postItems = this.postItems.filter(item => {
          return item.contents.includes(`#${this.$route.params.word}`);
        });
      }

      if (this.postItems.length === 0) this.$router.push('/');
    });

    this.$store.commit('SET_LOADING', false);
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

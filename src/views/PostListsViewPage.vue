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
  components: {
    PostListItem,
  },
  data() {
    return {
      postItems: [],
    };
  },
  created() {
    this.$store.commit('postStore/CLEAR_POSTITEM');
    const userId = this.$store.state.authStore.user.uid;

    // 랜딩 시 파이어베이스 DB에 저장되어 있는 데이터 불러와서 state에 저장
    syncData(userId, data => {
      let itemsArray = Object.values(data);
      this.postItems = itemsArray;
      this.getHashtags(this.postItems);
      this.$store.commit('postStore/SET_ITEMS', this.postItems);

      // 해시태그 클릭 시 리스트에서 해당 해시태그 있는 리스트들 찾고 state의 list에 저장
      if (this.$route.name === 'Hashtag') {
        this.postItems = this.postItems.filter(item => {
          return item.contents.includes(`#${this.$route.params.word}`);
        });
      }

      if (this.postItems.length === 0) this.$router.push('/');
    });

    this.$store.commit('common/SET_LOADING', false);
  },
  methods: {
    getHashtags(postItems) {
      postItems.map(item => {
        item.contents.split(/(#[^\s]+)/g).map(value => {
          if (value.match(/#[^\s]+/)) {
            this.$store.commit('postStore/SET_TAGS', value);
          }
        });
      });
    },
  },
};
</script>

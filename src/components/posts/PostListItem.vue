<template>
  <li>
    <router-link :to="`/post/${postItem.id}`">
      <div class="user-info">
        <div class="img-wrap">
          <img src="@/assets/mask.jpg" alt="사용자 프로필 이미지" />
        </div>
        <div class="txt-wrap">
          <span>{{ postItem.name }}</span>
          <span class="publishedAt">{{ postItem.publishedAt }}</span>
        </div>
      </div>
      <p class="title">{{ postItem.title }}</p>
      <p class="contents">{{ postItem.contents }}</p>
      <div class="btn-wrap">
        <button class="btn-edit" @click="editItem">
          <i class="far fa-edit"></i>
        </button>
        <button class="btn-delete" @click="deleteItem">
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    postItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    editItem() {
      const id = this.postItem.id;
      this.$router.push({
        path: `/post/${id}`,
        params: {
          mode: 'modified',
        },
        name: 'PostPage',
      });
    },
    deleteItem() {
      if (confirm('삭제하시겠습니까?')) {
        this.$store.commit('deleteItem', this.postItem);
      }
    },
  },
};
</script>

<style></style>

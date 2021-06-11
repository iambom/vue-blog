<template>
  <li>
    <router-link :to="`/post/${postItem.id}`">
      <div class="txt-wrap">
        <div class="user-info">
          <div>
            <img src="@/assets/mask.jpg" alt="사용자 프로필 이미지" />
          </div>
          <div>
            <span>{{ postItem.name }}</span>
            <span class="publishedAt">{{ postItem.publishedAt }}</span>
          </div>
        </div>
        <p class="title">{{ postItem.title }}</p>
        <p class="contents">{{ postItem.contents }}</p>
      </div>
      <div class="img-wrap" v-if="isThumbnail">
        <img
          :src="postItem.imageFileInfo.fileUrl"
          :alt="postItem.imageFileInfo.fileName"
        />
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
  data() {
    return {
      thumbnail: '',
    };
  },
  computed: {
    isThumbnail() {
      return this.postItem.imageFileInfo;
    },
  },
};
</script>

<style></style>

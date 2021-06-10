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
      <div class="img-wrap">
        <img src="@/assets/mask.jpg" alt="업로드 이미지" />
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
};
</script>

<style></style>

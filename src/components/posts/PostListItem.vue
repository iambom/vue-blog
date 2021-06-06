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

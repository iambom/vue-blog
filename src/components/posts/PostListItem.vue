<template>
  <li>
    <router-link :to="`/post/${postItem.id}`">
      <div class="txt-wrap">
        <div class="user-info">
          <div>
            <img :src="profileImage" alt="사용자 프로필 이미지" />
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
import { mapState } from 'vuex';
export default {
  props: {
    postItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('authStore', {
      profileImage: state => state.user.profileImage,
    }),
    // 포스트 생성 시 등록한 이미지 파일 유무에 따른 썸네일 추가
    isThumbnail() {
      return this.postItem.imageFileInfo;
    },
  },
};
</script>

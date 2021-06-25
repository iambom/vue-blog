<template>
  <div>
    <loading-spinner v-if="isLoading"></loading-spinner>
    <template v-else>
      <div class="read-container" v-if="readMode">
        <p class="title">{{ title }}</p>
        <div class="contents-wrap">
          <div class="img-wrap" v-if="isImageFile">
            <img :src="thumbnail" :alt="thumbnailAltText" />
          </div>
          <div class="txt-wrap">
            <template v-for="(text, index) in contentsArray()">
              <router-link
                v-if="text.startsWith('#')"
                :key="index"
                :to="`/hashtag/${text.slice(1)}`"
                >{{ text }}</router-link
              >
              <template v-else>{{ text }}</template>
            </template>
          </div>
        </div>

        <div class="btn-wrap">
          <button class="btn-edit" @click="editItem">
            <i class="far fa-edit"></i>
          </button>
          <button class="btn-delete" @click="deleteItem">
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <post-edit-form v-else></post-edit-form>
    </template>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import PostEditForm from '@/components/posts/PostEditForm';
export default {
  name: 'PostReadPage',
  components: {
    PostEditForm,
    LoadingSpinner,
  },
  data() {
    return {
      title: '',
      contents: '',
      thumbnail: '',
      thumbnailAltText: '',
      hashtags: [],
      mode: 'read',
      isImageFile: false,
    };
  },
  computed: {
    readMode() {
      return this.mode === 'read';
    },
    getData() {
      return this.$store.getters.getReadData;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  // 데이터 불러 오는 것보다 화면 렌더링이 먼저 일어나서 사용
  watch: {
    getData(setItem) {
      if (setItem) {
        const postItem = this.$store.state.postItem;
        this.title = postItem.title;
        this.contents = postItem.contents;

        if (!postItem.imageFileInfo) {
          this.isImageFile = false;
        } else {
          this.thumbnail = postItem.imageFileInfo.fileUrl;
          this.thumbnailAltText = postItem.imageFileInfo.fileName;
          this.isImageFile = true;
        }
      }
    },
  },
  created() {
    const id = this.$route.params.id;
    this.$store.commit('GET_POSTITEM', id);
  },
  methods: {
    // 해시태그(#) 클릭 하면 링크 이동 하기 위한 필터링
    contentsArray() {
      return this.contents.split(/(#[^\s]+)/g).map(value => {
        if (value.match(/#[^\s]+/)) {
          return value;
        }
        return value;
      });
    },
    editItem() {
      this.mode = 'edit';
    },
    deleteItem() {
      if (confirm('삭제하시겠습니까?')) {
        const id = this.$route.params.id;
        console.log(id);
        this.$store.commit('DELETE_ITEM', id);
        this.$router.push('/');
      }
    },
  },
};
</script>

<style></style>

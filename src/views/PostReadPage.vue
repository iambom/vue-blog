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
          <div>{{ contents }}</div>
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
      mode: 'read',
      isLoading: false,
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
  },
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

        this.isLoading = false;
      }
    },
  },
  created() {
    const id = this.$route.params.id;
    this.$store.commit('getPostItem', id);

    this.isLoading = true;
  },
  methods: {
    editItem() {
      this.mode = 'edit';
    },
    deleteItem() {
      if (confirm('삭제하시겠습니까?')) {
        const id = this.$route.params.id;
        this.$store.commit('deleteItem', id);
        this.$router.push('/main');
      }
    },
  },
};
</script>

<style></style>

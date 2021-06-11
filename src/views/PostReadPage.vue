<template>
  <div class="read-container" v-if="readMode">
    <p class="title">{{ title }}</p>
    <div class="contents-wrap">
      <div class="img-wrap">
        <img :src="this.thumbnail" :alt="this.thumbnailAltText" />
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

<script>
import PostEditForm from '@/components/posts/PostEditForm';
export default {
  name: 'PostReadPage',
  data() {
    return {
      title: '',
      contents: '',
      thumbnail: '',
      thumbnailAltText: '',
      mode: 'read',
    };
  },
  computed: {
    readMode() {
      return this.mode === 'read';
    },
  },
  components: {
    PostEditForm,
  },
  created() {
    const id = this.$route.params.id;
    console.log('1 ', id);
    this.$store.commit('getPostItem', id);
    const { title, contents } = this.$store.state.postItem;
    console.log('3 ', title, contents);
    if (this.$store.state.postItem.imageFileInfo) {
      const { fileName, fileUrl } = this.$store.state.postItem.imageFileInfo;
      this.thumbnail = fileUrl;
      this.thumbnailAltText = fileName;
    } else {
      return;
    }
    this.title = title;
    this.contents = contents;
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

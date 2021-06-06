<template>
  <div class="post-container">
    <post-read-page v-if="readMode"></post-read-page>
    <post-edit-form v-else></post-edit-form>
  </div>
</template>

<script>
import PostEditForm from '@/components/posts/PostEditForm';
import PostReadPage from '@/views/PostReadPage.vue';

export default {
  name: 'PostPage',
  components: {
    PostEditForm,
    PostReadPage,
  },
  props: {
    mode: {
      type: String,
      default: 'read',
    },
  },
  computed: {
    readMode() {
      return this.mode === 'read';
    },
  },
};
</script>

<style></style>

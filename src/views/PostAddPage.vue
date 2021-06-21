<template>
  <post-add-form></post-add-form>
</template>

<script>
import PostAddForm from '../components/posts/PostAddForm.vue';
export default {
  components: {
    PostAddForm,
  },
  created() {
    console.log('add page');
  },
};
</script>

<style></style>

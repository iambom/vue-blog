<template>
  <div class="read-container">
    <p class="title">{{ title }}</p>
    <div class="contents">{{ contents }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      contents: '',
    };
  },
  created() {
    const id = this.$route.params.id;
    this.$store.commit('getPostItem', id);
    const { title, contents } = this.$store.state.postItem;
    this.title = title;
    this.contents = contents;
  },
};
</script>

<style></style>

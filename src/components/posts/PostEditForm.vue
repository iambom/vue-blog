<template>
  <div class="form-wrapper">
    <h1>Edit Post</h1>
    <form class="form" @submit.prevent="submitForm">
      <div>
        <label for="title"></label>
        <input id="title" type="text" placeholder="제목" v-model="title" />
      </div>
      <div>
        <label for="contents"> </label>
        <textarea
          id="contents"
          type="text"
          placeholder="내용을 입력하세요"
          v-model="contents"
        />
      </div>
      <button type="submit" class="btn">Edit</button>
    </form>
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
  methods: {
    submitForm() {
      const id = this.$route.params.id;
      if (this.title && this.contents !== '') {
        const date = new Date();
        const publishedAt = `${date.getFullYear()}. ${
          date.getMonth() + 1
        }. ${date.getDate()}`;
        const editItem = {
          id: this.$store.state.postItem.id,
          title: this.title,
          contents: this.contents,
          name: this.$store.state.postItem.name,
          publishedAt,
        };
        this.$store.commit('saveEditItem', { editItem, id });
        this.$router.push('/main');
      }
    },
  },
};
</script>

<style></style>

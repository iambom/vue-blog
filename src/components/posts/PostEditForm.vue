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
    this.$store.commit('getEditItem', id);
    this.title = this.$store.state.editItem.title;
    this.contents = this.$store.state.editItem.contents;
  },
  methods: {
    submitForm() {
      console.log(this.$store.state.editItem);
      const id = this.$route.params.id;
      if (this.title && this.contents !== '') {
        const date = new Date();
        const publishedAt = `${date.getFullYear()}. ${
          date.getMonth() + 1
        }. ${date.getDate()}`;
        const editItem = {
          id: this.$store.state.editItem.id,
          title: this.title,
          contents: this.contents,
          name: this.$store.state.editItem.name,
          publishedAt,
        };
        console.log('수정 ', editItem);
        this.$store.commit('saveEditItem', { editItem, id });
        this.$router.push('/main');
      }
    },
  },
};
</script>

<style></style>

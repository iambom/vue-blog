<template>
  <div class="form-wrapper">
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
      <button type="submit" class="btn">create</button>
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
  methods: {
    submitForm() {
      if (this.title && this.contents !== '') {
        const date = new Date();
        const publishedAt = `${date.getFullYear()}. ${
          date.getMonth() + 1
        }. ${date.getDate()}`;
        const id = `${date.getFullYear()}${
          date.getMonth() + 1
        }${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

        const newItem = {
          id,
          title: this.title,
          contents: this.contents,
          name: this.$store.state.user.username,
          publishedAt,
        };
        this.$store.commit('addPostItem', newItem);
        this.$router.push('/main');
      }
    },
  },
};
</script>

<style></style>

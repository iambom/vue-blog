<template>
  <div class="form-wrapper">
    <form class="form" @submit.prevent="submitForm">
      <div>
        <label for="title"></label>
        <input id="title" type="text" placeholder="제목" v-model="title" />
      </div>
      <div class="contents-wrap">
        <label for="contents"> </label>
        <textarea
          id="contents"
          type="text"
          placeholder="내용을 입력하세요"
          v-model="contents"
        />
      </div>
      <div class="image-file-wrap">
        <button class="btn-add-image" @click.prevent="selectImageFile">
          <i class="fas fa-camera"></i>
        </button>
        <input
          ref="imageFileInput"
          type="file"
          accept="image/*"
          name="file"
          @change="onFileChange"
        />
        <span class="file-name"
          >{{ this.imageFileInfo.fileName }}.{{
            this.imageFileInfo.format
          }}</span
        >
      </div>
      <button type="submit" class="btn">create</button>
    </form>
  </div>
</template>

<script>
import { imageUpload } from '@/service/imageUploader';
export default {
  data() {
    return {
      title: '',
      contents: '',
      imageFileInfo: '',
    };
  },
  methods: {
    selectImageFile() {
      this.$refs.imageFileInput.click();
    },
    async onFileChange(event) {
      // console.log(event.target.files[0]);
      const uploaded = await imageUpload(event.target.files[0]);
      console.log(uploaded);
      const { original_filename, format, url, width, height } = uploaded;
      const imageFileInfo = {
        fileName: original_filename,
        fileUrl: url,
        format,
        width,
        height,
      };
      this.imageFileInfo = imageFileInfo;
      this.$store.commit('setImageFileName', this.imageFileInfo.fileName);
    },
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
          imageFileInfo: this.imageFileInfo,
        };
        // console.log(newItem);
        this.$store.commit('addPostItem', newItem);
        this.$router.push('/main');
      }
    },
  },
};
</script>

<style></style>

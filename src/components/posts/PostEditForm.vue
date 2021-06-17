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
        <span class="file-name" v-if="isImageFile"
          >{{ imageFileInfo.fileName }}.{{ imageFileInfo.format }}</span
        >
      </div>
      <button type="submit" class="btn">Edit</button>
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
      isImageFile: false,
    };
  },
  created() {
    const id = this.$route.params.id;
    this.$store.commit('GET_POSTITEM', id);
    const postItem = this.$store.state.postItem;
    const { title, contents } = postItem;
    this.title = title;
    this.contents = contents;

    if (!postItem.imageFileInfo) {
      this.isImageFile = false;
    } else {
      this.imageFileInfo = postItem.imageFileInfo;
      this.isImageFile = true;
    }
  },
  methods: {
    selectImageFile() {
      this.$refs.imageFileInput.click();
    },
    async onFileChange(event) {
      const uploaded = await imageUpload(event.target.files[0]);
      console.log(uploaded);
      this.isImageFile = true;
      const { original_filename, format, url, width, height } = uploaded;
      const imageFileInfo = {
        fileName: original_filename,
        fileUrl: url,
        format,
        width,
        height,
      };
      this.imageFileInfo = imageFileInfo;
      this.$store.commit('SET_IMAGE_FILE_NAME', this.imageFileInfo.fileName);
    },
    submitForm() {
      console.log(this.imageFileInfo);
      if (this.title && this.contents !== '') {
        const { id, name, publishedAt } = this.$store.state.postItem;
        const editItem = {
          id: id,
          title: this.title,
          contents: this.contents,
          name: name,
          publishedAt: publishedAt,
          imageFileInfo: this.imageFileInfo,
        };
        // console.log(editItem);
        this.$store.commit('SAVE_EDITITEM', { editItem, id });
        this.$router.push('/main');
      }
    },
  },
};
</script>

<style></style>

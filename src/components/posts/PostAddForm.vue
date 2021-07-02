<template>
  <div class="form-wrapper">
    <form class="form post" @submit.prevent="submitForm">
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
          >{{ imageFileInfo.fileName }}.{{ imageFileInfo.format }}</span
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
    // input 태그에 ref를 만들어 button을 클릭하면 숨긴 input에 접근 가능
    selectImageFile() {
      this.$refs.imageFileInput.click();
    },
    async onFileChange(event) {
      const uploaded = await imageUpload(event.target.files[0]);
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
    // 해쉬태그(#) 구별하여 저장
    convertToHashTag() {
      this.contents.split(/(#[^\s]+)/g).map(value => {
        if (value.match(/#[^\s]+/)) {
          this.$store.commit('SET_TAGS', value);
        }
      });
    },
    submitForm() {
      if (this.title && this.contents !== '') {
        this.convertToHashTag();

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

        this.$store.commit('ADD_POSTITEM', newItem);
        this.$router.push('/');
      }
    },
  },
};
</script>

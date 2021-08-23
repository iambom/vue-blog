<template>
  <div class="form-wrapper">
    <form class="form post" @submit.prevent="submitForm">
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
import { mapState } from 'vuex';
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
  computed: {
    ...mapState('postStore', {
      postItem: state => state.postItem,
    }),
  },
  created() {
    // edit 페이지 로드 후 포스트의 고유 id를 이용해 저장 되어 있던 컨텐츠 불러오기
    const id = this.$route.params.id;
    this.$store.commit('postStore/GET_POSTITEM', id);
    const postItem = this.postItem;
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
      this.$store.commit(
        'postStore/SET_IMAGE_FILE_NAME',
        this.imageFileInfo.fileName,
      );
    },
    // 해쉬태그(#) 구별하여 저장
    convertToHashTag() {
      this.contents.split(/(#[^\s]+)/g).map(value => {
        if (value.match(/#[^\s]+/)) {
          this.$store.commit('postStore/SET_TAGS', value);
        }
      });
    },
    submitForm() {
      // 포스트의 id, 작성자, 최초 게시날짜는 그대로 두고 수정한 부분만 다시 저장
      if (this.title && this.contents !== '') {
        const { id, name, publishedAt } = this.postItem;
        const editItem = {
          id,
          title: this.title,
          contents: this.contents,
          name,
          publishedAt,
          imageFileInfo: this.imageFileInfo,
        };
        this.$store.commit('postStore/CLEAR_TAGS');
        this.$store.commit('postStore/SAVE_EDITITEM', { editItem, id });
        this.convertToHashTag();
        this.$router.push('/');
      }
    },
  },
};
</script>

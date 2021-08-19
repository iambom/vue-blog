<template>
  <div class="app-contents">
    <div class="sign-form-container">
      <p class="main-text">회원가입</p>
      <form class="form sign">
        <div>
          <label for="email">Email</label>
          <div class="input-wrap">
            <i class="far fa-envelope"></i>
            <input id="email" type="text" v-model="email" @focus="focusInput" />
          </div>
          <p v-if="isEmailValid" class="validation-text warning">
            {{ isEmailValid }}
          </p>
        </div>
        <div>
          <label for="password">Password</label>
          <div class="input-wrap">
            <i class="fas fa-lock"></i>
            <input
              id="password"
              type="password"
              v-model="password"
              @focus="focusInput"
            />
          </div>
          <p v-if="isPasswordValid" class="validation-text warning">
            {{ isPasswordValid }}
          </p>
        </div>
        <div>
          <label for="nickname">Nickname</label>
          <div class="input-wrap">
            <i class="far fa-user"></i>
            <input id="nickname" type="text" v-model="nickname" />
          </div>
        </div>
        <button class="btn-sign" type="submit" @click.prevent="signup">
          가입하기
        </button>
      </form>
    </div>

    <Modal v-if="showModal" @close="showModal = false">
      <div slot="body">회원가입 완료</div>
      <div slot="footer">
        <button class="btn-cancel" @click="modalCheck">확인</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { signupUser } from '@/service/auth';
import Modal from '@/components/common/Modal.vue';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      email: '',
      password: '',
      nickname: '',
    };
  },
  computed: {
    ...mapGetters('authStore', ['isEmailValid', 'isPasswordValid']),
    showModal() {
      return this.$store.state.common.showModal;
    },
  },
  methods: {
    signup() {
      signupUser(this.email, this.password, this.nickname);
    },
    focusInput(event) {
      if (this.isEmailValid || this.isPasswordValid) {
        this.$store.commit('authStore/CLEAR_INPUT', event.target.id);
      }
    },
    modalCheck() {
      this.$store.commit('common/SHOW_MODAL', false);
      this.$router.push('/login');
    },
  },
};
</script>
<style scoped>
.app-contents .modal-container {
  text-align: center;
}
</style>

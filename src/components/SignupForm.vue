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
  </div>
</template>

<script>
import { signupUser } from '@/service/auth';
export default {
  data() {
    return {
      email: '',
      password: '',
      nickname: '',
    };
  },
  computed: {
    isEmailValid() {
      return this.$store.state.emailValidText;
    },
    isPasswordValid() {
      return this.$store.state.passwordValidText;
    },
  },
  methods: {
    signup() {
      signupUser(this.email, this.password, this.nickname);
    },
    focusInput(event) {
      if (this.isEmailValid || this.isPasswordValid) {
        this.$store.commit('CLEAR_INPUT', event.target.id);
      }
    },
  },
};
</script>
<style scoped>
.app-contents .modal-container {
  text-align: center;
}
</style>

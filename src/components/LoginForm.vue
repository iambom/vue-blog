<template>
  <div class="app-contents">
    <div class="sign-form-container">
      <p class="main-text">로그인</p>
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
        <button class="btn-sign" type="submit" @click.prevent="login">
          로그인
        </button>
      </form>
      <p class="text">또는, 다른 계정으로 로그인</p>
      <div class="btn-wrap">
        <button class="facebook" @click="login">github 로그인</button>
        <button class="google" @click="login">Google 로그인</button>
      </div>
      <div class="sign-up-wrap">
        <span>아직 계정이 없으신가요? </span>
        <router-link to="/signup">계정 만들기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/service/auth';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters('authStore', ['isLogin', 'isEmailValid', 'isPasswordValid']),
  },
  methods: {
    login(event) {
      const loginType = event.target.className;
      loginUser(loginType, this.email, this.password);
    },
    focusInput(event) {
      if (this.isEmailValid || this.isPasswordValid) {
        this.$store.commit('authStore/CLEAR_INPUT', event.target.id);
      }
    },
  },
};
</script>

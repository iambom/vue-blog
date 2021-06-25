<template>
  <div class="app-contents">
    <div class="sign-form-container">
      <p class="main-text">회원가입</p>
      <form class="form sign">
        <div>
          <label for="email">Email</label>
          <div class="input-wrap">
            <i class="far fa-envelope"></i>
            <input id="email" type="text" v-model="email" />
          </div>
        </div>
        <div>
          <label for="password">Password</label>
          <div class="input-wrap">
            <i class="fas fa-lock"></i>
            <input id="password" type="password" v-model="password" />
          </div>
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
  methods: {
    signup() {
      signupUser(this.email, this.password, this.nickname);
    },
  },
};
</script>

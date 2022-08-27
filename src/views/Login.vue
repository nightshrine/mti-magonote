<template>
  <div>
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui teal image header">
          <div class="content">
            Log-in to your account
          </div>
        </h2>
        <form class="ui large form" @submit.prevent="submit">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="envelope outline icon"></i>
                <input type="text" name="email" placeholder="E-mail address" v-model="user.email">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" v-model="user.password">
              </div>
            </div>
            <button class="ui fluid large teal submit button" type="submit">Login</button>
          </div>

          <div class="ui error message"></div>

        </form>

        <div class="ui message">
          New to us? <a @click=toSignup()>Sign Up</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js';
import axios from "axios";

export default {
  name: 'Login',
  components: {
    // 読み込んだコンポーネント名をここに記述する
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      user: {
        email: '',
        password: ''
      },
      err: null
    };
  },
  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },
  methods: {
    // Vue.jsで使う関数はここで記述する
    submit() {
      if (!this.user.email) {
        this.err = 'メールアドレスを入力してください';
      }
      else if (!this.user.password) {
        this.err = 'パスワードを入力してください';
      }
      const requestBody = {
        email: this.user.email,
        password: this.user.password,
      }
      console.log(requestBody);
      axios.post(baseUrl + "/login", requestBody)
        .then((response) => {
          // 成功したときの処理はここに記述する
          window.localStorage.setItem('token', response.data.token);
          window.localStorage.setItem('name', this.user.name);
          console.log(window.localStorage.getItem('token'))
          this.$router.push({ name: 'Home' });
        })
        .catch(() => {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
          this.err = '予期せぬエラーが発生しました';
        });
      return;
    },
    toSignup() {
      this.$router.push({ name: 'Signup' });
    }
  },
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
/* ここに記述する */

.column {
  max-width: 400px;
  display: inline-block;
  vertical-align: middle;
  margin-top: 200px;
}

a{
  color: #4183c4;
  cursor: pointer;
}

.image {
  margin-top: -100px;
}
</style>
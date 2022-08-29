<template>
  <div class="login-body">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <form class="ui large form" @submit.prevent="submit">
          <div class="ui stacked segment">
            <h2 class="ui teal image header">
              <div class="content">
                <img src ="../../public/magonote-logo.svg" alt="SVG"/>
              </div>
            </h2>
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="id" placeholder="id" v-model="user.id">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="name" placeholder="ユーザー名" v-model="user.name">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="パスワード" v-model="user.password">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="confirm_password" placeholder="パスワードの確認" v-model="user.confirm_password">
              </div>
            </div>
            <button class="ui fluid large submit button" type="submit">新規登録</button>
          </div>

          <div class="ui error message"></div>

        </form>

        <div class="ui message">
          既にアカウントをお持ちですか? <a @click="toLogin()">ログイン</a>
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
  name: 'SignUp',
  components: {
    // 読み込んだコンポーネント名をここに記述する
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      user: {
        id: '',
        name: '',
        password: '',
        confirm_password: ''
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
      if (!this.user.id) {
        this.err = "idを入力してください";
      } else if (!this.user.name) {
        this.err = "名前を入力してください";
      } else if (!this.user.password) {
        this.err = "パスワードを入力してください";
      } else if (this.user.password !== this.user.confirm_password) {
        this.err = "パスワードが一致しません";
      } else {
        const requestBody = {
          id : this.user.id,
          name : this.user.name,
          password : this.user.password,
        }
        axios.post(baseUrl + "/signup", requestBody)
          .then((response) => {
            window.localStorage.setItem('id', response.data.id);
            window.localStorage.setItem('name', response.data.name);
            this.$router.push({ name: 'Home' });
          })
          .catch(() => {
            this.err = "予期せぬエラーが発生しました";
          }
          );
      }
    },
    toLogin() {
      this.$router.push({ name: 'Login' });
    }
  },
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
/* ここに記述する */

.login-body {
  background-color: #3CB371;
  height: 100vh;
}

.button {
  background-color: #3CB371;
  box-shadow: 0 0 0 0 rgb(34 36 38 / 15%) inset;
  color: #FFF;
  text-shadow: none;
  background-image: none;
}

.button:hover {
  background-color: #33a667;
  color: #FFF;
  text-shadow: none;
}

.button:focus {
  background-color: #289f5e;
  color: #FFF;
  text-shadow: none;
}

.column {
  max-width: 400px;
  display: inline-block;
  vertical-align: middle;
  margin-top: 50px;
}

a {
  color: #4183c4;
  cursor: pointer;
}


.image {
  margin-top: -100px;
}
</style>
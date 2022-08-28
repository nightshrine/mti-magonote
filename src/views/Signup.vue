<template>
  <div>
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui teal image header">
          <div class="content">
            Sign-up to our service
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
                <i class="user icon"></i>
                <input type="text" name="name" placeholder="username" v-model="user.name">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" v-model="user.password">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="confirm_password" placeholder="Confirm Password" v-model="user.confirm_password">
              </div>
            </div>
            <button class="ui fluid large teal submit button" type="submit">Sign Up</button>
          </div>

          <div class="ui error message"></div>

        </form>

        <div class="ui message">
          Already have an account? <a @click="toLogin()">Login</a>
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
        email: '',
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
      if (!this.user.nickname) {
        this.err = "ニックネームを入力してください";
      } else if (!this.user.age) {
        this.err = "年齢を入力してください";
      }

      const requestBody = {
        email : this.user.email,
        name : this.user.name,
        password : this.user.password,
      }
      axios.post(baseUrl + "/signup", requestBody)
        .then((response) => {
          window.localStorage.setItem('token', response.data.token);
          window.localStorage.setItem('name', response.data.name);
          console.log(window.localStorage.getItem('token'))
          this.$router.push({ name: 'Home' });
          console.log(response.data);
        })
        .catch(() => {
          this.err = "予期せぬエラーが発生しました";
        }
        );
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

.column {
  max-width: 400px;
  display: inline-block;
  vertical-align: middle;
  margin-top: 200px;
}

a {
  color: #4183c4;
  cursor: pointer;
}


.image {
  margin-top: -100px;
}
</style>
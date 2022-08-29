<template>
  <div>
    <Menu></Menu>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <form class="ui form" @submit.prevent="userUpdate">
          <div class="field">
            <div class="inline fields">
              <label style="white-space: nowrap;">ユーザー名</label>
              <input type="text" v-model="user.name" />
            </div>
          </div>
          <div class="field">
            <div class="inline fields">
              <label style="white-space: nowrap;">パスワード</label>
              <input type="password" v-model="user.password" />
            </div>
          </div>
          <div class="field">
            <div class="inline fields">
              <label style="white-space: nowrap;">身長</label>
              <input type="text" v-model="user.height" />
            </div>
          </div>
          <div class="field">
            <div class="inline fields">
              <label style="white-space: nowrap;">体重</label>
              <input type="text" v-model="user.weight" />
            </div>
          </div>
          <div class="field">
            <div class="inline fields">
              <label style="white-space: nowrap;">level</label>
              <input type="text" v-model="user.level" />
            </div>
          </div>
          <button class="ui button" type="submit" style="width: 100%">更新</button>
        </form>
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
import Menu from '@/components/Menu.vue'

export default {
  name: 'Mypage',
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      user: {
        id: '',
        name: '',
        password: '',
        height: '',
        weight: '',
        level: null,
      },
      err: null
    };
  },
  components: {
    Menu
  },
  methods: {
    userUpdate() {
      if (!this.user.name) {
        this.err = "ユーザー名を入力してください";
        return;
      } else if (!this.user.password) {
        this.err = "パスワードを入力してください";
        return;
      }
      const requestBody = {
        id: this.user.id,
        name: this.user.name,
        password: this.user.password,
        height: this.user.height,
        weight: this.user.weight,
        level: this.user.level,
      };
      axios.put(baseUrl + "/user", requestBody)
        .then(() => {
          this.$router.push({name: "Home"});
        }).catch(err => {
          console.log(err);
        }
      );
    }
  },
  created() {
    if (!window.localStorage.getItem("id")) {
      this.$router.push({ name: "Login" });
    }
    this.user.id = localStorage.getItem('id');
    this.user.name = localStorage.getItem('name');
    axios.get(baseUrl + "/user" + "?id=" + this.user.id)
      .then(res => {
        this.user.id = res.data.id;
        this.user.name = res.data.name;
        this.user.password = res.data.password;
        this.user.height = res.data.height;
        this.user.weight = res.data.weight;
        this.user.level = res.data.level;
      })
      .catch(err => {
        console.log(err);
      })
  }
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
</style>
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
          <button class="ui button" type="submit" style="width: 100%; background-color:black; color: white">更新</button>
        </form>
      </div>
      <div class="ui segment">
        <form class="ui form" @submit.prevent="postRecords">
          <div class="field">
            <div class="inline fields">
              <label style="white-space: nowrap;">活動記録</label>
              <textarea v-model="text" style="height: 100px"></textarea>
            </div>
          </div>
          <button class="ui button" type="submit" style="width: 100%; background-color:black; color: white">記録</button>
        </form>
      </div>
      <div dlass="content" style="
        display: flex;
        justify-content: center;
        align-items: center;
      ">
        <div class="ui segment" style="
        display: flex;
        width: 20%;
        justify-content: center;
        align-items: center;
      ">
        <h2>~活動記録~</h2>
        </div>
      </div>
      <template v-for="(record, index) in sortRecords">
        <div class="ui segment" :key="index">
          <div class="inline fields">
            <div class="field">
              <label style="white-space: nowrap; font-size: 25px">{{ record.type }}: </label>
              <label style="font-size: 20px">{{ record.text }}</label>
            </div>
          </div>
        </div>
      </template>
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
      records: [],
      text: '',
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
          this.$router.push({ name: "Home" });
        }).catch(err => {
          console.log(err);
        }
        );
    },
    postRecords() {
      if (!this.text) {
        this.err = "活動記録を入力してください";
        return;
      }
      const requestBody = {
        id: this.user.id,
        text: this.text,
        type: "text",
      };
      axios.post(baseUrl + "/records", requestBody)
        .then(() => {
          this.text = "";
          window.location.reload();
        }).catch(err => {
          console.log(err);
        }
        );
    },
  },
  computed: {
    sortRecords() {
      let results = this.records.filter(record => {
        return record.id == this.user.id;
      });
      return results;
    }
  },
  async created() {
    if (!window.localStorage.getItem("id")) {
      this.$router.push({ name: "Login" });
    }
    this.user.id = localStorage.getItem('id');
    this.user.name = localStorage.getItem('name');
    await axios.get(baseUrl + "/user" + "?id=" + this.user.id)
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
    await axios.get(baseUrl + "/records")
      .then(res => {
        this.records = res.data;
      }).catch(err => {
        console.log(err);
      }
      );
  }
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
</style>
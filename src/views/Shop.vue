<template>
  <div>
    <Menu></Menu>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <div class="inline fields" >
          <div class="field" style="display: flex; justify-content: space-between;">
            <label style="font-size: 25px">所持ポイント：</label>
            <label><span style="font-size:30px">{{user.point}}</span>ポイント</label>
          </div>
        </div>
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
        <h2>~景品一覧~</h2>
        </div>
      </div>
      <template v-for="(product, index) in products">
        <div class="ui segment" :key="index">
          <div class="inline fields" >
            <div class="field" style="display: flex; justify-content: space-between;">
              <label style="white-space: nowrap; font-size: 25px">{{ product.name }}の必要ポイント数:{{product.point}} </label>
              <button class="ui inverted green button" v-if="user.point >= product.point">購入</button>
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
        point: 0,
      },
      products: [],
      err: null
    };
  },
  components: {
    Menu
  },
  methods: {
  },
  computed: {
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
        this.user.point = res.data.point;
      })
      .catch(err => {
        console.log(err);
      })
    if(this.user.point == null){
      this.user.point = 0;
    }
    await axios.get(baseUrl + "/products")
      .then(res => {
        this.products = res.data;
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
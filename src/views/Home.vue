<template>
  <div>
    <Menu></Menu>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        {{ name }}
      </div>
    </div>
  </div>
</template>

<script>
//import { baseUrl } from '@/assets/config.js';
//import axios from "axios";
import Menu from '@/components/Menu.vue'
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';

export default {
  name: 'Home',
  components: {
    // 読み込んだコンポーネント名をここに記述する
    Menu
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      post: {
        text: null,
        category: null,
        err: null
      },
      search: {
        username: null,
        category: null,
        start: null,
        end: null,
        err: null,
      },
      query: {
        start: null,
        end: null
      },
      articles: [],
      name: null
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
    sortedArticles() {
      let result = this.articles;
      // if(this.query.start && this.query.end) {
      //   serachArticle();
      // }
      return result;
    },
  },
  created() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    this.name = localStorage.getItem("name");
    // apiからarticleを取得する
    if (!window.localStorage.getItem("name")) {
      this.$router.push({name: "Login"});
    }
  },
  methods: {
    // Vue.jsで使う関数はここで記述する
  }
}
</script>
<style scoped>
</style>
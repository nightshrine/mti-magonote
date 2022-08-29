<template>
  <div>
    <Menu></Menu>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <h1 class="welcome">ようこそ！{{  user.name  }}さん！&#x1f44b;</h1>
        <div>
          <h3>動画一覧(現在：Level{{  user.level  }})</h3>
        </div>
      </div>
      <template v-for="(movie, index) in movies">
        <div class="ui segment" :key="index">
          <div class="ui grid">
            <div class="four wide column">
              <iframe width="200" height="115" :src=movie.url title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="twelve wide column">
              <h2>{{  movie.title  }}</h2>
              <p>{{  movie.description  }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@/assets/config.js";
import axios from "axios";
import Menu from "@/components/Menu.vue";
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
export default {
  name: "Home",
  components: {
    // 読み込んだコンポーネント名をここに記述する
    Menu,
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      user: {
        id: "",
        name: "",
        height: "",
        weight: "",
        level: null,
      },
      movies: [],
    };
  },
  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },
  async created() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    this.user.id = localStorage.getItem("id");
    // apiからarticleを取得する
    if (!window.localStorage.getItem("id")) {
      this.$router.push({ name: "Login" });
    }
    await axios
      .get(baseUrl + "/movies")
      .then((res) => {
        this.movies = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(baseUrl + "/user" + "?id=" + this.user.id)
      .then((res) => {
        this.user.id = res.data.id;
        this.user.name = res.data.name;
        this.user.height = res.data.height;
        this.user.weight = res.data.weight;
        this.user.level = res.data.level;
      })
      .catch((err) => {
        console.log(err);
      });
    if (this.user.level != null) {
      let result = this.movies.filter(
        (movie) => movie.level == this.user.level
      );
      this.movies = result;
    }
  },
  methods: {
    // Vue.jsで使う関数はここで記述する
    switchPage(pageName) {
      if (this.$route.name === pageName) {
        return;
      }
      this.$router.push({ name: pageName });
    }
  },
};
</script>
<style scoped>
.welcome {
  text-align: center;
}

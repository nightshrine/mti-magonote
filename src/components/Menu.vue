<template>
  <div class="ui inverted segment">
    <div class="ui inverted secondary pointing menu">
      <a class=item @click="switchPage('Home')" v-bind:class="{ active: current == 'Home' }">Home</a>
      <a class=item @click="switchPage('Mypage')" v-bind:class="{ active: current == 'Mypage' }">Mypage</a>
      <a class=item @click="switchPage('Shop')" v-bind:class="{ active: current == 'Shop' }">Shop</a>
      <div class="right menu">
        <button class="item" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  computed: {
    current() {
      return this.$route.name;
    }
  },
  methods: {
    switchPage(pageName) {
      if (this.$route.name === pageName) {
        return;
      }
      this.$router.push({ name: pageName });
    },
    logout() {
      // localStorageと直接書くとグローバル変数使用の警告が出るため、windowから書いています。
      window.localStorage.removeItem('Id');
      window.localStorage.removeItem('name');
      this.$router.push({ name: 'Login' });
    }
  },
}
</script>

<style scoped>
</style>
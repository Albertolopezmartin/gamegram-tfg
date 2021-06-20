<template>
  <div class="app" :class="mode">
    <Header :mode="mode"></Header>
      <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  data () {
    return {
      mode: 'dark'
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style>


@import './assets/css/styles.css';
</style>

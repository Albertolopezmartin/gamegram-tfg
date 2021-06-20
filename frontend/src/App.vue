<template>
  <div class="app" :class="mode">
    <Header :mode="mode" @toggle="toggle"></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  data() {
    return {
      mode: "dark",
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    toggle() {
      if (this.mode === "dark") {
        this.mode = "light";
      } else {
        this.mode = "dark";
      }
    }
  }
};
</script>

<style>
@import "./assets/css/styles.css";
</style>

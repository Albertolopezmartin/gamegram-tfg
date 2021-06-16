<template>
  <div>
    <Slider texto="Articulos" home="true"></Slider>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Últimos artículos</h2>
        <p v-if="userLogged">Usuario Logueado: {{userLogged}}</p>

        <div id="post">
          <Posts v-bind:post="post"></Posts>
        </div>
      </section>
    </div>
    <Sidebar></Sidebar>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import Slider from "./Slider.vue";
import Sidebar from "./Sidebar.vue";
import axios from "axios";
import Global from "../Global";
import Posts from "./Posts";
import auth from "@/logic/auth";
export default {
  name: "LastPosts",
  components: {
    Slider,
    Sidebar,
    Posts,
  },
  mounted() {
    this.getLastPosts();
  },
  data() {
    return {
      url: Global.url,
      post: [],
    };
  },
  methods: {
    getLastPosts() {
      axios.get(this.url + "post/true").then((res) => {
        if (res.data.status == "success") {
          this.post = res.data.post;

          console.log(this.post);
        }
      });
    },
  },
  computed: {
    userLogged() {
      return auth.getUserLogged();
    }
  }
};
</script>
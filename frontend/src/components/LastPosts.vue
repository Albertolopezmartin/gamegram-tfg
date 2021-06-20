<template>
  <div>
    <Slider texto="Fotos" ></Slider>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Posts</h2>
        <div id="posts">
          <Posts v-bind:posts="posts"></Posts>
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
    Posts
  },
  mounted() {
    this.getLastPosts();
  },
  data() {
    return {
      url: Global.url,
      posts: [],
    };
  },
  methods: {
    getLastPosts() {
      axios.get(this.url + "posts").then((res) => {
        if (res.data.status == "success") {
          this.posts = res.data.posts;

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
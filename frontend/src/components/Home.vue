<template>
  <div>
    <Slider texto="Gamegram" home="true"></Slider>
    <div class="center">
      <section id="content">
        <h1 class="subheader">Home</h1>
        <div id="posts" v-if="posts">
          <Posts :posts="posts"></Posts>
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
import Posts from "./Posts.vue";
export default {
  name: "Home",
  components: {
    Slider,
    Sidebar,
    Posts
  },
  mounted() {
    this.getPosts();
  },
  data() {
    return {
      url: Global.url,
      posts: [],
    };
  },
  methods: {
    getPosts() {
      axios.get(this.url+"posts").then((res) => {
        if (res.data.status == "success") {
          this.posts = res.data.posts;

          console.log(this.posts);
        }
      });
    },
  },
};
</script>
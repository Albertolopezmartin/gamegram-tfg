<template>
  <div>
    <Slider :texto="'Busqueda: '+ searchString"></Slider>
    <div class="center">
      <section id="content">
        <h1 class="subheader" v-if="posts">Posts encontrados</h1>
        <div id="posts" v-if="posts">
          <Posts :posts="posts"></Posts>
        </div>
        <div v-else>
            <h2>No hay posts para mostrar</h2>
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
export default {
  name: "Search",
  components: {
    Slider,
    Sidebar,
    Posts
  },
  mounted() {
    this.searchString = this.$route.params.searchString;
    this.getPostsBySearch(this.searchString);
  },
  data() {
    return {
      url: Global.url,
      posts: [],
      searchString: null
    };
  },
  methods: {
    getPostsBySearch(searchString) {
      axios.get(this.url+"post/search/"+searchString).then((res) => {
        if (res.data.status == "success") {
          this.posts = res.data.posts;

          console.log(this.posts);
        }
      });
    },
  },
};
</script>
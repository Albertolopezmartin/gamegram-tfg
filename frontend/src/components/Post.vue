<template>
  <div>
    <div class="center">
      <section id="content">
        <article class="post-item post-detail" v-if="post">
          <div class="image-wrap">
            <img
              :src="url + 'post/get-image/' + post.photo"
              :alt="post.name"
              v-if="post.photo"
            />
            <img
              src="../assets/images/default-image-620x600.jpg"
              :alt="post.name"
              v-else
            />
          </div>

          <h1 class="subheader">{{ post.name }}</h1>
          <span class="date">
            {{ post.postdate | moment("from", "now") }}
          </span>
          <p>{{ post.comment }}</p>

          <div class="clearfix"></div>
          <div v-if="userLogged">
          <router-link :to="'/editar/' + post._id" class="btn btn-warning"
            >Editar</router-link
          >
          <a @click="deletePost(post._id)" class="btn btn-danger">Eliminar</a>
          </div>
        </article>
      </section>
    </div>
    <Sidebar></Sidebar>
    <div class="clearfix"></div>
  </div>
</template>
<script>
import Sidebar from "./Sidebar.vue";
import Global from "../Global";
import axios from "axios";
import swal from "sweetalert";
import auth from "@/logic/auth";
export default {
  name: "Post",
  components: {
    Sidebar,
  },
  data() {
    return {
      url: Global.url,
      post: null,
    };
  },
  computed: {
    userLogged() {
      return auth.getUserLogged();
    }
  },
  mounted() {
    var postId = this.$route.params.id;
    this.getPost(postId);
  },
  methods: {
    getPost(postId) {
      axios.get(this.url + "post/" + postId).then((res) => {
        if (res.data.status == "success") {
          this.post = res.data.post;
        }
      });
    },
    deletePost(postId) {
      axios.delete(this.url + "post/" + postId).then((response) => {
        swal("Post borrado", "El post se ha borrado", "success");
        console.log(response);
        this.$router.push("/home");
      });
    },
  },
};
</script>
<template>
  <div class="Perfil">
    <div class="center">
      <section id="content">
        <h1 class="subheader">Perfil</h1>
        <article v-if="user">
            <h2>{{ user.nick }}</h2>
            <h3>Imágen de Perfil</h3>
            <div class="image-wrap">
          <img
            :src="url + 'post/get-image/' + user.pfp"
            :alt="user.nick"
            v-if="user.pfp"
          />
          <img
            src="../assets/images/default-image-620x600.jpg"
            :alt="user.nick"
            v-if="!user.pfp"
          />
          </div>
          <br>
          <p>Email: {{ user.email }}</p>
          <router-link :to="'/editarPerfil/' + userNick" class="btn btn-warning"
            >Editar</router-link
          >
        
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
import auth from "@/logic/auth";
export default {
  name: "Perfil",
  components: {
    Sidebar,
  },
  data() {
    return {
      url: Global.url,
      user: null,
    };
  },
  computed: {
    userLogged() {
      return auth.getUserLogged();
    },
  },
  mounted() {
      var userNick = auth.getUserLogged();
      this.getUser(userNick);
  },
  methods: {
    getUser(userNick) {
      axios.get(this.url + "usernick/" + userNick).then((res) => {
        if (res.data.status == "success") {
          this.user = res.data.user;
        }
      });
    },
  }
};
</script>
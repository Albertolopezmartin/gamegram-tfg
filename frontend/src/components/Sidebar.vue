<template>
  <aside id="sidebar">
    <div id="nav-blog" class="sidebar-item">
      <div v-if="userLogged">
        <router-link to="/perfil" class="btn btn-primary">Perfil</router-link>
        <br>
        <router-link to="/logout" class="btn btn-danger">Logout</router-link>
      </div>

      <div v-else>
        <router-link to="/login" class="btn btn-primary">Login</router-link>
        <br>
        <router-link to="/register" class="btn btn-primary">Regístrate</router-link>
      </div>
    </div>
    <div v-if="userLogged">
      <div id="nav-blog" class="sidebar-item">
        
        <h3>Puedes hacer esto</h3>
        <router-link to="/crear-post" class="btn btn-success"
          >Crear post</router-link
        >
      </div>
    </div>
    <div id="search" class="sidebar-item">
      <h3>Buscador</h3>
      <p>Encuentra el post que buscas</p>
      <form @submit.prevent="goSearch">
        <input type="text" name="search" v-model="searchString" />
        <input type="submit" name="submit" value="Buscar" class="btn btn-dark" />
      </form>
    </div>
  </aside>
</template>

<script>
import auth from "@/logic/auth";
export default {
  name: "Sidebar",
  data() {
    return {
      searchString: null,
    };
  },
  computed: {
    userLogged() {
      return auth.getUserLogged();
    },
  },
  methods: {
    goSearch() {
      this.$router.push("/redirect/" + this.searchString);
    },
  },
};
</script>
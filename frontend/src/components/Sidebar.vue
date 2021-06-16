<template>
  <aside id="sidebar">
    <div id="nav-blog" class="sidebar-item">
      <h3>Puedes hacer esto</h3>
      <router-link to="/crear-articulo" class="btn btn-success">Crear post</router-link>
    </div>

    <div id="search" class="sidebar-item">
      <h3>Buscador</h3>
      <p>Encuentra el post que buscas</p>
      <form @submit.prevent="goSearch">
        <input type="text" name="search" v-model="searchString" />
        <input type="submit" name="submit" value="Buscar" class="btn" />
      </form>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  data(){
    return {
      searchString: null
    }
  },
  methods: {
    goSearch(){
      this.$router.push('/redirect/'+this.searchString);
    }
  }
};
</script>
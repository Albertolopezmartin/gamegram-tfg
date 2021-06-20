<template>
  <header>
      <b-navbar type="dark" toggleable>
        <div id="logo">
          <img src="../assets/logo.svg" class="app-logo" alt="Logotipo" />
        </div>
        <b-navbar-brand >GAMEGRAM</b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item router-link to="/home">Inicio</b-nav-item>
            <b-nav-item router-link to="/games">Juegos</b-nav-item>
            <b-nav-item router-link to="/ultimos-posts">Fotos</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <Toggle :mode="mode" @toggle="$emit('toggle')"/>
      <div class="clearfix"></div>
  </header>
</template>

<script>
import Toggle from './Toggle.vue'
export default {
  props: ['mode'],
  name: "Header",
  components: {
    Toggle
  }
};
</script>
<template>
  <footer id="footer">
    <nav id="menuf">
      <ul>
        <li>
          <router-link to="/home" active-class="active">Inicio</router-link>
        </li>
        <li>
          <router-link to="/games" active-class="active">Juegos</router-link>
        </li>
        <li>
          <router-link to="/photos" active-class="active">Fotos</router-link>
        </li>
        <li>
          <router-link to="/perfil" active-class="active">Perfil</router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>
<script>
export default {
  name: "Footer",
};
</script>
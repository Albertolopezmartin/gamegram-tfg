<template>
  <footer id="footer">
    <nav id="menuf">
      <ul>
        <li>
          <router-link to="/home" active-class="active">Inicio</router-link>
        </li>
        <li>
          <router-link to="/ultimos-posts" active-class="active">Fotos</router-link>
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
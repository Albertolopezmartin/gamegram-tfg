<template>
  <div id="slider" :class="{'slider-big': home, 'slider-small': !home}">
    <h1>{{texto}}</h1>
    <router-link to="/home" href="#" class="btn-white" v-if="home">Ir al blog</router-link>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props:['texto', 'home']
};
</script>
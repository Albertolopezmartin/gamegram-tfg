<template>
  <div id="slider" :class="{'slider-big': home, 'slider-small': !home}">
    <h1>{{texto}}</h1>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props:['texto', 'home']
};
</script>
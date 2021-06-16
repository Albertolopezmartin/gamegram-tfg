<template>
  <section id="posts-component">
    <div id="posts-list" v-if="posts && posts.length >= 1">
      <post
        class="post-item"
        v-for="post in posts"
        :key="post._id"
      >
        <div class="image-wrap">
          <img
            :src="url + 'get-image/' + post.image"
            :alt="post.title"
            v-if="post.image"
          />
          <img
            src="../assets/images/parque-nacional-banff.jpg"
            :alt="post.title"
            v-if="!post.image"
          />
        </div>
        <h2><router-link :to="{name: 'post', params: {id: post._id}}">{{ post.title }}</router-link></h2>
        <span class="date"> {{ post.date  | moment("from","now")}}</span>
        <a href="#">Leer más</a>

        <div class="clearfix"></div>
      </post>
    </div>
    <div v-else-if="posts && posts.length < 1"> No hay posts para mostrar</div>
    <div v-else>Cargando...</div>
  </section>
</template>
<script>
import Global from "../Global";
export default {
  name: "Posts",
  props: ["posts"],
  data() {
    return {
      url: Global.url,
    };
  },
};
</script>
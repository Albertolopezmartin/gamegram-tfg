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
            :src="url + 'post/get-image/' + post.photo"
            :alt="post.name"
            v-if="post.photo"
          />
          <img
            src="../assets/images/default-image-620x600.jpg"
            :alt="post.name"
            v-if="!post.photo"
          />
        </div>
        <h2><router-link :to="{name: 'post', params: {id: post._id}}">{{ post.name }}</router-link></h2>
        <span class="date"> {{ post.postdate  | moment("from","now")}}</span>

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
import Vue from 'vue';
import App from './App.vue';
import Login from "./components/Login";
import Register from "./components/Register";
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import LastPosts from './components/LastPosts.vue';
//import ErrorComponent from './components/ErrorComponent.vue';
import Search from './components/Search.vue';
import Post from './components/Post.vue';
import CreatePost from './components/CreatePost.vue';
import EditPost from './components/EditPost.vue';

Vue.config.productionTip = false



Vue.use(VueRouter);
Vue.use(Vuelidate);



const routes = [
  { path: "/", component: Login },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {path: '/post/:id', name: 'post', component: Post},
  {path: '/editar/:id', name: 'edit', component: EditPost},
  {path: '/crear-post', name: 'create', component: CreatePost},
  {path: '/ultimos-posts', component: LastPosts},
  {path: '/buscador/:searchString', component: Search},
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

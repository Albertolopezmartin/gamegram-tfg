import Vue from 'vue';
import App from './App.vue';
import Login from "./components/Login.vue";
import Perfil from "./components/Perfil.vue";
import Home from "./components/Home.vue";
import Logout from "./components/Logout.vue";
import Register from "./components/Register.vue";
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import LastPosts from './components/LastPosts.vue';
//import ErrorComponent from './components/ErrorComponent.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Search from './components/Search.vue';
import Post from './components/Post.vue';
import Posts from './components/Posts.vue';
import CreatePost from './components/CreatePost.vue';
import EditPost from './components/EditPost.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Redirect from './components/Redirect.vue';

Vue.config.productionTip = false


// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)



Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(require('vue-moment'));

Vue.use(VueAxios, axios);


const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/home", component: Home },
  { path: "/logout", component: Logout },
  { path: "/register", component: Register },
  { path: '/posts/', name: 'posts', component: Posts },
  { path: '/post/:id', name: 'post', component: Post },
  { path: '/editar/:id', name: 'edit', component: EditPost },
  { path: '/crear-post', name: 'create', component: CreatePost },
  { path: '/ultimos-posts', component: LastPosts },
  { path: '/perfil', component: Perfil },
  { path: '/buscador/:searchString', component: Search },
  {path: '/redirect/:searchString', component: Redirect},

];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

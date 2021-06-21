<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <form action class="form" @submit.prevent="login">
      <label class="form-label" for="#nick">Nick:</label>
      <input
        v-model="nick"
        class="form-input"
        type="text"
        id="nick"
        required
        placeholder="Nick"
      >
      <label class="form-label" for="#password">Password:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      >
      <p v-if="error" class="error">Has introducido mal el nick o la contraseña.</p>
      <input class="form-submit" type="submit" value="Login">
    </form>
    <p class="msg">¿No tienes cuenta?
      <router-link to="/register">Regístrate</router-link>
    </p>
  </div>
</template>

<script>
import auth from "@/logic/auth";
export default {
  data: () => ({
    nick: "",
    password: "",
    error: false
  }),
  methods: {
    async login() {
      try {
        await auth.login(this.nick, this.password);
        const user = this.nick;
        auth.setUserLogged(user);
        this.$router.push("/home");
      } catch (error) {
        console.log(error);
        this.error = true;
      }
    }
  }
};
</script>

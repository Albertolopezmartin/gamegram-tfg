<template>
  <div class="register">
    <h1 class="title">Sign Up</h1>
    <form action class="form" @submit.prevent="register">
      <label class="form-label" for="#email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      >
      <label class="form-label" for="#nick">Nick:</label>
      <input
        v-model="nick"
        class="form-input"
        type="text"
        id="nick"
        required
        placeholder="Nick"
      >
      <label class="form-label" for="#pass">Password:</label>
      <input
        v-model="pass"
        class="form-input"
        type="password"
        id="pass"
        placeholder="Password"
      >
      <label class="form-label" for="#password-repeat">Repite la contraseña:</label>
      <input
        v-model="passwordRepeat"
        class="form-input"
        type="password"
        id="password-repeat"
        placeholder="Password"
      >
      <input class="form-submit" type="submit" value="Regístrate">
    </form>
  </div>
</template>

<script>
import auth from "@/logic/auth";
export default {
  data: () => ({
    email: "",
    nick: "",
    pass: "",
    passwordRepeat: "",
    idCou: "",
    pfp: ""
  }),
  methods: {
    async register() {
      try {
        await auth.register(this.email, this.pass, this.nick);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>


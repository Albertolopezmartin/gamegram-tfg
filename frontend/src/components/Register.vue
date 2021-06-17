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

<style>
.register {
  padding: 2rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;

}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;

}
.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;

}
.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}
</style>

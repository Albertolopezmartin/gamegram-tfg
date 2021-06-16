<template>
  <div class="logout">
      <form action class="form" @submit.prevent="logout">
      <input class="form-submit" type="submit" value="¿Estás seguro que quieres cerrar sesión?">
      </form>
  </div>
</template>

<script>
import auth from "@/logic/auth";
export default {
  data: () => ({
    email: "",
    password: "",
    error: false
  }),
  methods: {
    async logout() {
        auth.deleteUserLogged();
        this.$router.push("/");
    }
  }
};
</script>
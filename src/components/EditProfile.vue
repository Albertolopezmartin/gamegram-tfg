<template>
  <div>
    <div class="center">
      <section id="content">
        <h1 class="subheader">Editar Perfil</h1>
        <form action="mid-form" v-on:submit.prevent="save()">
          <div class="form-group">
            <label for="name">Nick</label>
            <input type="text" name="name" v-model="user.name" required />
            <div v-if="submitted && !$v.user.name.required">
              El titulo debe tener algo
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" v-model="user.email" required />
            <div v-if="submitted && !$v.user.email.required">
              El email debe tener algo
            </div>
          </div><div class="form-group">
            <label for="pass">Password</label>
            <input type="password" name="pass" v-model="user.pass" required />
          </div>
          <div class="form-group">
            <div v-if="user.pfp">
                <img :src="url + 'post/get-image/'+ user.pfp" :alt="user.nick" v-if="user.pfp" class="image-small"/>
            </div>
            <label for="pfp">Imagen</label>
            <input
              type="file"
              id="file"
              ref="file"
              name="file0"
              @change="fileChange()"
            />
          </div>
          <div class="clearfix"></div>
          <input type="submit" value="Guardar" class="btn btn-success" />
        </form>
      </section>
    </div>
    <Sidebar></Sidebar>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import Global from "../Global";
import User from "./models/User";
import axios from "axios";
import { required } from 'vuelidate/lib/validators';
import swal from "sweetalert";
import auth from "@/logic/auth";
export default {
  name: "editProfile",
  components: {
    Sidebar,
  },
  data() {
    return {
      url: Global.url,
      file: "",
      user: new User("", "", "", ""),
      submitted: false,
      isEdit: true,
    };
  },
  validations: {
    user: {
      nick: {
        required,
      },
      email: {
        required,
      },
    },
  },
  computed: {
    userLogged() {
      return auth.getUserLogged();
    },
  },
  mounted() {
      var userNick = auth.getUserLogged();
      this.getUser(userNick);
  },
  methods: {
    fileChange() {
      this.file = this.$refs.file.files[0];
    },
    getUser(userId) {
      axios.get(this.url + "user/" + userId).then((res) => {
        if (res.data.status == "success") {
          this.user = res.data.user;
        }
      });
    },
    save() {
      this.submitted = true;
      var userId = this.$route.params.id;
      if (this.$v.$invalid) {
        return false;
      } else {
        axios
          .put(this.url + "user/" + userId, this.user)
          .then((response) => {
            if (response.data.status == "success") {
              const formData = new FormData();
              if (
                this.file != null &&
                this.file != undefined &&
                this.file != ""
              ) {
                formData.append("file0", this.file, this.file.name);
                var userId = response.data.user._id;
                axios
                  .user(this.url + "user/upload-image/" + userId, formData)
                  .then((response) => {
                    if (response.data.user) {
                      swal(
                        "User editado",
                        "El user se ha editado correctamente",
                        "success"
                      );
                      this.user = response.data.user;
                      this.$router.push("/user/"+this.user._id);
                    } else {
                      swal("Error", "El user no se ha editado", "error");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                swal(
                  "User editado",
                  "El user se ha editado correctamente",
                  "success"
                );
                this.user = response.data.user;
                this.$router.push("/user/"+this.user._id);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
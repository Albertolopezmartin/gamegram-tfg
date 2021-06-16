<template>
  <div>
    <div class="center">
      <section id="content">
        <h1 class="subheader">Crear Post</h1>

        <form action="mid-form" v-on:submit.prevent="save()">
          <div class="form-group">
            <label for="title">Titulo</label>
            <input type="text" name="title" v-model="post.title" required />
            <div v-if="submitted && !$v.post.title.required">
              El titulo debe tener algo
            </div>
          </div>
          <div class="form-group">
            <label for="content">Contenido</label>
            <textarea
              name="content"
              v-model="post.content"
              required
            ></textarea>
            <div v-if="submitted && !$v.post.content.required">
              El contenido debe tener algo
            </div>
          </div>
          <div class="form-group">
            <label for="image">Imagen</label>
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
import Post from "./models/Post";
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import swal from 'sweetalert';


export default {
  name: "createPost",
  components: {
    Sidebar,
  },
  data() {
    return {
      url: Global.url,
      file: "",
      post: new Post("", "", null, ""),
      submitted: false,
    };
  },
  validations: {
    post: {
      title: {
        required,
      },
      content: {
        required,
      },
    },
  },
  mounted() {},
  methods: {
    fileChange() {
      this.file = this.$refs.file.files[0];
    },
    save() {
      this.submitted = true;
      if (this.$v.$invalid) {
        return false;
      } else {
        axios
          .post(this.url + "save", this.post)
          .then((response) => {
            if (response.data.status == "success") {
              const formData = new FormData();

              if (
                this.file != null &&
                this.file != undefined &&
                this.file != ""
              ) {
                formData.append("file0", this.file, this.file.name);
                var postId = response.data.post._id;
                axios
                  .post(this.url + "upload-image/" + postId, formData)
                  .then((response) => {
                    if (response.data.post) {
                        swal(
                            'Artículo creado',
                            'El post se ha creado correctamente',
                            'success'
                        );
                      this.post = response.data.post;
                      this.$router.push("/blog");

                    }else{
                        swal(
                        "Error",
                        "El post no se ha creado",
                        "error"
                      );
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                  swal(
                            'Artículo creado',
                            'El post se ha creado correctamente',
                            'success'
                        );
                  this.post = response.data.post;
                  this.$router.push("/blog");
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
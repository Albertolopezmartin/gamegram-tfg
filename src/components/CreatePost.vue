<template>
  <div>
    <div class="center">
      <section id="content">
        <h1 class="subheader">Crear Post</h1>

        <form action="mid-form" v-on:submit.prevent="save()">
          <div class="form-group">
            <label for="name">Titulo</label>
            <input type="text" name="name" v-model="post.name" required />
            <div v-if="submitted && !$v.post.name.required">
              El titulo debe tener algo
            </div>
          </div>
          <div class="form-group">
            <label for="comment">Contenido</label>
            <textarea
              name="comment"
              v-model="post.comment"
              required
            ></textarea>
            <div v-if="submitted && !$v.post.comment.required">
              El contenido debe tener algo
            </div>
          </div>
          <div class="form-group">
            <label for="photo">Imagen</label>
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
      post: new Post("", "", null, "", "60c9a42675eb293b301d6528", "60c9cc14b054ef2a04dc31c2"),
      submitted: false,
    };
  },
  validations: {
    post: {
      name: {
        required,
      },
      comment: {
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
          .post(this.url + "post/save", this.post)
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
                  .post(this.url + "post/upload-image/" + postId, formData)
                  .then((response) => {
                    if (response.data.post) {
                        swal(
                            'Post creado',
                            'El post se ha creado correctamente',
                            'success'
                        );
                      this.post = response.data.post;
                      this.$router.push("/home");

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
                            'Post creado',
                            'El post se ha creado correctamente',
                            'success'
                        );
                  this.post = response.data.post;
                  this.$router.push("/home");
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
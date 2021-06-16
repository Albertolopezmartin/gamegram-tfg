<template>
  <div>
    <div class="center">
      <section id="content">
        <h1 class="subheader">Editar Post</h1>
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
            <div v-if="post.image">
                <img :src="url + 'get-image/'+ post.image" :alt="post.title" v-if="post.image" class="image-small"/>
            </div>
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
import swal from "sweetalert";

export default {
  name: "editPost",
  components: {
    Sidebar,
  },
  data() {
    return {
      url: Global.url,
      file: "",
      post: new Post("", "", null, ""),
      submitted: false,
      isEdit: true,
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
  mounted() {
      var postId = this.$route.params.id;
      this.getPost(postId);
  },
  methods: {
    fileChange() {
      this.file = this.$refs.file.files[0];
    },
    getPost(postId) {
      axios.get(this.url + "post/" + postId).then((res) => {
        if (res.data.status == "success") {
          this.post = res.data.post;
        }
      });
    },
    save() {
      this.submitted = true;
      var postId = this.$route.params.id;
      if (this.$v.$invalid) {
        return false;
      } else {
        axios
          .put(this.url + "post/" + postId, this.post)
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
                        "Post editado",
                        "El post se ha editado correctamente",
                        "success"
                      );
                      this.post = response.data.post;
                      this.$router.push("/post/"+this.post._id);
                    } else {
                      swal("Error", "El post no se ha editado", "error");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                swal(
                  "Post creado",
                  "El post se ha editado correctamente",
                  "success"
                );
                this.post = response.data.post;
                this.$router.push("/post/"+postId);
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
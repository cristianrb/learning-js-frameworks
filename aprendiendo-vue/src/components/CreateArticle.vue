<template src="./CreateArticle.html"></template>

<script>
import Sidebar from "./Sidebar.vue";
import Global from "../Global";
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import Article from "../models/Article";
import swal from "sweetalert";
export default {
  name: "CreateArticle",
  components: {
    Sidebar,
  },
  data() {
    return {
      url: Global.url,
      file: "",
      article: new Article("", "", null, ""),
      submitted: false,
    };
  },
  validations: {
    article: {
      title: {
        required,
      },
      content: {
        required,
      },
    },
  },
  mounted() {
    console.log(this.article);
  },
  methods: {
    fileChange() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    save() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }

      console.log(this.article);
      axios
        .post(this.url + "/save", this.article)
        .then((response) => {
          if (response.data.status == "success") {
            if (
              this.file != null &&
              this.file != undefined &&
              this.file != ""
            ) {
              const formData = new FormData();
              formData.append("file0", this.file, this.file.name);
              var articleId = response.data.article._id;
              axios
                .post(this.url + "/upload-image/" + articleId, formData)
                .then((response) => {
                  if (response.data.article) {
                    swal(
                      "Articulo creado",
                      "El articulo se ha creado correctamente",
                      "success"
                    );
                    this.article = response.data.article;
                    this.$router.push("/blog");
                  } else {
                    swal(
                      "Creación fallida",
                      "El articulo no se ha creado correctamente",
                      "error"
                    );
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              swal(
                "Articulo creado",
                "El articulo se ha creado correctamente",
                "success"
              );
              this.article = response.data.article;
              this.$router.push("/blog");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
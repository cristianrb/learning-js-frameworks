<template>
 <div class="general">
    <Slider texto="Pagina de pruebas"></Slider>
    <div class="center">
  <section id="content">
    <h2 class="subheader">Página de pruebas</h2>
    <h3>{{ id_desde_url }}</h3>
    <button @click="actualizarNombre()">Actualizar nombre</button>
    <button @click="redirigirAlBlog()">Redirigir</button>
    <h4>{{nombre}}</h4>
  </section>
  <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Slider from './Slider.vue'
import Sidebar from './Sidebar.vue'
export default {
  name: "Pagina",
  components: {
    Slider,
    Sidebar
  },
  created() {
    console.log("Componente creado");
  },
  mounted() {
    this.id_desde_url = this.$route.params.id;
    console.log("Componente montado");
  },
  updated() {
    console.log("Componente actualizado");
  },
  destroyed() {
    console.log("Componente eliminado");
  },
  data() {
    return {
      id_desde_url: null,
      nombre: "Cristian Ruiz",
    };
  },
  methods: {
    actualizarNombre() {
      this.nombre = "ZEUS";
      console.log(this.nombre);
    },
    redirigirAlBlog() {
      this.$router.push('/blog')
    }
  }
};
</script>
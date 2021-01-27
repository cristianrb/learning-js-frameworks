<template>
 <div class="general">
    <div class="center">
  <section id="content">
    <h2 class="subheader">Peliculas</h2>

    <div class="mis-datos" v-if="misDatos">
      <p v-html="misDatos"></p>
      <br/>
      {{web | mayusculas | concatenaYear("Este es el mejor año")}}
    </div>

      <div class="favrotia" v-if="favorita">
        <h2>{{favorita.title}}</h2>
      </div>
    <!--Listado articulos-->
    <div id="articles">
        <div v-for="pelicula in peliculasMayuscula" v-bind:key="pelicula.title">
            <Pelicula 
            :pelicula="pelicula"
            @favorita="haLlegadoLaPeliculaFavorita"
            ></Pelicula>
        </div>
      <!--AÑADIR ARTICULOS VIA JS-->
    </div>
  </section>
  <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Pelicula from './Pelicula.vue'
import Sidebar from './Sidebar.vue'

export default {
  name: "Peliculas",
  components: {
      Pelicula,
      Sidebar
  },
  methods: {
    haLlegadoLaPeliculaFavorita(favorita) {
      this.favorita = favorita;
    }
  },
  filters: {
    mayusculas(value) {
      return value.toUpperCase();
    },
    concatenaYear(value, msg) {
      var date = new Date();
      return value + " " + date.getFullYear() + " " + msg;
    }
  },
  computed: {
    peliculasMayuscula() {
      var peliculasModificadas = this.peliculas;
      for (var i = 0; i < this.peliculas.length; i++) {
        peliculasModificadas[i].title = peliculasModificadas[i].title.toUpperCase();
      }
      
      return peliculasModificadas;
    },
    misDatos() {
      return this.nombre + " " + this.apellidos + " <br/><strong>" + this.web + "</strong>";
    }
    
  },
  data() {
      return {
          nombre: 'Cristian',
          apellidos: 'Ruiz',
          web: 'cristianrb.github.com',
          favorita: null,
          peliculas: [
              {title: 'Batman vs Superman', year: '2017', image: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2016/07/batman-v-superman-ultimate-edition.jpg?itok=-2WGWfYG'},
              {title: 'Gran Torino', year: '2015', image: 'https://play-lh.googleusercontent.com/VnzER03AQraRmoCdRIGiQU0XqQ63zVVcyk2RT9ulpcb2MAvvvpc7nTZKoKfJkF5FC5f3hw'},
              {title: 'El señor de los anillos', year: '2003', image: 'https://as.com/epik/imagenes/2020/08/04/portada/1596535756_527518_1596535915_noticia_normal.jpg'}
          ]
      }
  }
};
</script>
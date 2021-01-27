<template>
  <section id="content">
    <h2 class="subheader">{{ titulo }}</h2>
    <hr />
    <h1>Este es MiComponente</h1>
    <h2>{{ subtitulo }}</h2>
    <hr />

    <h2>Reactividad</h2>
    <input type="text" v-model="nombre" />
    {{ nombre }}

    <h2>Directivas condicionales </h2>
    <input type="number" v-model="edad" />
    Mi edad es: <strong>{{edad}}</strong>


    <p style="color: purple;font-weight:bold" v-if="edad && edad >= 65">
        ERES DE AVANZADA EDAD
    </p>

    <p style="color: green;font-weight:bold" v-else-if="edad && edad >= 18">
        ERES MAYOR DE EDAD
    </p>

    <p style="color: red;font-weight:bold" v-else>
        ERES MENOR DE EDAD
    </p>

    <h2>Directiva iterativa</h2>
    <ol>
        <li v-for="pelicula in peliculas" :key="pelicula">{{pelicula}}</li>
    </ol>

  </section>
</template>

<script>
export default {
  name: "MiComponente",
  data() {
    return {
      titulo: "Mi componente",
      subtitulo: "Soy el subtitulo de MiComponente",
      nombre: "",
      edad: 18,
      peliculas: ["Batman vs Superman", "El señor de los anillos", "Spiderman"]
    };
  },
};
</script>
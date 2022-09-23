<script>
import PokemonDataService from '../services/PokemonDataService';
export default {
  name: "lista-pokemons",
  data() {
    return {
      pokemons: [],
      shiny: false
    };
  },
  methods: {
    buscarPokemons() {
      PokemonDataService.buscarTodos()
        .then(resposta => {
          this.pokemons = resposta
        })
        .catch(erro => {
          console.log(erro);
        });
    },

    verificarShiny() {
      if (this.shiny) {
        this.shiny = false;
      }
      else {
        this.shiny = true;
      }
    }

  },


  mounted() {
    this.buscarPokemons();
  }
}
</script>

<template>
  <main>
    <div>
      <h2>Lista de Pokemon
      <button @click="verificarShiny" class="btn btn-primary m-1"> Shiny </button></h2>

      <div class="container text-center">
        <div class="row row-cols-md-3 g-6">
          <div class=" text-white bg-dark mb-3 card border-primary mb-3" v-for="pokemon in pokemons" :key="pokemon.id">

            <img v-if="!shiny"
              :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/' + pokemon.numeroPokedex + '.png'" />

            <img v-else
              :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/' + pokemon.numeroPokedex + '.png'" />

            <div class="card-body">
              <h5 class="card-title">{{pokemon.nome}}</h5>
              <p class="card-text"> Número da Pokedex: {{pokemon.numeroPokedex}}</p>
              <p class="card-text"> Nível do Pokemon:{{pokemon.nivel}}</p>
              <RouterLink to="/" class="btn btn-primary m-3" aria-current="page">{{pokemon.nome}}</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
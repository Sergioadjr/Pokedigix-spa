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
    },
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
        <button @click="verificarShiny" class="btn btn-primary m-1"> Shiny </button>
      </h2>

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
              <button type="button" class="btn btn-primary active m-3" data-bs-toggle="button"
                aria-pressed="true">{{pokemon.nome}}</button>
            </div>

            <p class="card-text">Pokedex: {{ pokemon.numeroPokedex }}</p>

            
            <div class="row-row-cols-md-5">
              
              <button type="button" class="btn btn-outline-warning m-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>
            </button>
            
            <button type="button" class="btn btn-outline-danger m-1" data-bs-toggle="modal"
            data-bs-target="#confirmacaoExclusao">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3"
            viewBox="0 0 16 16">
            <path
            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </button>
      </div>
        
      <button type="button" class="btn btn-outline-primary pt-1 m-1">
        Mais
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
        </svg>
      </button>
      
    </div>
  </div>
</div>
</div>
  </main>
</template>

<script>
import PokemonDataService from '../services/PokemonDataService';
import Ordenacao from '../components/Ordenacao.vue';
import Pesquisa from '../components/Pesquisa.vue'
import Paginacao from '../components/Paginacao.vue';


export default {
  name: "lista-pokemons",
  data() {
    return {
      pokemons: [],
      pokemonSelecionado: this.inicializaPokemon(),
      shiny: false,
      pagina: 0,
      tamanho: 3,
      ordenacao: {
        titulo: "",
        direcao: "",
        campo: ""
      },
      total: 5,
      quantidade: 3,
      opcoes: [{
        titulo: "Nome: Crescente",
        direcao: "ASC",
        campo: "nome"
      },
      {
        titulo: "Nome: Decrescente",
        direcao: "DESC",
        campo: "nome"
      },
      {
        titulo: "Numero: Crescente",
        direcao: "ASC",
        campo: "numeroPokedex"
      },
      {
        titulo: "Nivel: Decrescente",
        direcao: "DESC",
        campo: "nivel"
      }],
      termo: ""
    };
  },

  components: {
    Ordenacao,
    Paginacao,
    Pesquisa,
  },

  methods: {
    filtarPeloDigitada() {
      if (this.termo.length > 3) {
        this.buscarPokemons();
      }
    },
    trocarPagina(p) {
      this.pagina = p;
      this.buscarPokemons();
    },

    pesquisar(texto) {
      this.termo = texto;
      this.buscarPokemons();
    },

    buscarPokemons() {
      PokemonDataService.buscarTodosPaginadoOrdenado(this.pagina, this.tamanho, this.ordenacao.campo, this.ordenacao.direcao, this.termo)
        .then((resposta) => {
          this.pokemons = resposta;
        })
        .catch((erro) => {
          console.log(erro);
        });
    },

    filtrarDigitado() {
      if (this.termo.length >= 3) {
        this.buscarPokemons();
      }
    },

    verificarShiny() {
      if (this.shiny) {
        this.shiny = false;
      }
      else {
        this.shiny = true;
      }
    },
    selecionar(pokemon) {
      this.pokemonSelecionado.id = pokemon.id;
      this.pokemonSelecionado.nome = pokemon.nome;
    },
    inicializaPokemon() {
      return {
        "id": null,
        "nome": null
      }
    },
    removerPokemonSelecionado() {
      this.isLoading = true;
      PokemonDataService.remover(this.pokemonSelecionado.id)
        .then(() => {
          this.pokemons = this.pokemons.filter(pokemon => pokemon.id != this.pokemonSelecionado.id);
          this.inicializaPokemon();
          this.isLoading = false;
        })
        .catch(() => {
          this.inicializaPokemon();
          this.isLoading = false;
        });
    },

  },


  mounted() {
    this.ordenacao = this.opcoes[0];
    this.buscarPokemons();
  },
};
</script>

<template>
  <main>
    <div>
      <h2>Lista de Pokemon
        <button @click="verificarShiny" class="btn btn-primary m-1"> Shiny </button>
      </h2>

      <div class="row justify-content-end">
        <div class="col-2">
          <Ordenacao v-model="ordenacao" @ordenar="buscarPokemons" :ordenacao="ordenacao" :opcoes="opcoes" />
        </div>
        <div class="col-4">
          <form class="d-flex mb-2" role="search">
            <input class="form-control me-2" v-model="termo" type="search" placeholder="Procurar" aria-label="Search">
            <button class="btn btn-outline-success" type="button" @click.prevent="buscarPokemons">Filtrar</button>
          </form>
          <Pesquisa :texto="termo" :pesquisar="pesquisar" />
        </div>
      </div>

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

              <button type="button" class="btn btn-outline-danger m-1" data-bs-toggle="collapse"
                data-bs-target="#confirmarExclusaoPokemon" aria-expanded="false"
                aria-controls="confirmarExclusaoPokemon" @click="selecionar(pokemon)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3"
                  viewBox="0 0 16 16">
                  <path
                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg>
              </button>
            </div>

            <div class="collapse" id="confirmarExclusaoPokemon">
              <div class="card card-body">

                <div class="text-black">
                  Ao confirmar, o Pokemon "<strong>{{pokemonSelecionado.nome}}</strong>" sera excluido.
                  Deseja continuar?
                </div>

                <div class="d-grid gap-2">
                  <button type="button" class="btn btn-outline-success m-2" @click="removerPokemonSelecionado"
                    data-bs-dismiss="modal">Sim</button>
                </div>

              </div>
            </div>

            <div class="collapse text-black" :id="'collapseExample' + pokemon.id">
              <div class="card card-body">
                <p class="card-text">Pokedex: {{ pokemon.numeroPokedex }}</p>
                <p class="card-text">Peso: {{ pokemon.peso }}</p>
                <p class="card-text">Altura: {{ pokemon.altura }}</p>
                <p class="card-text">Felicidade: {{ pokemon.felicidade }}</p>
              </div>
            </div>

            <button type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseExample' + pokemon.id"
              aria-expanded="false" aria-controls="collapseExample" class="btn btn-outline-primary pt-1 m-1">
              Mais
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
              </svg>
            </button>
          </div>
        </div>
        <Paginacao :total="total" :quantidade="quantidade" :atual="pagina" :trocarPagina="trocarPagina"></Paginacao>
      </div>
    </div>

    <!-- <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav> -->

  </main>
</template>

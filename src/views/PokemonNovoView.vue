<script>
import PokemonDataService from '../services/PokemonDataService';
import Pokemon from '../models/Pokemon'

export default {
    name: 'pokemons-novo',
    data() {
        return {
            pokemon: new Pokemon(),
            salvo: false
        }
    },
    methods: {
        salvar() {
            PokemonDataService.criar(this.Pokemon)
                .then(resposta => {
                    this.pokemon.id = resposta.id;
                    console.log(this.pokemon);
                    this.salvo = true;
                })
                .catch(erro => {
                    console.log(erro);
                    this.salvo = false;
                })
        },

        novo() {
            this.pokemon = new Pokemon();
            this.salvo = false;
        }

    }
}

</script>
    
<template>
    <div v-if="!salvo">
        <form>
            <div class="mb-3">
                <h3> Cadastrar um novo Pokemon</h3>

                <label for="nome" class="form-label-">Nome do Pokemon</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="nome" required placeholder="Pokemon"
                        aria-label="nome do pokemon">
                </div>





<!-- 
                this.nome = null;
                this.altura = null;
                this.peso = null;
                this.genero = null;
                this.nivel = null;
                this.numeroPokedex = null;
                this.felicidade = null;
                this.tiposId = null;
                this.ataquesId = null; -->





                <button @click.prevent="salvar" class="btn btn-success">Salvar</button>
            </div>
        </form>
    </div>
    <div v-else>
        <div class="row">
            <h4> Salvo com Sucesso</h4>
            <span>Pokemon id: {{pokemon.id}}</span>
        </div>
        <div class="row">
            <button @click="novo" class="btn btn-primary"> Novo </button>
        </div>
    </div>

</template>
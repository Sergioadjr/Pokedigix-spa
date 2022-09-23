<script>
import TipoDataService from '../services/TipoDataService';
import Tipo from '../models/Tipo'

export default {
    name: 'tipos-novo',
    data() {
        return {
            tipo: new Tipo(),
            salvo: false
        }
    },
    methods: {
        salvar() {
            TipoDataService.criar(this.tipo)
                .then(resposta => {
                    this.tipo.id = resposta.id;
                    console.log(this.tipo);
                    this.salvo = true;
                })
                .catch(erro => {
                    console.log(erro);
                    this.salvo = false;
                })
        },

        novo() {
            this.tipo = new Tipo();
            this.salvo = false;
        }

    }
}

</script>

<template>
    <div v-if="!salvo">
        <form>
            <div class="mb-3">
                <h3> Cadastrar um novo Tipo de Pokemon</h3>
                <label for="nome" class="form-label">Nome do Tipo</label>
                <input type="text" class="form-control" id="nome" required placeholder="Elétrico" v-model="tipo.nome">
            </div>
            <button @click.prevent="salvar" class="btn btn-success">Salvar</button>
        </form>
    </div>
    <div v-else>
        <div class="row">
            <h4> Salvo com Sucesso</h4>
            <span>Tipo id: {{tipo.id}}</span>
        </div>
        <div class="row">
            <button @click="novo" class="btn btn-primary"> Novo </button>
        </div>
    </div>
</template>
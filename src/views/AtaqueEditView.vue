<script>
import AtaqueDataService from '../services/AtaqueDataService';
import AtaqueRequest from '../models/AtaqueRequest';
import AtaqueResponse from '../models/AtaqueResponse';
import TipoDataService from '../services/TipoDataService';
export default {
    name: 'ataques-edit',
    data() {
        return {
            ataqueRequest: new AtaqueRequest(),
            ataqueResponse: new AtaqueResponse(),
            salvo: false,
            categorias: [{
                indice: 1,
                nome: "Físico",
                nomeBanco: "FISICO",
            },
            {
                indice: 2,
                nome: "Especial",
                nomeBanco: "ESPECIAL",
            },
            {
                indice: 3,
                nome: "Efeito",
                nomeBanco: "EFEITO",
            }
            ],

            tipos: [],
            desabilitarForca: false
        }
    },
    methods: {
        carregarTipos() {
            TipoDataService.buscarTodos()
                .then(resposta => {
                    this.tipos = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                });
        },
        salvar() {
            AtaqueDataService.atualizar(this.$route.params.id, this.ataqueRequest)
                .then(resposta => {
                    this.ataqueResponse = resposta;
                    this.salvo = true;
                })
                .catch(erro => {
                    console.log(erro);
                    this.salvo = false;
                })
        },
        escolherCategoria() {
            if (this.ataqueRequest.categoria == "EFEITO") {
                this.desabilitarForca = true;
            }
            else {
                this.desabilitarForca = false;
            }
        },
        carregarAtaque(id) {
            AtaqueDataService.buscarPeloId(id)
                .then(resposta => {
                    this.ataqueRequest = resposta;
                    this.ataqueRequest.tipoId = resposta.tipo.id;
                })
                .catch(erro => {
                    console.log(erro);
                });
        },
        voltar() {
            this.$router.push({ name: 'ataques-lista' });
        }
    },
    mounted() {
        this.carregarTipos();
        this.carregarAtaque(this.$route.params.id);
    }
}
</script>
    
<template>
    <div v-if="!salvo">
        <form class="row g-3">
            <h3> Editar um Tipo de Ataque</h3>

            <div class="col-12">
                <label for="nome" class="form-label">Nome do Ataque</label>
                <input type="text" class="form-control" id="nome" v-model="ataqueRequest.nome">
            </div>

            <div class="col-5">
                <label for="forca" class="form-label">Força</label>
                <input type="text" class="form-control" id="forca" v-model="ataqueRequest.forca"
                    :disabled="desabilitarForca">
            </div>

            <div class="col-6">
                <label for="acuracia" class="form-label">Acurácia</label>
                <input type="text" class="form-control" id="acuracia" v-model="ataqueRequest.acuracia">
            </div>

            <div class="col-3">
                <label for="acuracia" class="form-label">PP</label>
                <input type="number" class="form-control" id="pp" v-model="ataqueRequest.pontosDePoder">
            </div>

            <div class="col-9">
                <label for="categoria" class="form-label">Categoria</label>
                <select id="categoria" @change="escolherCategoria" class="form-select"
                    aria-label="Default select example" v-model="ataqueRequest.categoria">
                    <option v-for="categoria in categorias" :key="categoria.indice" :value="categoria.nomeBanco">
                        {{categoria.nome}}</option>
                </select>
            </div>

            <div class="col-12">
                <label for="tipo" class="form-label">Tipo do Ataque</label>
                <select id="tipo" class="form-select" aria-label="Default select example"
                    v-model="ataqueRequest.tipoId">
                    <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.id">
                        {{tipo.nome}}</option>
                </select>
            </div>

            <div class="input-group row-12">
                <span class="input-group-text">Descrição do Ataque:</span>
                <textarea class="form-control" aria-label="With textarea" id="descricao"
                    v-model="ataqueRequest.descricao"></textarea>
            </div>

            <button @click.prevent="salvar" class="btn btn-success">Salvar</button>
        </form>
    </div>

    <div v-else>
        <div class="row">
            <h4> Salvo com Sucesso</h4>
            <span>Ataque id: {{ataqueResponse.id}}</span>
        </div>
        <div class="row">
            <button @click="voltar" class="btn btn-primary"> Novo </button>
        </div>
    </div>
</template>
<script>
import TreinadorDataService from '../services/TreinadorDataService';
import Loading from "vue-loading-overlay";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

export default {
    name: "treinadores-lista",
    data() {
        return {
            treinadores: [],
            //   tipoSelecionado: this.inicializaTipo(),
            isLoading: false
        };
    },
    components: {
        Loading,
    },
    methods: {
        buscarTodos() {
            this.isLoading = true;
            TreinadorDataService.buscarTodos()
                .then((resposta) => {
                    this.treinadores = resposta;
                    this.isLoading = false;
                })
                .catch((erro) => {
                    console.log(erro);
                    this.isLoading = false;
                });
        },
        trocarTreinador(treinador) {
            cookies.set('treinador_id', treinador.id , '3MIN')
            cookies.set('treinador_nome', treinador.nome , '3MIN')
        },
        // editar(id) {
        //   this.$router.push({ name: "tipos-edit", params: { id: id } });
        // },
        // selecionar(tipo) {
        //   this.tipoSelecionado.id = tipo.id;
        //   this.tipoSelecionado.nome = tipo.nome;
        // },
        // inicializaTipo() {
        //   return {
        //     id: null,
        //     nome:null
        //   }
        // },
        // removerTipoSelecionado() {
        //   this.isLoading = true;
        //   TipoDataService.remover(this.tipoSelecionado.id)
        //   .then(() => {
        //     this.tipos = this.tipos.filter(tipo => tipo.id != this.tipoSelecionado.id);
        //     this.inicializaTipo();
        //     this.isLoading = false;
        //   })
        //   .catch(() => {
        //     this.inicializaTipo();
        //     this.isLoading = false;
        //   });
        // }
    },
    mounted() {
        this.buscarTodos();
    }
};
</script>
<template>
    <div class="row">
        <h2 class="mb-4 mt-4">Lista de Treinadores</h2>
        <div class="table-responsive">
            <loading v-model:active="isLoading" />
            <table class="table table-striped ">
                <thead>
                    <tr>
                        <th scope="col-1">Login</th>
                        <th scope="col-4">Nome do Treinador</th>
                        <th scope="col-2">Nome da Cidade</th>
                        <th scope="col-2">Nome da Região</th>
                        <th scope="col" colspan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="treinador in treinadores" :key="treinador.id">
                        <td>
                            <button type="button" class="btn btn-outline-primary" @click="trocarTreinador(treinador)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                    <path fill-rule="evenodd"
                                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                </svg>
                            </button>
                        </td>

                        <td>{{ treinador.nome }}</td>

                        <td>{{ treinador.endereco.cidade }}</td>

                        <td>{{ treinador.endereco.regiao }}</td>
                        <td>
                            <button type="button" class="btn btn-outline-warning" @click="editar(tipo.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                                data-bs-target="#confirmacaoExclusao" @click="selecionar(tipo)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path
                                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- <div class="modal fade" id="confirmacaoExclusao" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Confirmacao de exclusao</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Ao confirmar, o tipo "<strong>{{tipoSelecionado.nome}}</strong>" sera excluido.
                        Deseja continuar?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Cancelar
                        </button>
                        <button type="button" class="btn btn-primary" @click="removerTipoSelecionado"
                            data-bs-dismiss="modal">Sim</button>
                    </div>
                </div>
            </div>
        </div> -->
    </div>

    <button type="button" @click="editar(tipo.id)">
        novo
    </button>
</template>
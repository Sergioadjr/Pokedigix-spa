<script>
import AtaqueDataService from '../services/AtaqueDataService';
import Loading from "vue-loading-overlay";
import Ordenacao from "../components/Ordenacao.vue";
import Pesquisa from '../components/Pesquisa.vue'
import Paginacao from '../components/Paginacao.vue';

export default {
    name: "ataques-lista",
    data() {
        return {
            ataques: [],
            ataqueSelecionado: this.inicializaAtaque(),
            pagina: 1,
            tamanho: 5,
            ordenacao: {
                titulo: "",
                direcao: "",
                campo: ""
            },
            totalPaginas: '',
            quantidade: 3,
            opcoes: [{
                titulo: "Nome do Ataque: Crescente",
                direcao: "ASC",
                campo: "nome"
            },
            {
                titulo: "Nome do Ataque: Decrescente",
                direcao: "DESC",
                campo: "nome"
            },
            {
                titulo: "Força do Ataque: Crescente",
                direcao: "ASC",
                campo: "forca"
            },
            {
                titulo: "Força do Ataque: Decrescente",
                direcao: "DESC",
                campo: "forca"
            },
            
           ],
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
                this.buscarAtaques();
            }
        },
        trocarPagina(p) {
            this.pagina = p;
            this.buscarAtaques();
        },

        pesquisar(texto) {
            this.termo = texto;
            this.buscarAtaques();
        },
        
        buscarAtaques() {
            AtaqueDataService.buscarTodosPaginadoOrdenado(this.pagina - 1, this.tamanho, this.ordenacao.campo, this.ordenacao.direcao, this.termo)
                .then((resposta) => {
                    this.ataques = resposta.ataques;
                    this.totalPaginas = resposta.totalPaginas;
                })
                .catch((erro) => {
                    console.log(erro);
                });
        },

        filtrarDigitado() {
            if (this.termo.length >= 3) {
                this.buscarAtaques();
            }
        },


        editar(id) {
            this.$router.push({ name: 'ataques-edit', params: { id: id } });

        },
        selecionar(ataque) {
            this.ataqueSelecionado.id = ataque.id;
            this.ataqueSelecionado.nome = ataque.nome;
        },
        inicializaAtaque() {
            return {
                id: null,
                nome: null
            }
        },
        removerAtaqueSelecionado() {
            this.isLoading = true;
            AtaqueDataService.remover(this.ataqueSelecionado.id)
                .then(() => {
                    this.ataques = this.ataques.filter(ataque => ataque.id != this.ataqueSelecionado.id);
                    this.inicializaAtaque();
                    this.isLoading = false;
                })
                .catch(() => {
                    this.inicializaAtaque();
                    this.isLoading = false;
                });
        }
    },

    mounted() {
        this.buscarAtaques();
        this.ordenacao = this.opcoes[0];
    }
}
</script>
    
<template>
    <main>
        <div>
            <h2 class=" mb-4 mt-4">Lista de Ataques</h2>
            <div class="row mb-3">
                <div class="col-9 mb-3">
                    <Buscar></Buscar>
                </div>
                <div class="col-3 mb-3">
                    <Ordenacao v-model="ordenacao" @ordenar="buscarAtaques" :ordenacao="ordenacao" :opcoes="opcoes"/>
                </div>
                <Pesquisa :texto="termo" :pesquisar="pesquisar" />
            </div>
            <div class="table-responsive">
                <div class="container-0">
                    <loading v-model:active="isLoading" :is-full-page="fullPage" :loader="'spinner'" />

                    <table class="table table-dark table-striped table-bordered border-primary ">

                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome do Ataque</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Força</th>
                                <th scope="col">Acurácia</th>
                                <th scope="col">Pontos de Poder</th>
                                <th scope="col">Descrição</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="ataque in ataques" :key="ataque.id">
                                <th scope="row">{{ataque.id}}</th>
                                <td class="text-center">{{ataque.nome}}</td>
                                <td>{{ataque.tipo.nome}}</td>
                                <td>{{ataque.categoria}}</td>
                                <td>{{ataque.forca}}</td>
                                <td>{{ataque.acuracia}}</td>
                                <td>{{ataque.pontosDePoder}}</td>
                                <td>{{ataque.descricao}}</td>

                                <td><button type="button" class="btn btn-outline-warning" @click="editar(ataque.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path
                                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                </td>

                                <td>

                                    <button @click="selecionar(ataque)" type="button" class="btn btn-outline-danger"
                                        data-bs-toggle="modal" data-bs-target="#confirmacaoExclusao"
                                        data-bs-whatever="@mdo">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                        </svg>

                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal fade textoPreto" id="confirmacaoExclusao" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmacaoExclusao">Deseja confirmar a
                            exclusão ?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Ao excluir este ataque, "<strong>{{ataqueSelecionado.nome}}</strong>" não será mais possível
                        utiliza-lo.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button @click="removerAtaqueSelecionado" data-bs-dismiss="modal" type="button"
                            class="btn btn-primary">Excluir</button>
                    </div>
                </div>
            </div>
        </div>
        <Paginacao :totalPaginas="totalPaginas" :quantidade="quantidade" :atual="pagina" :trocarPagina="trocarPagina"></Paginacao>
    </main>
</template>

<style>
.textoPreto {
    color: black;
}
</style>

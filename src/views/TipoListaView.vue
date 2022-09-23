<script>
import TipoDataService from '../services/TipoDataService';

export default {
    name: "tipos-lista",
    data() {
        return { tipos: [] };
    },
    methods: {
        buscarTipos() {
            TipoDataService.buscarTodos()
                .then(resposta => {
                    this.tipos = resposta
                })
                .catch(erro => {
                    console.log(erro);
                });
        }
    },
    mounted() {
        this.buscarTipos();
    }
}
</script>

<template>
    <main>
        <div>
            <h2>Lista de Tipos</h2>
                <div class="row row-cols-md-3 g-6">
                    <div class=" text-white bg-dark mb-3 card border-primary mb-3" v-for="tipo in tipos" :key="tipo.id">
                        <ul>
                            <li>
                                {{tipo.nome}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    </main>
</template>

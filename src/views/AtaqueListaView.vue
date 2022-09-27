<script>
import AtaqueDataService from '../services/AtaqueDataService';
import AtaqueRequest from '../models/AtaqueRequest';
import AtaqueResponse from '../models/AtaqueResponse';

export default {
    name: "ataques-lista",
    data() {
        return { ataques: [] };
    },
    methods: {
        buscarAtaques() {
            AtaqueDataService.buscarTodos()
                .then(resposta => {
                    this.ataques = resposta
                })
                .catch(erro => {
                    console.log(erro);
                });
        }
    },
    mounted() {
        this.buscarAtaques();
    }
}
</script>
    
<template>
    <main>
        <div>
            <h2 class=" mb-4 mt-4">Lista de Ataques</h2>
            <div class="container  ">
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome do Ataque</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Força</th>
                            <th scope="col">Acurácia</th>
                            <th scope="col">Pontos de Poder</th>
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
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</template>
    
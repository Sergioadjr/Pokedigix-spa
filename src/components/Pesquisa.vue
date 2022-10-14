<script>
export default {
    name: 'pesquisa-texto',
    props: {
        texto: String,
        pesquisar: Function
    }
}
</script>

<template>
    <form class="d-flex" role="search">
        <input class="form-control me-2" v-model="texto" @keyup="pesquisar(texto)" type="search" placeholder="Procurar" aria-label="Filtrar">
        <button class="btn btn-outline-success" type="button" @click.prevent="pesquisar(texto)">Filtrar</button>
    </form>
</template>
<template>
    <div class="container-fluid text-center">
        <h1>Essa página não existe</h1>
        <img class="img-fluid w-50" title="spyduck" alt="imagem do spyduck" src="../../public/imagens/psyduck.png">

        <p class="text-lg-center"> Volte para a <RouterLink to="/"> PAGINA INICIAL</RouterLink>
        </p>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
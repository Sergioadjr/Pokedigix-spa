<script>
import { RouterLink } from 'vue-router';
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

export default {
    data() {
        return {
            nomeTreinador: ''
        }
    },

    mounted() {
        this.nomeTreinador = cookies.get('treinador_nome');
    }
}
</script>

<template>
    <header>
        <nav class=" sticky-top navbar navbar-dark navbar-expand-lg bg-dark">
            <div class="container-md">
                <a class="navbar-brand" href="#">Pokédigix</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink to="/" class="nav-link active" aria-current="page">Home</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/pokemons-selvagens" class="nav-link">Pokemons Selvagens</RouterLink>
                        </li>
                        <li class="nav-item dropdown">
                            <RouterLink class="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Treinadores
                            </RouterLink>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/treinadores/novo">Novo</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/treinadores/lista">Lista</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <RouterLink class="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Ataques
                            </RouterLink>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/ataques/novo">Novo</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/ataques/lista">Lista</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <RouterLink class="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Tipos
                            </RouterLink>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/tipos/novo">Novo</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/tipos/lista">Lista</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <RouterLink class="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Pokemons
                            </RouterLink>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/pokemons/novo">Novo</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/pokemons/lista">Lista</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown" v-if="nomeTreinador">
                            <RouterLink class="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                {{nomeTreinador}}
                            </RouterLink>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/treinadores/lista">Trocar</RouterLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

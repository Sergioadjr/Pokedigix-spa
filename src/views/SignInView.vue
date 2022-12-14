<script>

import AuthDataService from '../services/AuthDataService';

import LoginDTO from '../models/LoginDTO';

import LoginResponse from '../models/LoginResponse';

import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

export default {
    name: "Login",
    data() {
        return {
            loginResponse: new LoginResponse(),
            loginDTO: new LoginDTO(),
            lembrar: false
        };
    },

    methods: {
        acessar() {
            AuthDataService.acessar(this.loginDTO)
                .then(resposta => {
                    this.loginResponse=resposta;
                    cookies.set('usuarioLogado', this.loginResponse, tempoDeExpiracao());
                    this.$router.push({name: 'tipos-lista'});
                })
                .catch(erro => {
                    console.log(erro);
                })
        },
        tempoDeExpiracao(){
            return this.lembrar ? '1m':'30min';
        }
    },
    mounted() {
    }
}

</script>

<template>
    <div class="card mx-auto mt-3">
        <div class="mt-3 ms-2">
            <h3>Login</h3>
        </div>

        <form class="signin-form mt-3 col-md-5 mx-auto" @submit.prevent="acessar">
            <div class="form-group mb-3">
                <label class="form-label" for="name">Usuário</label>
                <input type="text" class="form-control" placeholder="Username" required v-model="loginDTO.username">
            </div>

            <div class="form-group mb-3">
                <label class="form-label" for="password">Senha</label>
                <input type="password" class="form-control" placeholder="Senha" required v-model="loginDTO.password">
            </div>

            <div class="form-group text-md-center">
                <button type="submit" class="center btn btn-success">Entrar</button>

                <div class="text-md-center">
                    <label class="checkbox-wrap checkbox-primary mb-1">Lembrar-me
                        <input type="checkbox" checked="lembrar">
                        <span class="checkmark"></span>
                    </label>
                </div>

                <div class="text-md-end mb-2">
                    <a href="#">Recuperar senha</a>
                </div>
            </div>
        </form>
    </div>
</template>
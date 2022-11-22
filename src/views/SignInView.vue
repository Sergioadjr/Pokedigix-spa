<script>
import { Toast } from 'bootstrap';

import AuthDataService from '../services/AuthDataService';

import MensagemErro from '../components/icons/MensagemErro.vue';
import MensagemSucessoVue from '../components/MensagemSucesso.vue';

export default {
    name: 'Login',
    data() {
        return {
            salvo: false,
        }
    },

    salvar() {
        AuthDataService.criar()
            .then(() => {
                this.salvo = true;
            })
            .catch(erro => {
                console.log(erro);
                const toastLiveExample = document.getElementById('liveToast')
                const toast = new Toast(toastLiveExample);
                toast.show();
                this.salvo = false;
            });
    }
}
</script>

<template>
    <div class="card mx-auto mt-3">
        <div class="mt-3 ms-2">
            <h3>Login</h3>
        </div>

        <form action="#" class="signin-form mt-3 col-md-5 mx-auto">
            <div class="form-group mb-3">
                <label class="form-label" for="name">Usuário</label>
                <input type="text" class="form-control" placeholder="Usuário" required="" autocomplete="off">
            </div>

            <div class="form-group mb-3">
                <label class="form-label" for="password">Senha</label>
                <input type="password" class="form-control" placeholder="Senha" required="" autocomplete="off">
            </div>

            <div class="form-group text-md-center">
                <button type="submit" class="center btn btn-success">Entrar</button>

                <div class="text-md-center">
                    <label class="checkbox-wrap checkbox-primary mb-1">Lembrar-me
                        <input type="checkbox" checked="">
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
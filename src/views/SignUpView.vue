<script>
import { Toast } from 'bootstrap';

import AuthDataService from '../services/AuthDataService';

import MensagemErro from '../components/icons/MensagemErro.vue';
import MensagemSucessoVue from '../components/MensagemSucesso.vue';

export default {
    name: 'Authentication',
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
    },

    mounted() {
        this.novo();
        const form = document.querySelector('.needs-validation')
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    },
}

</script>

<template>
    <div>
        <form class="row g-3 needs-validation" @submit.prevent="salvar" novalidate>
            <h3> Cadastro de Usuário</h3>

            <div class="container">
                <div class="row">
                    <div class="mx-auto">
                        <div class="col-8">
                            <label for="nome" class="form-label">Nome Completo</label>
                            <input type="text" class="form-control" id="nome">
                        </div>

                        <div class="col-8">
                            <label for="nome" class="form-label">E-mail</label>
                            <input type="email" class="form-control" id="email">
                        </div>

                        <div class="col-8">
                            <label for="nome" class="form-label">Senha</label>
                            <input type="password" class="form-control" id="senha">
                        </div>


                        <div class="row mt-2 ">
                            <div>
                                <button type="submit" class="btn btn-success">Salvar</button>
                            </div>
                            <div class="me-8 mt-2">
                                <button type="submit" class="btn btn-danger">Cancelar</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </form>
    </div>

</template>

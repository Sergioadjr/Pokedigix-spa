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
    <div class="card mx-auto mt-3">
        <div>
            <form class="row g-3 needs-validation mt-3 ms-2" @submit.prevent="salvar" novalidate>
                <div class="mt-3 ms-2">
                    <h3> Cadastro de Usuário</h3>
                </div>

                <div class="container">
                    <div class="row ms-2">
                        <div class="mx-auto">
                            <div class="col-8 mt-3">
                                <label for="nome" class="form-label">Nome Completo</label>
                                <input type="text" class="form-control" id="nome">
                            </div>

                            <div class="col-8">
                                <label for="email" class="form-label">E-mail</label>
                                <input type="email" class="form-control" id="email">
                            </div>

                            <div class="col-8">
                                <label for="senha" class="form-label">Senha</label>
                                <input type="password" class="form-control" id="senha">
                            </div>

                            <div class="d-grid gap-2 col-6 mx-auto ">
                                <div class="mt-3 mb-3">
                                    <button type="submit" class="btn btn-success me-md-2">Salvar</button>
                                    <button type="submit" class="btn btn-danger">Cancelar</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

</template>

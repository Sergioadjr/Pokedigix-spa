import { createRouter, createWebHistory } from 'vue-router';
const PokemonListaView = () => import('../views/PokemonListaView.vue');
const PokemonNovoView = () => import('../views/PokemonNovoView.vue');
const TipoNovoView = () => import('../views/TipoNovoView.vue');
const TipoListaView = () => import('../views/TipoListaView.vue');
const TipoEditView = () => import('../views/TipoEditView.vue');
const AtaqueNovoView = () => import('../views/AtaqueNovoView.vue');
const AtaqueEditView = () => import('../views/AtaqueEditView.vue');
const AtaqueListaView = () => import('../views/AtaqueListaView.vue');
const TreinadorListaView = () => import('../views/TreinadorListaView.vue');
const SignUpView = () => import('../views/SignUpView.vue');
const SignInView = () => import('../views/SignInView.vue');
const TreinadorNovoView = () => import('../views/TreinadorNovoView.vue');
const PageNotFound = () => import('../views/PageNotFound.vue');



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokemonListaView
    },
    {
      path: '/pokemons/lista',
      name: 'pokemons-lista',
      component: PokemonListaView
    },
    {
      path: '/pokemons/novo',
      name: 'pokemons-novo',
      component: PokemonNovoView
    },
    {
      path: '/treinadores/lista',
      name: 'treinadores-lista',
      component: TreinadorListaView
    },
    {
      path: '/treinadores/novo',
      name: 'treinadores-novo',
      component: TreinadorNovoView
    },
    {
      path: '/signup',
      name: 'Authentication',
      component: SignUpView
    },
    {
      path: '/signin',
      name: 'Login',
      component: SignInView
    },
    {
      path: '/tipos/novo',
      name: 'tipos-novo',
      component: TipoNovoView
    },
    {
      path: '/tipos/lista',
      name: 'tipos-lista',
      component: TipoListaView
    },
    {
      path: '/tipos/edit/:id',
      name: 'tipos-edit',
      component: TipoEditView
    },
    {
      path: '/ataques/novo',
      name: 'ataques-novo',
      component: AtaqueNovoView
    },
    {
      path: '/ataques/edit/:id',
      name: 'ataques-edit',
      component: AtaqueEditView
    },
    {
      path: '/ataques/lista',
      name: 'ataques-lista',
      component: AtaqueListaView
    },

    {
      path: '/:catchAll(.*)*',
      name: 'not-found',
      component: PageNotFound,
    },

  ]
})

export default router

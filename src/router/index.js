import { createRouter, createWebHistory } from 'vue-router'
import PokemonListaView from '../views/PokemonListaView.vue'
import PokemonNovoView from '../views/PokemonNovoView.vue'
import TipoNovoView from '../views/TipoNovoView.vue'
import TipoListaView from '../views/TipoListaView.vue'
import TipoEditView from '../views/TipoEditView.vue'
import AtaqueNovoView from '../views/AtaqueNovoView.vue'
import AtaqueEditView from '../views/AtaqueEditView.vue'
import AtaqueListaView from '../views/AtaqueListaView.vue'
import TreinadorListaView from '../views/TreinadorListaView.vue'
import TreinadorNovoView from '../views/TreinadorNovoView.vue'


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

  ]
})

export default router

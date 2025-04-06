import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: ListView,
    },
    {
      path: '/movie/:id',
      name: 'movie-details',
      component: () => import('../views/MovieDetailsView.vue'),
      props: true
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router

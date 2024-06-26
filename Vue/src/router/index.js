import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/schedule',
      name: 'schedule',
      component: HomeView
    },
    {
      path: '/admin/teams',
      name: 'addTeams',
      component: () => import('../components/TeamPost.vue')
    },
    {
      path: '/admin/leagues',
      name: 'addLeagues',
      component: () => import('../components/LeaguePost.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LandingView.vue')

    },

    
  ]
})

export default router

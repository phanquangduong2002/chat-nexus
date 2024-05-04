import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/modules/userStore'
import { gtka, localDeUserObjStore } from '../configs/connectServer'
import { checkTokenExpiration } from '../webServices/authorizationService'

const routes = [
  {
    path: '/auth/login',
    name: 'auth-login',
    component: () => import('@/pages/Auth/Login.vue')
  },
  {
    path: '/auth/signup',
    name: 'auth-signup',
    component: () => import('@/pages/Auth/Register.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home/Home.vue'),
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'error',
    component: () => import('../pages/Error/Error.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach(async (to, from, next) => {
  const user = localDeUserObjStore()
  const token = gtka()

  if (to.meta.isAuthenticated) {
    if (user && token) {
      const tokenIsValid = await checkTokenExpiration()
      if (tokenIsValid) {
        next()
      } else {
        next('/auth/login')
      }
    } else {
      next('/auth/login')
    }
  } else if (user && token && (to.path === '/auth/login' || to.path === '/auth/signup')) {
    next('/')
  } else {
    next()
  }
})

export default router

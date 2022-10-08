export const routes = [
  {
    path: '/',
    component: () => import('../views/TheLogin.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/TheDashboard.vue')
  },
]

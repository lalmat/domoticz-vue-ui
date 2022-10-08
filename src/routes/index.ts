import { createRouter, createWebHashHistory } from "vue-router"
import { routes } from './routes';

export const Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

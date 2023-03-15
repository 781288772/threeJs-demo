import {createRouter, createWebHashHistory} from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/home.vue')
    },
    {
        path: '/plane',
        name: 'plane',
        component: () => import('../pages/plane.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../pages/login.vue')
      }
  ]
});

export default router;
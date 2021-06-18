import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      component: () => import('@/views/LoginPage.vue'),
    },
    {
      path: '/main',
      name: 'AuthMain',
      component: () => import('@/views/MainPage.vue'),
    },
    {
      path: '/add',
      component: () => import('@/views/PostAddPage.vue'),
    },
    {
      path: '/post/:id',
      name: 'PostReadPage',
      component: () => import('@/views/PostReadPage.vue'),
    },
    {
      path: '/hashtag/:word',
      name: 'hashtag',
      component: () => import('@/views/MainPage.vue'),
    },
  ],
});

export default router;

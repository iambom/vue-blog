import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: () => import('@/views/LoginPage.vue'),
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupPage.vue'),
    },
    {
      path: '/',
      component: () => import('@/views/MainPage.vue'),
      children: [
        {
          path: '/',
          name: 'AuthMain',
          component: () => import('@/views/PostListsViewPage.vue'),
        },
        {
          path: '/add',
          name: 'AddPage',
          component: () => import('@/views/PostAddPage.vue'),
        },
        {
          path: '/post/:id',
          name: 'PostReadPage',
          component: () => import('@/views/PostReadPage.vue'),
        },
        {
          path: '/hashtag/:word',
          name: 'Hashtag',
          component: () => import('@/views/PostListsViewPage.vue'),
        },
      ],
    },
  ],
});

export default router;

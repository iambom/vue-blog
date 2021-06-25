import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

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

router.beforeEach((to, from, next) => {
  if (to.name === 'AuthMain' || to.name === 'Hashtag') {
    store.commit('SHOW_TAG_LIST', true);
  } else {
    store.commit('SHOW_TAG_LIST', false);
  }

  if (to.name === 'AddPage') {
    store.commit('SHOW_ADD_BTN', false);
  } else {
    store.commit('SHOW_ADD_BTN', true);
  }

  if (to.name === 'AuthMain') {
    store.commit('SHOW_GO_HOME_BTN', false);
  } else {
    store.commit('SHOW_GO_HOME_BTN', true);
  }
  next();
});

export default router;

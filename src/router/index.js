import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/login",
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/views/login/login.vue"),
      meta: {
        hideTabbar: false,
      }
    },
    {
      path: '/main',
      name: 'main',
      component: () => import("@/views/main/main.vue"),
      meta: {
        hideTabbar: true,
      }
    },
    {
      path: '/message',
      name: 'message',
      component: () => import("@/views/message/index.vue")
      ,
      meta: {
        hideTabbar: true,
      }
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import("@/views/contacts/index.vue"),
      meta: {
        hideTabbar: true,
      }
    },
    {
      path: '/world',
      name: 'world',
      component: () => import("@/views/world/index.vue"),
      meta: {
        hideTabbar: true,
      }
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: () => import("@/views/dynamic/index.vue"),
      meta: {
        hideTabbar: true,
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import("@/views/chat/index.vue"),
      meta: {
        hideTabbar: false,
      }
    },

  ]
})

export default router

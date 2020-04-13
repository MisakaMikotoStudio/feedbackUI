import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'

Vue.use(Router)

export const RouterMap = [
  {
    path: '/',
    name: '/',
    redirect: '/Dashboard',
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard/index.vue')
  },
  {
    path: '/GroupFeedback',
    name: 'GroupFeedback',
    component: () => import('@/views/GroupFeedback/index.vue')
  },
  {
    path: '/ReportFeedback',
    name: 'ReportFeedback',
    component: () => import('@/views/ReportFeedback/index.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404/index.vue')
  }
]

export default new Router({
  mode: 'history',
  linkActiveClass:'active',
  base: __dirname,
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: RouterMap
})

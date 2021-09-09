import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({ showSpinner: false }); 
// 修改 vue-router 原型链，不用 promise 方式
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: '/',
    hidden: true,
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { title: '登录' },
    hidden: true,
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
    meta: { title: '首页' },
    hidden: true,
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/map'),
    meta: { title: '乡村一张图' },
    hidden: true,
  },
  {
    path: '/map2',
    name: 'map2',
    component: () => import('@/views/map/map2'),
    meta: { title: '乡村一张图' },
    hidden: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

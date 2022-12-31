import { createRouter, createWebHistory } from 'vue-router'

// 定義路由表
const routes = [
  {
    path: '/',
    name: '主頁',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/order/:id',
    name: '點歌',
    component: () => import('../views/OrderSong.vue')
  },
  {
    path: '/rule',
    name: '社群規範和台規',
    component: () => import('../views/RulePage.vue')
  },
  {
    path: '/setting',
    name: '設定頁面',
    component: () => import('../views/SettingPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ERR 404 找不到頁面ㄛ',
    component: () => import('../views/NotFound.vue')
  }
]

// 執行路由表
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 }
  },
  routes
})

// 將 name 自動賦予至 head 中的 title
// router.beforeEach((to, from, next) => {
//   document.title = '夏特稀履歷表 | ' + to.name
//   next()
// })

export default router

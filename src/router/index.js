import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'bookhome', component: () => import('@views/Home'), meta: { title: '书库' } },
  
    {path: '/book/list', name: 'book-list', component: () => import('@views/book/List'), meta: { title: '书籍列表' } },
    {path: '/bdetail/:code', name: 'bookdetail', component: () => import('@views/book/Detail'), meta: { title: '书籍详情' } },
    {path: '/figure/list', name: 'figure-list', component: () => import('@views/figure/List'), meta: { title: '作家列表' } },
    {path: '/figure-:code', name: 'figure-detail', component: () => import('@views/figure/Detail'), meta: { title: '作家详情' } },
    {path: '/btag', name: 'booktag', component: () => import('@views/tag/List'), meta: { title: '书籍标签' } },
  
    {path: '/reader/:code/:id?', name: 'reader', component: () => import('@views/Reader'), meta: { title: '阅读' } },

    {path: '/shelf', name: 'vjob', component: BookLayout, children: [
    ]},
  ]
})

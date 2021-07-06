import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const BookLayout = resolve => require(['@/layouts/Book'], resolve)
const Home = resolve => require(['@/components/Home'], resolve)
const Ranklist = resolve => require(['@/components/ranklist/Ranklist'], resolve)
const RanklistDetail = resolve => require(['@/components/ranklist/RanklistDetail'], resolve)
const Book = resolve => require(['@/components/common/Book'], resolve)
const ReadBook = resolve => require(['@/components/book/ReadBook'], resolve)
const BookcatDetail = resolve => require(['@/components/category/BookcatDetail'], resolve)
const ChangeSource = resolve => require(['@/components/book/ChangeSource'], resolve)

export default new Router({
  routes: [
    {path: '/', name: 'bookhome', component: () => import('@views/Home'), meta: { title: '书库' } },
  
    {path: '/book/list', name: 'book-list', component: () => import('@views/book/List'), meta: { title: '书籍列表' } },
    {path: '/bdetail/:code', name: 'bookdetail', component: () => import('@views/book/Detail'), meta: { title: '书籍详情' } },
    {path: '/figure/list', name: 'figure-list', component: () => import('@views/figure/List'), meta: { title: '作家列表' } },
    {path: '/figure-:code', name: 'figure-detail', component: () => import('@views/figure/Detail'), meta: { title: '作家详情' } },
    {path: '/btag', name: 'booktag', component: () => import('@views/tag/List'), meta: { title: '书籍标签' } },
  
    {path: '/reader/:code/:id?', name: 'reader', component: () => import('@views/Reader'), meta: { title: '阅读' } },

    {path: '/shelf', name: 'vjob', component: BookLayout, children: [
      {path: '/', name: 'home', component: Home},
      {path: '/bookcat/detail', name: 'bookcatDetail', component: BookcatDetail},
      {path: '/readbook/:bookId', name: 'readbook', component: ReadBook},
      {path: '/book/:bookId', name: 'book', component: Book},
      {path: '/changeSource/:bookId', name: 'changeSource', component: ChangeSource},
      {path: '/ranklist', name: 'ranklist', redirect: '/ranklist/weekRank', component: Ranklist, children: [
        {path: '/ranklist/*', name: 'RanklistDetail', component: RanklistDetail}
      ]}
    ]},
  ]
})

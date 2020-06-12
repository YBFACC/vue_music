import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('@/views/login.vue')

const MusicList = () => import('@/components/music-list/music-list.vue')

const User = () => import('@/views/user.vue')
const Search = () => import('@/views/search.vue')
const Rank = () => import('@/views/rank.vue')
const Singer = () => import('@/views/singer.vue')
const Recommend = () => import('@/views/recommend.vue')

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: MusicList
      }
    ]
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/rank',
    component: Rank
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

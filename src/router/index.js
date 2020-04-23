import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('@/views/login.vue')
const User = () => import('@/views/user.vue')
const MusicList = () => import('@/views/music-list.vue')
const Play = () => import('@/views/play.vue')

const Home = () => import(/* webpackChunkName:"home"*/ '@/views/home.vue')
const Search = () => import('@/views/home-components/search/search.vue')
const Rank = () => import('@/views/home-components/rank/rank.vue')
const Singer = () => import('@/views/home-components/singer/singer.vue')
const Recommend = () =>
  import('@/views/home-components/recommend/recommend.vue')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        redirect: 'recommend'
      },
      {
        path: 'recommend',
        component: Recommend
      },
      {
        path: 'singer',
        component: Singer
      },
      {
        path: 'rank',
        component: Rank
      },
      {
        path: 'search',
        component: Search
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/music_list',
    component: MusicList
  },
  {
    path: '/user',
    name: 'User',
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

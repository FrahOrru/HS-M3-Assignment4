import { createRouter, createWebHistory } from 'vue-router';
const Home = () => import('../views/Home.vue')
const StateDetail = () => import('../views/detail/StateDetail.vue')
const StateList = () => import('../components/StatesList.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
      path: '/states',
      component: StateList
    },
    {
      path: '/states/:id',
      component: StateDetail,
      props: true
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
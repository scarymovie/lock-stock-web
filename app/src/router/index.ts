import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import CreateUserView from '../views/CreateUserView.vue'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        redirect: '/create-user',
    },
    {
        path: '/create-user',
        name: 'create-user',
        component: CreateUserView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

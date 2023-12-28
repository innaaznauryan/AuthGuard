import {createRouter, createWebHistory} from "vue-router"
import Home from '../components/Home.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {requiresAuth: true},
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../components/Login.vue"),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import("../components/Register.vue"),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import("../components/Profile.vue"),
        meta: {requiresAuth: true},
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.accessToken
    if (to.meta.requiresAuth) {
        if (!isAuthenticated) {
            next('/login')
        } else {
            if (to.path === '/login' || to.path === '/register') {
                next('/')
            } else {
                next()
            }
        }
    } else {
        if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
            next('/')
        } else {
            next()
        }
    }
})

export default router
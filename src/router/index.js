import { createWebHashHistory } from 'vue-router'
import {createRouter} from 'vue-router'
// import Layout from '@/layouts/BasicLayout'
import Layout from '@/layouts/BasicLayout.vue'


const routes = [
    {
        path:'/',
        component: Layout,
        meta:{
            requiresAuth: true,
            name: '首页'
        },
        redirect:'/home',
        children: [
            {
                path: 'home',
                component: () => import('@/views/home/index.vue'),
                name: 'Home',
                meta:{
                    name: '首页'
                },
            },
            {
                path: 'need',
                component: () => import('@/views/need/index.vue'),
                name: 'Need',
                meta:{
                    name: '需求'
                }
            },
            {
                path: 'supply',
                component: () => import('@/views/supply/index.vue'),
                name: 'Supply',
                meta:{
                    name: '供应'
                }
                
            },
            {
                path: 'shop',
                component: () => import('@/views/shop/index.vue'),
                name: 'Shop',
                meta:{
                    name: '积分商城'
                }
            },
            {
                path: 'exchange',
                component: () => import('@/views/exchange/index.vue'),
                name: 'Exchange',
                meta:{
                    name: '兑换'
                }
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta:{
            requiresAuth: false,
            name: '登录'
        },
        component: () => import('@/views/login/index.vue')
    },
]

const router =createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
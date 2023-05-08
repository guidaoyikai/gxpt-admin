import router from "./index"
import {getToken} from "@/utils/auth"

router.beforeEach((to, from, next) => {
    if (to.matched.length > 0 && to.matched.some(record => record.meta.requiresAuth)) {
        let token = getToken()
        if (!token) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() 
    }   
})
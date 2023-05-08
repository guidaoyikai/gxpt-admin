import axios from "axios";
import {getToken} from "./auth"
const service = axios.create({
    baseURL:"http://127.0.0.1:5173/admin"
})

//请求拦截
service.interceptors.request.use(config => {
    config.headers['token'] = getToken();
    return config
})
//响应拦截
service.interceptors.response.use(res=> {
    return res
}, err=>{
    return Promise.reject(err)
})


export default service
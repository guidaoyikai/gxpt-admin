import service from "../utils/request";

export function login(data){
    return service({
        method:'post',
        url:'/login',
        data
    })
}
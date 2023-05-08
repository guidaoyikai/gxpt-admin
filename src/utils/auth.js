//保存token
export function setToken(token){
    localStorage.setItem('token', token)
}
//获取
export function getToken(){
   return localStorage.getItem('token')
}
//清除
export function removeToken(token){
    localStorage.removeItem('token')
}
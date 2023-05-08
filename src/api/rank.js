import service from "../utils/request";
export function getRankList(){
    return service({
        method:'get',
        url:'/rank',
    })
}
export function payRankList(data){
    return service({
        method:'post',
        url:'/rank',
        data:data
    })
}

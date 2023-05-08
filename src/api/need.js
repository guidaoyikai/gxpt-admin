import service from "../utils/request";
export function getNeedList(page){
    return service({
        method:'get',
        url:'/need',
        params: {
            page:page,
        }
    })
}


export function through(needId){
    return service({
        method:'put',
        url:`/need/through/${needId}`,
    })
}


export function noPass(needId){
    return service({
        method:'put',
        url:`/need/noPass/${needId}`,
    })
}
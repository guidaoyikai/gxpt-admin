import service from "../utils/request";
export function getSupplyList(page){
    return service({
        method:'get',
        url:'/supply',
        params: {
            page:page,
        }
    })
}


export function through(needId){
    return service({
        method:'put',
        url:`/supply/through/${needId}`,
    })
}


export function noPass(needId){
    return service({
        method:'put',
        url:`/supply/noPass/${needId}`,
    })
}
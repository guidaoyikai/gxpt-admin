import service from "../utils/request";
export function getExchangeList(page){
    return service({
        method:'get',
        url:'/exchange',
        params: {
            page:page,
        }
    })
}


export function through(id){
    return service({
        method:'put',
        url:`/exchange/through/${id}`,
    })
}


export function noPass(id){
    return service({
        method:'put',
        url:`/exchange/noPass/${id}`,
    })
}

export function sendMsg(data){
    return service({
        method:'put',
        url:`/exchange/sendMsg`,
        data:data
        
    })
}
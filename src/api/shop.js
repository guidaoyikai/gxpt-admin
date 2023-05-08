import service from "../utils/request";
export function getShopList(page){
    return service({
        method:'get',
        url:'/shop',
        params: {
            page:page,
        }
    })
}


export function down(needId){
    return service({
        method:'delete',
        url:`/shop/${needId}`,
    })
}


export function publish(data,config){
    return service.post(
        '/shop/publish', 
        data,
        config)
}
import request from"@/utils/request"
// 1.获取订单列表(带查询功能)
export const list = params=>{
    return request({
        method:"get",
        url:"/order/list",
        params
    })
}
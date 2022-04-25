import request from"@/utils/request"
// 1.获取分类
export const catelist = (params)=>{
    return request({
        method:"get",
        url:"/goods/catelist",
        params
    })
}
// 2.修改分类
export const editcate = (data)=>{
    return request({
        method:"post",
        url:"/goods/editcate",
        data
    })
}
// 3.删除分类
export const delcate = (params)=>{
    return request({
        method:"get",
        url:"/goods/delcate",
        params
    })
}
// 4.添加分类
export const addcate = (data)=>{
    return request({
        method:"post",
        url:"/goods/addcate",
        data
    })
}
// 5.查询所有分类名称
export const categories = (params)=>{
    return request({
        method:"get",
        url:"/goods/categories",
        params
    })
}
const IP = "http://127.0.0.1:5000"
export const USER_IMGS_LOAD = IP+"/upload/imgs/goods_img/"
// 6.商品图片上传接口
export const goods_img_upload = IP+"/goods/goods_img_upload"
// 7.添加商品
export const add = (data)=>{
    return request({
        method:"post",
        url:"/goods/add",
        data
    })
}
// 8.获取商品列表
export const list = (params)=>{
    return request({
        method:"get",
        url:"/goods/list",
        params
    })
}
// 9.删除商品
export const del = (params)=>{
    return request({
        method:"get",
        url:"/goods/del",
        params
    })
}
// 10.修改商品
export const edit = (data)=>{
    return request({
        method:"post",
        url:"/goods/edit",
        data
    })
}

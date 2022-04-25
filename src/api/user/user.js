// 引入配置好的axios
import request from "@/utils/request"
// 1.登录
export const checkLogin = (data)=>{
    return request({
        method:"post",
        url:"/users/checkLogin",
        data
    })
}
// 2.验证token是否过期
export const checktoken = (params)=>{
    return request({
        method:"get",
        url:"/users/checktoken",
        params
    })
}
// 3.获取账号（个人中心）信息
export const accountinfo = (params)=>{
    return request({
        method:"get",
        url:"/users/accountinfo",
        params
    })
}
// 4.添加账号
export const accountadd = (data)=>{
    return request({
        method:"post",
        url:"/users/add",
        data
    })
}
// 5.获取账号列表
export const accountlist = (params)=>{
    return request({
        method:"get",
        url:"/users/list",
        params
    })
}
// 6.删除账号
export const accountdel = (params)=>{
    return request({
        method:"get",
        url:"/users/del",
        params
    })
}
// 7.批量删除账号
export const accountbatchdel = (params)=>{
    return request({
        method:"get",
        url:"/users/batchdel",
        params
    })
}
// 8.修改账号
export const accountedit = (data)=>{
    return request({
        method:"post",
        url:"/users/edit",
        data
    })
}
const IP = "http://127.0.0.1:5000"
// 9.头像上传接口
export const USER_IMGS_UPLOAD = IP + "/users/avatar_upload"
// 10.用户头像存储位置
export const USER_IMGS_LOAD = IP + "/upload/imgs/acc_img/"

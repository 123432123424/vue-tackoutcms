// 配置axios
import axios from "axios"
// 配置默认ip与端口
axios.defaults.baseURL="http://127.0.0.1:5000"
// 配置默认相应时间
axios.defaults.timeout=10000
// 请求拦截
axios.interceptors.request.use(config=>{
    return config
},err=>{
    return Promise.reject(err)
})
// 相应拦截
axios.interceptors.response.use(response=>{
    return response
},err=>{
    return Promise.reject(err)
})
// 暴露
export default axios
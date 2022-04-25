// 年月日格式
export const setYMDforfat=(time)=>{
    let date = new Date(time)
    return `${date.getFullYear()}/${date.getMonth().toString().padStart(2,"0")}/${date.getDate().toString().padStart(2,"0")}`
}
// 年月日时分秒格式
export const setYMDHMSforfat=(time)=>{
    let date = new Date(time)
    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2,"0")}-${date.getDate().toString().padStart(2,"0")} ${date.getHours().toString().padStart(2,"0")}:${date.getMinutes().toString().padStart(2,"0")}:${date.getSeconds().toString().padStart(2,"0")}`
}
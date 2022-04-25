<template>
  <div class="ordercontainer">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入接口
import {list} from "@/api/order/order"
export default {
    data(){
        return {
          // 表单数据
            formInline:{

            }
        }
    },
    // 普通方法
    methods:{
      // 查询
      onSubmit(){

      },
      async getorderData(params){
        let res = await list({...params})
        console.log(res.data);
      }
    },
    // 钩子函数发送请求
    created(){
      this.getorderData()
    }
};
</script>

<style lang="less" scoped>
</style>
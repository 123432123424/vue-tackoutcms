<template>
  <div class="usersaddContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加账号</span>
      </div>
      <!-- 表单内容 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 账号输入框 -->
        <el-form-item label="账号" prop="account">
          <el-input
            type="text"
            v-model="ruleForm.account"
            autocomplete="off"
            style="width: 218px"
          ></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            style="width: 218px"
          ></el-input>
        </el-form-item>
        <!-- 用户组下拉 -->
        <el-form-item label="用户组">
          <el-select v-model="userGroup" placeholder="请选择用户组">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { accountadd } from "@/api/user/user";
export default {
  data() {
    var validateaccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (!/^[a-z0-9_-]{3,15}$/.test(value)) {
        return callback(
          new Error("3到15个字符，只能包含小写字符，数字或特殊符号_-")
        );
      } else {
        callback();
      }
    };
    var validatepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^[\w]{6,18}$/.test(value)) {
        callback(new Error("密码必须是6~18位之间的数字"));
      } else {
        callback();
      }
    };
    return {
      // 双向数据绑定
      ruleForm: {
        account: "",
        password: "",
      },
      userGroup: "",
      // 下拉菜单
      options: [
        {
          label: "超级管理员",
          value: "超级管理员",
        },
        {
          label: "普通管理员",
          value: "普通管理员",
        },
      ],
      // 验证
      rules: {
        account: [{ validator: validateaccount, trigger: "blur" }],
        password: [{ validator: validatepassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 添加账号接口
    async accountsubmit() {
      let res = await accountadd({
        account: this.ruleForm.account,
        password: this.ruleForm.password,
        userGroup: this.userGroup,
      });
      let {code,msg} = res.data
      if(code===0){
        this.$message({
          message:msg,
          type:"success"
        })
        this.$router.push("/users/userslist")
      }
      else{
        this.$message.error(msg)
      }
    },
    // 提交添加账号
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.accountsubmit()
        } else {
          this.$message.error("请以正确的格式提交！");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.clearfix {
  > span {
    font-size: 16px;
  }
}
</style>
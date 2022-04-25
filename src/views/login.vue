<template>
  <div class="Logincontainer">
    <div class="container">
      <h3>深圳饭团后台管理系统</h3>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <!-- 用户输入 -->
        <el-form-item prop="account">
          <el-input
            type="text"
            v-model="ruleForm.account"
            autocomplete="off"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 密码输入 -->
        <el-form-item prop="password">
          <el-input
            :type="isShow ? 'text' : 'password'"
            v-model="ruleForm.password"
            autocomplete="off"
            prefix-icon="el-icon-lock"
          >
            <!-- 以插槽的形式动态添加图标 -->
            <i
              slot="suffix"
              @click="isShow = !isShow"
              :class="isShow ? 'iconfont icon-oeye' : 'iconfont icon-ceye'"
            ></i>
          </el-input>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" class="btn" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 导入用户登录api
import { checkLogin } from "@/api/user/user";
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
      // 表单数据
      ruleForm: {
        account: "",
        password: "",
      },
      //   自动验证
      rules: {
        account: [{ validator: validateaccount, trigger: "blur" }],
        password: [{ validator: validatepassword, trigger: "blur" }],
      },
      //   控制显示或隐藏
      isShow: false,
    };
  },
  methods: {
    //   提交表单触发的事件
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await checkLogin({
            account: this.ruleForm.account,
            password: this.ruleForm.password,
          });
          let { code, msg } = res.data;
          if (code === 0) {
            let { id, role, token } = res.data;
            //   将数据存储到本地(简写形式)
            localStorage.id = id;
            localStorage.role = role;
            localStorage.token = token;
            //   动态提示
            this.$message({
              message: msg,
              type: "success",
            });
            // 路由跳转
            this.$router.push("/main");
          } else {
            this.$message({
              message: msg,
              type: "error",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.Logincontainer {
  background: url("@/assets/images/backImg.jpg") #d8d6d7 left center no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
  .container {
    width: 500px;
    height: 500px;
    position: absolute;

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    // transform: translate(-250px, -250px);
    h3 {
      color: #fff;
      text-align: center;
      font-size: 36px;
      //   font-weight: bold;
      line-height: 140px;
    }
    .demo-ruleForm {
      padding: 70px 105px;
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: #adadad 0px 0px 10px;
      border-radius: 20px;
      .el-form-item {
        margin-bottom: 12px;
      }
      /deep/.el-input__inner {
        background-color: #fff;
        height: 30px;
      }
      .btn {
        height: 30px;
        padding: 0;
        font-size: 13px;
        width: 100%;
      }
    }
  }
}
</style>
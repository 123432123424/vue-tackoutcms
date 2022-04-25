<template>
  <div class="accountinfocontainer">
    <el-card>
      <div slot="header" class="clearfix">
        <span>管理员信息</span>
      </div>
      <div>管理员ID：{{ userInfo.id }}</div>
      <el-divider></el-divider>
      <div>账号：{{ userInfo.account }}</div>
      <el-divider></el-divider>
      <div>用户组：{{ userInfo.userGroup }}</div>
      <el-divider></el-divider>
      <div>创建时间：{{ userInfo.ctime | setYMDforfat }}</div>
      <el-divider></el-divider>
      <div class="avatar-content">
        <span>管理员头像：</span>
        <el-upload
          class="avatar-uploader"
          :action="USER_IMGS_UPLOAD"
          :show-file-list="false"
          :data="{id:userInfo.id}"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-card>
  </div>
</template>

<script>
import { accountinfo,USER_IMGS_UPLOAD,USER_IMGS_LOAD } from "@/api/user/user";
export default {
  // 用户数据
  data() {
    return {
      userInfo: {},
      imageUrl: "",
      USER_IMGS_UPLOAD:"",
    };
  },
  // 自定义方法
  methods: {
    // 头像上传成功后返回的响应数据
    handleAvatarSuccess(res) {
      let {code,msg,imgUrl} = res
      if(code===0){
          this.$message({
              message:msg,
              type:"success"
          })
          this.imageUrl = USER_IMGS_LOAD+imgUrl
        //   绑定触发事件，通知导航自动更新头像
        this.$bus.$emit("upload","更新了")
      }else this.$message.error(msg)
    },
    // 图片上传时的需求
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //   获取用户数据
    async getaccountInfo() {
      let res = await accountinfo({ id: localStorage.id });
      this.userInfo = res.data.accountInfo;
      this.imageUrl = res.data.accountInfo.imgUrl;
    },
  },
  created() {
    this.getaccountInfo();
    this.USER_IMGS_UPLOAD = USER_IMGS_UPLOAD
  },
};
</script>

<style lang="less" scoped>
.el-card {
  div {
    font-size: 16px;
  }
}
.avatar-content{
    display: flex;
    align-items: center;
    >span{
        margin-right: 10px;
    }
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
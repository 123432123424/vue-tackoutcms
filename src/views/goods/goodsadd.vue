<template>
  <div class="goodsaddcontainer">
    <el-card>
      <!-- 标题 -->
      <div slot="header">
        <span style="font-size: 16px">商品添加</span>
      </div>
      <!-- 主题内容 -->
      <!-- 商品名称 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input
            style="width: 420px"
            v-model="form.name"
            placeholder="商品名称"
          ></el-input>
        </el-form-item>
        <!-- 商品分类 -->
        <el-form-item label="商品分类">
          <el-select v-model="form.category" placeholder="请选择商品分类">
            <el-option
              v-for="item in categorielist"
              :key="item.cateName"
              :label="item.cateName"
              :value="item.cateName"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品价格 -->
        <el-form-item label="商品价格">
          <el-input-number
            v-model="form.price"
            :precision="2"
            :min="1.0"
          ></el-input-number>
        </el-form-item>
        <!-- 商品图片 -->
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            :action="goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <el-input
            type="textarea"
            style="width: 420px"
            v-model="form.goodsDesc"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit"
            >添加商品</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { categories, goods_img_upload,USER_IMGS_LOAD,add } from "@/api/goods/goods";
export default {
  // 数据
  data() {
    return {
      // 商品图片(只是暂时展示,与提交表单的无关)
      imageUrl: "",
      // 商品分类
      categorielist: [],
      // 商品信息
      form: {
        name: "",
        category: "",
        price: "1",
        imgUrl: "",
        goodsDesc: "",
      },
    };
  },
  // 普通方法
  methods: {
    // 表单提交
    async onSubmit() {
      let res = await add({...this.form})
      let {code,msg}=res.data
      if(code===0){
        this.$message({
          message:msg,
          type:"success"
        })
        // 添加成功后自动跳转
        this.$router.push("/goods/goodslist")
      }else this.$message.error(msg)
    },
    // 获取商品分类的数据
    async getcategorielist() {
      let res = await categories();
      this.categorielist = res.data.categories;
      // console.log(this.categorielist);
    },
    // 提交成功后返回的回调
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      if(code===0){
        this.$message({
          message:msg,
          type:"success"
        })
      this.imageUrl=USER_IMGS_LOAD+imgUrl
      this.form.imgUrl=imgUrl
      }else this.$message.error(msg)
    },
    // 验证图片是否符合规则
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
  },
  // 钩子函数
  created() {
    this.getcategorielist();
    // 图片提交接口
    this.goods_img_upload = goods_img_upload;
    this.USER_IMGS_LOAD = USER_IMGS_LOAD
  },
};
</script>

<style lang="less" scoped>
.row {
  display: flex;
  align-items: center;
  > span {
    margin: 0 20px;
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
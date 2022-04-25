<template>
  <div class="goodslistcontainer">
    <el-card>
      <div slot="header">
        <span style="font-size: 16px">商品列表</span>
      </div>
      <!-- 表格数据 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="玩命加载中"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime | setYMDHMSforfat }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"> </el-table-column>
        <el-table-column label="所属分类" prop="category"> </el-table-column>
        <el-table-column label="商品价格" prop="price"> </el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img
              style="width: 40px"
              :src="USER_IMGS_LOAD + scope.row.imgUrl"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              type="primary"
              class="editform"
              >编辑</el-button
            >
            <el-dialog title="商品编辑" :visible.sync="dialogFormVisible">
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
                  <el-select
                    :popper-append-to-body="popper"
                    v-model="form.category"
                    placeholder="请选择商品分类"
                  >
                    <el-option
                      v-for="item in options"
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
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogFormVisible = false"
                  >取 消</el-button
                >
                <el-button size="small" type="primary" @click="onSubmit"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页数据 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 引入接口模块
import {
  list,
  USER_IMGS_LOAD,
  goods_img_upload,
  del,
  edit,
  categories,
} from "@/api/goods/goods";
export default {
  // 数据
  data() {
    return {
      // 加载
      loading: false,
      popper: false,
      // 图片路径
      imageUrl: "",
      // 分类数据
      options: [],
      // 对话框数据
      form: {},
      // 控制对话框显示或者隐藏
      dialogFormVisible: false,
      // 表格数据
      tableData: [],
      //   当前页码
      currentPage: 1,
      //   页数组成的数组
      pageSizes: [5, 10, 15, 20],
      // 每页条数
      pageSize: 5,
      //   总页数
      total: 0,
    };
  },
  // 方法
  methods: {
    //   修改商品提交
    async onSubmit() {
      // 删除不必要的内容
      delete this.form.ctime;
      delete this.form.rating;
      delete this.form.ratings;
      delete this.form.sellCount;
      let res = await edit({ ...this.form });
      let { code, msg } = res.data;
      if (code === 0) {
        this.$message({
          message: msg,
          type: "success",
        });
        // 添加成功后自动跳转
        this.dialogFormVisible = false;
        this.getTableData();
      } else this.$message.error(msg);
    },
    // 提交成功后返回的回调
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({
          message: msg,
          type: "success",
        });
        this.imageUrl = USER_IMGS_LOAD + imgUrl;
        this.form.imgUrl = imgUrl;
      } else this.$message.error(msg);
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
    //   更改了页数
    handleSizeChange(row) {
      this.pageSize = row;
      this.getTableData();
    },
    //   更改了当前页数
    handleCurrentChange(row) {
      this.currentPage = row;
      this.getTableData();
    },
    //   点击删除触发的回调
    handleDelete(index, item) {
      this.$confirm("此操作将永久删除该商品！是否继续?", "饭团温馨提示:", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await del({ id: item.id });
          let { code, msg } = res.data;
          if (code === 0) {
            this.$notify({
              title: "成功",
              type: "success",
              message: msg,
            });
            this.getTableData();
          } else
            this.$notify.error({
              title: "出错了",
              message: "商品删除出错",
            });
        })
        .catch(() => {
          this.$notify({
            title: "取消",
            message: "已取消删除",
            type: "success",
          });
        });
    },
    // 点击编辑出发的回调
    handleEdit(index, item) {
      this.dialogFormVisible = true;
      this.form = { ...item };
      this.imageUrl = USER_IMGS_LOAD + item.imgUrl;
    },
    async getoptions() {
      let res = await categories();
      this.options = res.data.categories;
    },
    async getTableData() {
      this.loading = true;

      let res = await list({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      //   容错处理
      if (this.currentPage !== 1 && res.data.data.length === 0) {
        this.currentPage -= 1;
        this.getTableData();
      }
      this.loading = false;
      this.tableData = res.data.data;
      this.total = res.data.total;
    },
  },
  //   钩子函数调用
  created() {
    this.getTableData();
    this.getoptions();
    this.USER_IMGS_LOAD = USER_IMGS_LOAD;
    this.goods_img_upload = goods_img_upload;
  },
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 50px;
  box-sizing: border-box;
  width: 30%;
}
.el-pagination {
  margin-top: 20px;
}
.editform {
  margin-right: 10px;
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
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
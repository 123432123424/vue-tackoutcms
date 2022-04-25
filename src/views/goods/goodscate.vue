<template>
  <div class="goodscatecontainer">
    <el-card>
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>商品分类</span>
        <el-button
          style="float: right"
          size="small"
          type="primary"
          @click="addForm"
          >添加分类</el-button
        >
        <el-dialog
          width="30%"
          title="添加分类"
          :visible.sync="dialogFormVisible"
        >
          <el-form :model="form">
            <el-form-item label="分类名称" label-width="120px">
              <el-input
                style="width: 220px"
                v-model="form.cateName"
                autocomplete="off"
                placeholder="分类名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否启用" label-width="120px">
              <el-switch
                v-model="form.state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="editcancel">取 消</el-button>
            <el-button size="small" type="primary" @click="definitadd"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="multipleTable"
        v-loading="loading"
        element-loading-text="玩命加载中"
      >
        >
        <!-- 序号 -->
        <el-table-column
          label="序号"
          width="150"
          type="index"
        ></el-table-column>
        <!-- 分类名称 -->
        <el-table-column label="分类名称" width="380">
          <template slot-scope="scope">
            <span v-show="!scope.row.isEdit">{{ scope.row.cateName }}</span>
            <el-input
              v-show="scope.row.isEdit"
              v-model="scope.row.cateName"
            ></el-input>
          </template>
        </el-table-column>
        <!-- 是否启用 -->
        <el-table-column label="是否启用" width="380">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="!scope.row.isEdit"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              :type="scope.row.isEdit ? 'success' : ''"
              size="mini"
              class="editBtn"
              @click="editForm(scope.row)"
              >{{ scope.row.isEdit ? "完成" : "编辑" }}</el-button
            >
            <!-- 提示文本 -->
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              confirm-button-type="primary"
              icon-color="red"
              title="确定要删除该分类吗？"
              @confirm="confirm(scope.$index, scope.row)"
              @cancel="cancel"
            >
              <el-button slot="reference" size="mini" type="danger"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 引入账号的接口
import { catelist, editcate, delcate, addcate } from "@/api/goods/goods";
export default {
  data() {
    return {
      // 编辑表单的数据
      form: {
        cateName: "",
        state: true,
      },
      // 控制编辑框显示和隐藏
      dialogFormVisible: false,
      // 加载
      loading: false,
      // 当前页码
      currentPage: 1,
      // 每页条数
      pageSize: 5,
      // 总页数
      total: 0,
      // 账号列表数据
      tableData: [],
    };
  },
  //   普通方法
  methods: {
    // 确定添加
    async definitadd() {
      // 编辑表单调用接口
      let res = await addcate({
        cateName: this.form.cateName,
        state: this.form.state,
      });
      let { code, msg } = res.data;
      if (code === 0) {
        this.$message({
          message: msg,
          type: "success",
        });
        this.dialogFormVisible = false;
      } else {
        this.$message.error(msg);
      }
    },
    // 取消编辑触发的回调
    editcancel() {
      this.dialogFormVisible = false;
      this.$message({
        message: "已取消添加",
        type: "info",
      });
    },
    //   添加分类触发的回调
    addForm() {
      this.dialogFormVisible = true;
    },
    //   编辑
    async editForm(item) {
      if (item.isEdit) {
        let res = await editcate({
          id: item.id,
          cateName: item.cateName,
          state: item.state,
        });
        let { code, msg } = res.data;
        if (code === 0) {
          this.$message({
            message: msg,
            type: "success",
          });
        } else this.$message.error(msg);
      } else {
      }
      item.isEdit = !item.isEdit;
    },
    // 取消删除
    cancel() {
      this.$message("取消成功");
    },
    // 单个删除
    async confirm(index, item) {
      let res = await delcate({
        id: item.id,
      });
      let { code, msg } = res.data;
      if (code === 0) {
        this.$message({
          message: msg,
          type: "success",
        });
        // 重新拉取数据
        this.gettablelist();
      } else {
        this.$message.error(msg);
      }
    },
    // 更改当前页码的回调
    handleCurrentChange(val) {
      // 拉取数据
      this.currentPage = val;
      this.gettablelist();
    },
    // 点击取消选择
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    // 多选框触发的事件
    handleSelectionChange(val) {
      this.selectList = val;
    },
    //   拉取账号列表的数据
    async gettablelist() {
      this.loading = true;
      const currentPage = this.currentPage;
      const pageSize = this.pageSize;
      let res = await catelist({
        currentPage,
        pageSize,
      });
      this.loading = false;

      // 容错判断
      if (this.currentPage != 1 && res.data.data.length === 0) {
        this.currentPage -= 1;
        this.gettablelist();
      }
      // 更新数据
      this.tableData = res.data.data.map((item) => {
        item.isEdit = false;
        item.state = item.state === 1;
        return item;
      });
      this.total = res.data.total;
    },
    //   编辑后执行的回调
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  //   钩子函数
  created() {
    this.gettablelist();
  },
};
</script>

<style lang="less" scoped>
.clearfix {
  > span {
    font-size: 16px;
  }
}
.el-pagination {
  margin-top: 20px;
}
.editBtn {
  margin-right: 10px;
}
.el-table {
  height: 312px;
}
</style>
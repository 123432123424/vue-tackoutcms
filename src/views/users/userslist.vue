<template>
  <div class="userslistcontainer">
    <el-card>
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>账号列表</span>
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        v-loading="loading"
        element-loading-text="玩命加载中"
      >
        >
        <!-- 多选框 -->
        <el-table-column type="selection"> </el-table-column>
        <!-- 账号 -->
        <el-table-column label="账号" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <!-- 用户组 -->
        <el-table-column label="用户组" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.userGroup }}</span>
          </template>
        </el-table-column>
        <!-- 创建时间 -->
        <el-table-column label="创建时间" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.ctime | setYMDforfat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              class="editBtn"
              @click="editForm(scope.row)"
              >编辑</el-button
            >
            <el-dialog 
            width="30%" 
            title="账号编辑" 
            :visible.sync="dialogFormVisible"
            >
              <el-form :model="form">
                <el-form-item label="账号" label-width="120px">
                  <el-input style="width:220px" v-model="form.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户组" label-width="120px">
                  <el-select v-model="form.userGroup" placeholder="请选择用户组">
                    <el-option v-for="item in userGrouplist"
                    :key="item.label" 
                    :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="editcancel">取 消</el-button>
                <el-button size="small" type="primary" @click="definitedit"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
            <!-- 提示文本 -->
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              confirm-button-type="primary"
              icon-color="red"
              title="确定要删除该账号吗？"
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 两个按钮 -->
      <div style="margin-top: 20px">
        <el-button type="danger" size="small" @click="checkbatchdel"
          >批量删除</el-button
        >
        <el-button type="primary" size="small" @click="toggleSelection"
          >取消选择</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入账号的接口
import { accountlist, accountdel, accountbatchdel,accountedit } from "@/api/user/user";
export default {
  data() {
    return {
      // 加载
      loading:false,
      // 管理员数据
      userGrouplist:[{
        label:"普通管理员",
        value:"普通管理员"
      },{
        label:"超级管理员",
        value:"超级管理员"
      },],
      // 编辑表单的数据
      form:{},
      // 控制编辑框显示和隐藏
      dialogFormVisible: false,
      // 选中的数据
      selectList: [],
      // 当前页码
      currentPage: 1,
      // 每页支持选择的条数
      pageSizes: [5, 10, 15, 20],
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
    // 点击编辑将数据提取到对应地点
    editForm(item){
      this.form={...item}
      this.dialogFormVisible=true
    },
    // 确定编辑
    async definitedit(){
      // 编辑表单调用接口
      let res = await accountedit({
        id:this.form.id,
        account:this.form.account,
        userGroup:this.form.userGroup,
      })
      let {code,msg} = res.data
      if(code===0){
        this.$message({
          message:msg,
          type:"success"
        })
        this.dialogFormVisible=false
      }
      else{
        this.$message.error(msg)
      }
    },
    // 取消编辑触发的回调
    editcancel() {
      this.dialogFormVisible = false;
      this.$message({
        message:"已取消编辑",
        type:"info"
      })
    },
    // 批量删除
    checkbatchdel() {
      this.$confirm("此操作将永久删除选中账号, 是否继续?", "饭团温馨提示：", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 取出所有的id
          let ids = JSON.stringify(this.selectList.map((item) => item.id));
          let res = await accountbatchdel({ ids });
          let { code, msg } = res.data;
          if (code === 0) {
            this.$message({
              type: "success",
              message: msg,
            });
            // 重新拉取数据
            this.gettablelist();
          } else {
            this.$message.error(msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 取消删除
    cancel() {
      this.$message("取消成功");
    },
    // 单个删除
    async confirm(index, item) {
      let res = await accountdel({
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
    // 更改页数的回调
    handleSizeChange(val) {
      // 拉取数据
      this.pageSize = val;
      this.gettablelist();
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
      this.loading=true
      let res = await accountlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      // 容错判断
      if (this.currentPage != 1 && res.data.data.length === 0) {
        this.currentPage -= 1;
        this.gettablelist();
      }
      this.loading=false
      // 更新数据
      this.tableData = res.data.data;
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
.el-table{
  height: 312px;
}
</style>
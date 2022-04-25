<template>
  <el-container>
    <el-aside width="200px">
      <!-- 头部 -->
      <div class="logo">
        <img src="../assets/images/logo.png" alt="" />
        <span>饭团后台管理系统</span>
      </div>
      <!-- 导航栏 -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#3f9af9"
        router
        unique-opened
      >
        <!-- 通过权限控制管理系统部分功能模块的显示与隐藏 -->
        <div v-for="item in getfeaturelist" :key="item.index">
          <!-- 一级菜单 -->
          <el-menu-item v-if="!item.children" :index="item.index">
            <i :class="'iconfont ' + item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
          <!-- 二级菜单 -->
          <el-submenu v-else :index="item.index">
            <template slot="title">
              <i :class="'iconfont ' + item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item-group
              v-for="secitem in item.children"
              :key="secitem.index"
            >
              <el-menu-item :index="secitem.index">{{
                secitem.secondtitle
              }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
        <!-- 后台首页 -->
        <!-- <el-menu-item index="/main/index">
          <i class="iconfont icon-home"></i>
          <span slot="title">后台首页</span>
        </el-menu-item> -->
        <!-- 订单管理 -->
        <!-- <el-menu-item index="/order/index">
          <i class="iconfont icon-order"></i>
          <span slot="title">订单管理</span>
        </el-menu-item> -->
        <!-- 商品管理 -->
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="iconfont icon-goods"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/goods/goodslist">商品列表</el-menu-item>
            <el-menu-item index="/goods/goodsadd">商品添加</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
        <!-- 店铺管理 -->
        <!-- <el-menu-item index="/shop/index">
          <i class="iconfont icon-shop"></i>
          <span slot="title">店铺管理</span>
        </el-menu-item> -->
        <!-- 账号管理 -->
        <!-- <el-submenu index="2">
          <template slot="title">
            <i class="iconfont icon-account"></i>
            <span>账号管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/users/userslist">账号列表</el-menu-item>
            <el-menu-item index="/users/usersadd">添加账号</el-menu-item>
            <el-menu-item index="/users/modifypwd">修改密码</el-menu-item>
            <el-menu-item index="/users/accountInfo">个人中心</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
        <!-- 销售统计 -->
        <!-- <el-submenu index="3">
          <template slot="title">
            <i class="iconfont icon-total"></i>
            <span>销售统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/census/goodscensus">商品统计</el-menu-item>
            <el-menu-item index="/census/ordercensus">订单统计</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部导航 -->
      <el-header>
        <div class="left">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item 
            v-for="item in breadcrumb"
            :key="item.to" 
            :to="{ path: item.to }">{{item.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="right">
          <!-- 下拉菜单 -->
          <el-dropdown @command="handleCommand" size="small" placement="top">
            <span class="el-dropdown-link"
              >欢迎你，{{ username
              }}<i class="el-icon-arrow-down el-icon--right"></i>
              <!-- 用户头像 -->
              <el-avatar
                shape="circle"
                :size="50"
                fit="cover"
                :src="url"
                @error="errorHandler"
              >
                <img
                  src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                />
              </el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="accountInfo"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
// 接口引入
import { accountinfo } from "@/api/user/user";
export default {
  // 数据
  data() {
    return {
      // 面包屑默认数据
      // breadcrumb:[],
      username: "admin",
      url: "",
      featurelist: [
        // 后台首页
        {
          index: "/main/index",
          icon: "icon-home",
          title: "后台首页",
          role: ["super", "normal"],
        },
        // 订单管理
        {
          index: "/order/index",
          icon: "icon-order",
          title: "订单管理",
          role: ["super", "normal"],
        },
        // 商品管理
        {
          index: "1",
          icon: "icon-goods",
          title: "商品管理",
          role: ["super", "normal"],
          children: [
            // 二级菜单
            {
              index: "/goods/goodslist",
              secondtitle: "商品列表",
            },
            {
              index: "/goods/goodsadd",
              secondtitle: "商品添加",
            },
            {
              index: "/goods/goodscate",
              secondtitle: "商品分类",
            },
          ],
        },
        // 店铺管理
        {
          index: "/shop/index",
          icon: "icon-shop",
          title: "店铺管理",
          role: ["super"],
        },
        // 账号管理
        {
          index: "2",
          icon: "icon-account",
          title: "账号管理",
          role: ["super"],
          children: [
            // 二级菜单
            {
              index: "/users/userslist",
              secondtitle: "账号列表",
            },
            {
              index: "/users/usersadd",
              secondtitle: "账号添加",
            },
            {
              index: "/users/modifypwd",
              secondtitle: "修改密码",
            },
          ],
        },
        // 销售统计
        {
          index: "3",
          icon: "icon-total",
          title: "销售统计",
          role: ["super"],
          children: [
            // 二级菜单
            {
              index: "/census/goodscensus",
              secondtitle: "商品统计",
            },
            {
              index: "/census/ordercensus",
              secondtitle: "订单统计",
            },
          ],
        },
      ],
    };
  },
  // 页面加载计算权限所具备的功能模块
  computed: {
    getfeaturelist() {
      return this.featurelist.filter((item) =>
        item.role.includes(localStorage.role)
      );
    },
    breadcrumb(){
      let arr=[{title:"首页",to:"/main"}]
      this.$route.matched.forEach(item=>{
        if(item.meta.title){
          arr.push({title:item.meta.title,to:item.meta.url})
        }
      })
      return arr
    }
  },
  // 监听当前的路由对象发生变化(方法一)
  // watch:{
  //   $route(){
  //     this.flushbreadcrumb()
  //   }
  // },
  // 方法
  methods: {
    // 刷新面包屑函数(方法一)
    // flushbreadcrumb(){
    //   let arr=[{title:"首页",to:"/main"}]
    //   this.$route.matched.forEach(item=>{
    //     if(item.meta.title){
    //       arr.push({title:item.meta.title,to:item.meta.url})
    //     }
    //   })
    //   this.breadcrumb=arr
    // },
    // 控制下拉菜单的事件
    handleCommand(command) {
      if (command === "accountInfo") {
        this.$router.push("/users/accountInfo");
      } else if (command === "logOut") {
        // 当用户选择退出时，清除本地存储并跳转到登录页面
        localStorage.clear();
        this.$message({
          message: "期待下一次的见面！",
          type: "success",
        });
        this.$router.push("/");
      }
    },
    //拉取用户数据
    async getAccountInfo() {
      let res = await accountinfo({
        id: localStorage.id,
      });
      this.username = res.data.accountInfo.account;
      this.url = res.data.accountInfo.imgUrl;
    },
    // 图片无法加载时
    errorHandler() {
      return true;
    },
  },
  // 钩子函数调用
  created() {
    // 拉取用户数据
    this.getAccountInfo();
    // 刷新面包屑导航(方法一)
    // this.flushbreadcrumb();
    // 更新头像
    this.$bus.$on("upload",res=>{
      this.getAccountInfo()
    })
  },
};
</script>

<style lang="less" scoped>
// 导航条的底色
@navbarbgc: #304156;
// 二级导航选中的底色
@navbarsecbgc: #202f3f;
.iconfont {
  width: 24px;
  margin-right: 5px;
  text-align: center;
  font-size: 18px;
  display: inline-block;
  vertical-align: middle;
}
.el-main {
  background-color: #f0f2f5;
}
.el-submenu__title i {
  color: #fff;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
  // line-height: 60px;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  > .right {
    .el-dropdown-link {
      i {
        margin-right: 10px;
      }
      display: flex;
      align-items: center;
    }
  }
}
.el-menu-item {
  i {
    color: #fff;
  }
}
.el-aside {
  background-color: @navbarbgc;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // logo区域
  .logo {
    display: flex;
    align-items: center;
    // height: 60px;
    justify-content: center;
    padding: 12.5px 0;
    width: 100%;
    img {
      width: 35px;
    }
    span {
      font-size: 14px;
      color: #fff;
      margin-left: 10px;
    }
  }
  //   导航区域
  .el-menu {
    width: 100%;
  }
}
// 清除滑动框
&::-webkit-scrollbar {
  display: none;
}
// 当下拉框打开内部ui会有点击样式rgb(38,52,69)
.el-submenu.is-opened {
  /deep/ .el-menu-item {
    background-color: @navbarsecbgc !important;
  }
}
// 清除固定样式
/deep/.el-menu-item-group__title {
  padding: 0 !important;
}
</style>
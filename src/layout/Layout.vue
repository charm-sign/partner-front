<template>
    <div >
  <!--头部 -->
  <div style="display:flex;height: 60px;background-color: white; line-height: 60px; border-bottom: 1px solid #ddd">
    <!--logo-->
    <div style="display: flex; width:200px;padding-left: 10px;"><img src="@/assets/imgs/交友.png" alt="" style="width:auto;height:50px">
    <div style="color:blueviolet;font-size: 20px;"><b>Partner</b></div>
    </div>
    <!--菜单-->
    <div style="flex:1">
    <el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    router
  >
    <el-menu-item index="/home" >首页</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>

      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>

      </el-sub-menu>
    </el-sub-menu>
 
  </el-menu>
    </div>


    <!-- 头像 -->
    <div style="width:100px">
   
    <el-dropdown>
    <span class="el-dropdown-link">
    <el-avatar :size="40" :src="state.circleUrl" style="margin-left: -30px; position: relative; top: 10px;"/>
   <span style="margin-left: 10px; font-size:16px;position: relative;top: -5px;">{{ store.loginInfo.user.name }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="router.push('/personal')">个人信息</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item divided @click="logout()">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </div>
    
  </div>

  <!-- 主体 -->
  <div style="margin: 10px auto 0 auto;width: 60%;">
    <router-view /><!--加载子路由视图-->
  </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useUserStore } from "@/stores/user";
import router from '../router';
const store=useUserStore()
const state = reactive({
    circleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})
// 退出方法
const logout = () => { 
    localStorage.removeItem("user")
    router.push('/login')
}
</script>
<style scoped>
 .el-dropdown-link {
  cursor: pointer;

}
</style>
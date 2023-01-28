<template>
  <div style="display: flex" class="container-height">
    <div style="width: 200px; padding: 20px" class="box">
      <ul>
        <li @click="changePagePath('myInfo')" :class="pagePath==='myInfo'? 'menu-active':''"><el-icon class="menu-icon"><User /></el-icon> 个人资料</li>
        <li ><el-icon class="menu-icon"><Lock /></el-icon> 修改密码</li>
        <li><el-icon class="menu-icon"><Message /></el-icon> 消息提醒</li>
        <li @click="changePagePath('myDynamic')" :class="pagePath==='myDynamic'? 'menu-active':''"><el-icon class="menu-icon"><Histogram /></el-icon> 我的动态</li>
      </ul>
    </div>
    <div style="flex: 1; margin-left: 20px" class="box">
      <!-- 自定义 -->
     <MyInfo v-if="pagePath==='myInfo'"></MyInfo>
     <MyDynamic v-if="pagePath==='myDynamic'"/>
    </div>
  </div>
</template>

<script setup>
import MyInfo from "@/components/MyInfo.vue"
import MyDynamic from "@/components/MyDynamic.vue"
import router from "@/router";
import { inject } from "vue";
// 此3步可打印出路由
import {useRoute} from "vue-router"
const route = useRoute()
const pagePath=route.query.page   //获取路径拼接?page后的值
// console.log(route.path)
const reload = inject('reload')
const changePagePath = (pagePath) => { 
  router.push({ query: { page: pagePath } })//触发页面 拼接路由
  route.query.page = pagePath//触发高亮和页面
  reload()
}
screen
</script>

<style scoped>
.box {
  background-color: white;

  border-radius: 15px;
}
li {
  text-align: center;
  margin: 15px 0;
  cursor: pointer;
}
.avatar {
  width: 150px;
  height: 150px;
}
.menu-icon{
  top:2px
}
.menu-active{
  color:dodgerblue
}
</style>


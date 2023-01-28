<template>
  <div
    style="background-color: white; border-radius: 10px"
    class="container-height"
  >
    <div style="display: flex; padding: 10px">
      <!-- 话题-动态 -->
      <div
        style="width: 60%; padding: 20px; border: 1px solid #ccc"
        class="dynamic-box"
      >
        <div style="display: flex">
          <div style="width: 80px">
            <img
              style="width: 50px; height: 50px; border-radius: 50%"
              src="http://127.0.0.1:9090/file/download/f73185b8694b44f995e504ad332899ac.png?loginId=9215e26c555948a4a2a44b1fb17392f1&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiI5MjE1ZTI2YzU1NTk0OGE0YTJhNDRiMWZiMTczOTJmMSIsInJuU3RyIjoiNzBMTGpDQWZXZkt6SmFGd0ZkQ01Eb3I1OWVPMTdlVHoifQ.Lx3FqfknPCGQcLJ3uHr_lotQdXTdmjBuDamjYDVYp5o"
            />
          </div>
          <div style="flex: 1; line-height: 25px">
            <div style="font-weight: bold">张三</div>
            <div style="font-size: 12px; color: #999">
              18分钟前·来自vivo X60 Pro
            </div>
          </div>
          <div>
            <el-button>关注</el-button>
          </div>
        </div>

        <div style="margin: 10px 0; line-height: 25px; text-align: justify" class="info">
          没伤害烧录卡激发【王鹏路口v马楠阿马岛皮肤然而欧美拉尔解码不怕那么v绕罚款楼上的看法
        v绕罚款楼上的看法v绕罚款楼上的看法v绕罚款楼上的看法v绕罚款楼上的看法v绕罚款楼上的看法v绕罚款楼上的看法
        </div>
        <div style="margin: 10px 0">
          <el-row :gutter="10">
            <el-col :span="12" style="margin-bottom: 10px">
              <img
                style="width: 100%"
                src="https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/c8973992d103550ff1bc84aa7c9c6544?f=webp&w=320&thumb=1"
              />
            </el-col>
            <el-col :span="12">
              <img
                style="width: 100%"
                src="https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/38e656136429d165068208930057e557?f=webp&w=320&thumb=1"
              />
            </el-col>
            <el-col :span="12">
              <img
                style="width: 100%"
                src="https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/38e656136429d165068208930057e557?f=webp&w=320&thumb=1"
              />
            </el-col>
            <el-col :span="12">
              <img
                style="width: 100%"
                src="https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/38e656136429d165068208930057e557?f=webp&w=320&thumb=1"
              />
            </el-col>
          </el-row>
        </div>
        <!-- 点赞，浏览量 -->
        <div style="margin: 10px 0;display: flex;">
          <div style="width:50%">
            <el-tag type="primary"># 兔年快乐</el-tag>
            <el-tag type="danger" style="margin-left: 10px"
              ><el-icon style="top: 1px"><Aim /></el-icon>中国人的团圆</el-tag
            >
          </div>
          <div style="padding-top: 5px; width: 50%; text-align:right;color: #999;font-size: 14px;">
            <el-icon ><View /></el-icon>20
            <el-icon style="margin-left:10px"><Pointer /></el-icon>24

            <el-icon style="margin-left:10px"><ChatRound /></el-icon>18
          </div>
        </div>
      </div>
      <!-- 排行榜 -->
      <div
        style="
          width: 40%;
          margin-left: 10px;
          border: 1px solid #ccc;
          padding: 10px;
        "
      >
        排行榜
      </div>
    </div>
  </div>
</template>
<script setup>
import router from "@/router";
import { User, Lock, Pear, Message, Aim,View,ChatRound,Pointer } from "@element-plus/icons-vue"; //引入图标才能用
import { ElMessage } from "element-plus";
import request from "@/utils/request";
const load = () => {
  request.get("/user").then((res) => {
    console.log(res.data);
  });
};
//  load()
</script>
<style scoped>
.info {
        overflow: hidden;
        text-overflow: ellipsis; 
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
      }

</style>


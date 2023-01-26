<template>
  <div style="display: flex" class="container-height">
    <div style="width: 200px; padding: 20px" class="box">
      <ul>
        <li>个人资料</li>
        <li>消息提醒</li>
        <li>我的动态</li>
      </ul>
    </div>
    <div style="flex: 1; margin-left: 20px" class="box">
      <el-form
        :model="state.user"
        label-width="100px"
        style="width: 50%; margin-top: 20px;margin-left: 100px;"
      >
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            :action="url"
            :headers="state.headers" 
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="state.user.avatar" :src="state.user.avatar" class="avatar" style="width:200px;height: 200px;"/>
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="state.user.username"></el-input>
        </el-form-item>
        <el-form-item label="姓 名">
          <el-input v-model="state.user.name"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱">
          <el-input v-model="state.user.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref,reactive } from "vue";
import request from "@/utils/request";
import { useUserStore } from "@/stores/user";
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import config  from '@/config'

const store = useUserStore();
let state = reactive({
  user: {},
  headers: {
    Authorization: store.getBearerToken
  }
});
const loadUser = () => {
  request.get("/user/" + store.getUserId).then((res) => {
    console.log(res.data);
    state.user = res.data;
  });
};
loadUser();
// 我擦，必须得手动拼http://，不然会自动带前端地址
const url = ref('http://'+config.serverUrl + '/file/upload') 
const handleAvatarSuccess = (res) => { //上传成功之后
  console.log(res.data)
state.user.avatar=res.data+"?loginId="+store.getUser.uid+"&token="+store.getToken
}
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
</style>


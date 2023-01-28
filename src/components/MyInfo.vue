<template>
  <div>
     <el-form
        :model="state.user"
        label-width="100px"
        style="width: 50%; margin-top: 20px; margin-left: 100px"
      >
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            :action="url"
            :headers="state.headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="state.user.avatar"
              :src="state.user.avatar"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="state.user.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓 名">
          <el-input v-model="state.user.name"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱">
          <el-input v-model="state.user.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">提交</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import request from "@/utils/request";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { Plus,User,Message,Histogram,Lock } from "@element-plus/icons-vue";
import config from "@/config";

const store = useUserStore();
let state = reactive({
  user: {},
  headers: {
    Authorization: store.getBearerToken,
  },
});
const loadUser = () => {
  request.get("/user/" + store.getUserId).then((res) => {
    console.log(res.data);
    state.user = res.data;
  });
};
loadUser();
// 我擦，必须得手动拼http://，不然会自动带前端地址
const url = ref("http://" + config.serverUrl + "/file/upload");
const handleAvatarSuccess = (res) => {
  //上传成功之后
  console.log(res.data);
  state.user.avatar =
    res.data + "?loginId=" + store.getUser.uid + "&token=" + store.getToken;
};
const save = () => { //保存
  request.put("/user/", state.user).then(res => {
    if (res.code === "200") {
      store.setUser(state.user)
      ElMessage.success("保存成功")
    } else { 
      ElMessage.error(res.msg)
    }
  })
}
</script>

<style scoped>
.avatar {
  width: 150px;
  height: 150px;
}
</style>

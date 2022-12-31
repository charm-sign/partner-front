<template>
  <div
    style="
      height: 100vh;
      overflow: hidden;
      position: relativel;
       background-color: #ccffff; 
    "
  >
    <div class="form-box">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" >
        <h2 style="text-align: center">后台登录</h2>
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号" :prefix-icon="User"></el-input>
          <el-icon></el-icon>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            show-password
            placeholder="请输入密码"
            autocomplete="new-password"
          :prefix-icon="Lock"></el-input>
        </el-form-item>
        <div style="margin-bottom: 0.83em">
          <el-button style="width: 100%" type="primary" @click="login()">登录</el-button>
        </div>
        <div style="text-align:right">
          <el-button type="text" @click="router.push('/register')">没有账号？请注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import router from '@/router';
import { User,Lock } from '@element-plus/icons-vue'//引入图标才能用
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { reactive, ref } from "vue";
import request from "@/utils/request";
// import { useUserStore } from "@/stores/user";
// const form = reactive({});
const ruleFormRef = ref();
const form = reactive({
  username: "",
  password:"",
});
// 校验规则
const rules = reactive ({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在6~12之间', trigger: 'blur' },
  ],
})

//登录请求
const login = () => { 
  ruleFormRef.value.validate(valid => { 
    //当校验通过为true时，调用接口 valid===true;
    if (valid) { 
      request.post("/login", form).then(res => { 
        if (res.code === '200') {
          // store.setLoginInfo(res.data) //存储进缓存
          ElMessage.success("登录成功")
          router.push('/')
        } else { 
          ElMessage.error(res.msg)
        }
      })
    }
  })
}
</script>
<style scoped>
.form-box {
  width: 300px;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.5);
  background-color: #F0FFF0;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
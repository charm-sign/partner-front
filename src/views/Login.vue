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
      <el-form ref="ruleFormRef" :model="form" :rules="rules">
        <h2 style="text-align: center">后台登录</h2>
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入账号/邮箱"
            :prefix-icon="User"
          ></el-input>
          <el-icon></el-icon>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            show-password
            placeholder="请输入密码"
            autocomplete="new-password"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <div style="margin-bottom: 0.83em">
          <el-button style="width: 100%" type="primary" @click="login()"
            >登录</el-button
          >
        </div>
        <div>
          <el-button link style="float: left" @click="ResetPassword()">
            忘记密码？</el-button
          >
          <el-button
            type="primary"
            link
            style="float: right"
            @click="router.push('/register')"
            >没有账号？请注册</el-button
          >
        </div>
      </el-form>
    </div>
    <el-dialog
      v-model="DialogVisible"
      title="重置密码"
      width="30%"
      align-center
      :close-on-click-modal="false"
    >
      <el-form
        ref="rulePasswordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
      >
        <el-form-item label="邮&nbsp;&nbsp;&nbsp;箱" prop="email">
          <el-input
            v-model="passwordForm.email"
            placeholder="请输入邮箱"
            :prefix-icon="Message"
          ></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
          <div style="display: flex">
            <el-input style="flex: 1" v-model="passwordForm.code"></el-input>
            <el-button
              style="width: 80px; margin-left: 5px"
              @click="sendEmail()"
              :disabled="time > 0"
              >点击发送<span v-if="time">({{ time }})</span></el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="DialogVisible = false">取消</el-button>
          <el-button type="primary" @click="resetPassword()"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import router from "@/router";

import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import request from "@/utils/request";
import { useUserStore } from "@/stores/user";
import { User, Lock, Pear, Message } from "@element-plus/icons-vue"; //引入图标才能用
const DialogVisible = ref(false); //对话框
const ruleFormRef = ref();
const rulePasswordFormRef = ref();
const passwordForm = reactive({
  email: "",
  code: "",
});
const form = reactive({
  username: "",
  password: "",
});
const reg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//自定义邮箱校验
const checkEmail = (rule, value, callback) => {
  if (!reg.test(value)) {
    //test()校验
    return callback(new Error("请输入正确的邮箱格式"));
  }
  callback();
};

// 校验规则
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名或邮箱", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 12, message: "长度在6~12之间", trigger: "blur" },
  ],
});

const passwordRules = reactive({
  email: [{ required: true, validator: checkEmail, trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});
//登录请求
const login = () => {
  ruleFormRef.value.validate((valid) => {
    //当校验通过为true时，调用接口 valid===true;
    if (valid) {
      request.post("/login", form).then((res) => {
        if (res.code === "200") {
          // 使用pinia存储数据
          const store = useUserStore();
          store.$patch({ user: res.data }); //存储
          // store.setUser(res.data)
          ElMessage.success("登录成功");
          router.push("/");
        } else {
          ElMessage.error(res.msg);
        }
      });
    }
  });
};
const time = ref(0);
const interval = ref(-1);
//发送邮箱验证码
const sendEmail = () => {
  //发送之前先校验邮箱
  if (!reg.test(passwordForm.email)) {
    //test()校验
    ElMessage.warning("请输入正确的邮箱格式");
    return; //不再向下走
  }
  const times = () => {
    // 清空定时器
    if (interval.value >= 0) {
      clearInterval(interval.value);
    }
    time.value = 60;
    interval.value = setInterval(() => {
      if (time.value > 0) {
        time.value--;
      }
    }, 1000);
  };

  request
    .get("/email", {
      params: {
        email: passwordForm.email,
        type: "RESETPASSWORD",
      },
    })
    .then((res) => {
      if (res.code === "200") {
        ElMessage.success("发送成功，有效期为5分钟");
        times(); //定时器
      } else {
        ElMessage.error(res.msg);
      }
    });
};
//打开对话框时重置表单
const ResetPassword = () => {
  DialogVisible.value = true;
  // 触发表单重置   注意重置的对象
  rulePasswordFormRef.value.resetFields();
};

//重置密码
const resetPassword = () => {
  //校验
  rulePasswordFormRef.value.validate((valid) => {
    if (valid) {
      request.post("/password/reset", passwordForm).then((res) => {
        if (res.code === "200") {
          ElMessage.success("重置成功，您的新密码为：" + res.data);
          DialogVisible.value = false;
        } else {
          ElMessage.error(res.msg);
        }
      });
    }
  });
};
</script>
<style scoped>
.form-box {
  width: 320px;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%);
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
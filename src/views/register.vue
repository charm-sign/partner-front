<template>
  <div
    style="
      height: 100vh;
      overflow: hidden;
      position: relativel;
      /* background-color: #a1c4fd; */
      background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
    "
  >
    <div class="form-box">
      <el-form ref="ruleFormRef" :model="form" :rules="rules">
        <h2 style="text-align: center">注册账号</h2>
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入账号"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入昵称"
            :prefix-icon="Pear"
          ></el-input
        ></el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            show-password
            placeholder="请输入密码"
            autocomplete="new-password"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirm">
          <el-input
            v-model="form.confirm"
            show-password
            placeholder="请确认密码"
            autocomplete="new-password"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            placeholder="请输入邮箱"
            :prefix-icon="Message"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <div style="display: flex">
            <el-input style="flex: 1" v-model="form.code"></el-input>
            <el-button
              style="width: 80px; margin-left: 5px"
              @click="sendEmail()"
              :disabled="time > 0"
              >点击发送<span v-if="time">({{ time }})</span></el-button
            >
          </div>
        </el-form-item>

        <div style="margin-bottom: 0.83em">
          <el-button style="width: 100%" type="primary" @click="register()"
            >注册</el-button
          >
        </div>
        <div style="text-align: right">
          <el-button type="text" link @click="router.push('/login')"
            >已有账号？请登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import router from "@/router";
import { User, Lock, Pear, Message } from "@element-plus/icons-vue"; //引入图标才能用
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import request from "@/utils/request";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";

const ruleFormRef = ref();
const form = reactive({
  username: "",
  password: "",
  confirm: "",
  email: "",
});
//自定义 确认密码校验
const confirmPassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次确认密码"));
  } else if (value !== form.password) {
    callback(new Error("2次密码不一致"));
  } else {
    callback();
  }
};
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
    { required: true, message: "请输入用户名", trigger: "blur" },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 12, message: "长度在6~12之间", trigger: "blur" },
  ],
  confirm: [{ validator: confirmPassword, trigger: "blur" }],
  email: [{ validator: checkEmail, trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});
const time = ref(0);
const interval = ref(-1);

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
//发送邮箱验证码
const sendEmail = () => {
  //发送之前先校验邮箱
  if (!reg.test(form.email)) {
    //test()校验
    ElMessage.warning("请输入正确的邮箱格式");
    return; //不再向下走
  }

  request
    .get("/email", {
      params: {
        email: form.email,
        type: "REGISTER",
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

//注册请求
const register = () => {
  ruleFormRef.value.validate((valid) => {
    //当校验通过为true时，调用接口 valid===true;
    if (valid) {
      request.post("/register", form).then((res) => {
        if (res.code === '200') {
          // 使用pinia存储数据
          // const store = useUserStore();
          // store.$patch({ user: res.data }); //存储
          ElMessage.success("注册成功");
          router.push('/login');
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
  width: 350px;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.5);
  background-color: #f0fff0;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
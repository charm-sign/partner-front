<template>
<div>主页</div>
</template>
<script setup>
import router from "@/router";
import { ElMessage } from "element-plus";
import request from "@/utils/request";
const load = () => {
    request.get("/user").then((res) => {
        console.log(res.data)
    })
}
 load()
</script>


<script setup>
import { RouterView } from 'vue-router'
import { nextTick, provide, ref } from 'vue';
//此操作主要是用于点击左边切换右边
const isRouterAlive=ref(true)
const reload = () => { 
  isRouterAlive.value = false
  nextTick(() => { 
    isRouterAlive.value=true
  })
}
provide('reload',reload)
</script>
<template>
  <RouterView v-if="isRouterAlive"/>
</template>


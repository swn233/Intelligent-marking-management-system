<script setup>
import { Transition } from 'vue'
</script>

<template>
  <body style="margin: 0 0 0 0">
  <div style="width: 100vw;height: 100vh;overflow:hidden;display: flex">
  <div style="flex: 1; background-color: black ;">
    <el-image src="https://s2.loli.net/2024/03/18/bKikeU6VZAwIY1X.jpg" style="width: 100%;height: 100%" fit="cover"/>
  </div>
  <div class="welcome-title">
    <p style="font-size: 28px;font-weight: bold">欢迎来到智能阅卷系统</p>
    <p style="font-size: 14px; margin-top: 10px">使用最新的AI技术辅助阅卷</p>
    <p style="font-size: 14px; margin-top: 5px">更快 更准确</p>

  </div>
    <div class="right-card">
      <router-view v-slot="{ Component }">
        <Transition name="el-fade-in-linear"  mode="out-in">
          <component :is="Component"></component>
        </Transition>
      </router-view>
    </div>
  </div>
  </body>
</template>

<style scoped>
.welcome-title{
  position:absolute;
  bottom:30px;
  left:30px;
  color: white;
  text-shadow: 0px 0px 10px;
}
.right-card{
  width: 25%;
  z-index: 1;
  background-color: white;
}
</style>
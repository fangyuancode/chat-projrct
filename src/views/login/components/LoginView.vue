<template>
  <div class="loginview">
    <div class="log">
      <img :src="log" alt="">
    </div>
    <div class="select">
      <div>新用户</div>
      <div class="text" @click="tologin">登录</div>
    </div>
  </div>
</template>
<script setup>
import log from "@/assets/img/log/login-log.png";
const emit = defineEmits(["showFormClick"]);
function tologin() {
  emit("showFormClick");
}
</script>
<style lang="less" scoped>
.loginview {
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  .log {
    width: 100%;
    height: calc(100% - 50px);
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .select {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    & > div {
      font-size: 13px;
      width: 140px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #d2d2d2;
      text-align: center;
      border-radius: 5px;
    }
    .text {
      background-color: #0199fe;
      color: #fff;
    }
  }
}
</style>
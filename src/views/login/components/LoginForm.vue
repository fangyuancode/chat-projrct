<template>
  <div class="loginform">
    <div class="img">
      <img :src="loginlog" alt="">
    </div>
    <van-form @submit="onSubmit" class="form">
      <van-cell-group inset>
        <van-field v-model="username" name="用户名" placeholder="QQ号/手机/邮箱" :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="密码" placeholder="请输入你的QQ密码" :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div class="loginbtn">
        <van-button block type="primary" native-type="submit">
          登录
        </van-button>
        <van-button block native-type="submit">
          一键登录
        </van-button>
      </div>
    </van-form>

  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import loginlog from "@/assets/img/log/login.png";

const router = useRouter();
const username = ref("");
const password = ref("");
const onSubmit = (values) => {
  console.log("submit", values);
  router.push("/message");
};
</script>
<style lang="less" scoped>
.set_center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginform {
  background-color: #f4f5f6;
  width: 100%;
  height: 100vh;
  .img {
    width: 100%;
    height: 150px;
    .set_center ();
    img {
      width: 300px;
      object-fit: cover;
    }
  }
  .loginbtn {
    height: 120px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
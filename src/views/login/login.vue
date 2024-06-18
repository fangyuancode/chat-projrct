<template>
  <div class="login">
    <LoginView v-if="isShowForm" @showFormClick="showFormClick"></LoginView>
    <LoginForm v-if="!isShowForm"></LoginForm>
  </div>
</template>
<script setup>
import LoginForm from "./components/LoginForm.vue";
import LoginView from "./components/LoginView.vue";
import { ref } from "vue";
const isShowForm = ref(true);
function showFormClick() {
  isShowForm.value = false;
}
</script>
<style lang="less" scoped>
.login {
}
</style>
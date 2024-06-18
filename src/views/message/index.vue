<template>
  <div class="message">
    <!-- 头部导航 -->
    <navbar>
      <template #left>
        <div class="left">
          <img :src="avator" alt="">
        </div>
      </template>
      <template #center>
        <div style="color:#fff">消息</div>
      </template>
      <template #right>
        <van-icon name="plus" color="#fff" size="30" />
      </template>
    </navbar>

    <!-- 消息列表主体 -->
    <div class="msgContent">
      <!-- 搜索框 -->
      <van-search v-model="searchValue" input-align="center" placeholder="请输入搜索关键词" />

      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">

          <div class="item" v-for="item in 15" @click="chatClick">
            <div class="left"> <img :src="avator" alt=""></div>
            <div class="center">
              <div class="name">月</div>
              <div class="msg">出发了没有</div>
            </div>
            <div class="right">10.10</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>

</template>
<script setup>
import navbar from "@/components/navbar/navbar.vue";
import avator from "@/assets/img/log/avator.jpg";
import { ref } from "vue";
import { useRouter } from "vue-router";
const searchValue = ref("");
const router = useRouter();

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const isChat = ref(false);
const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }

    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;

    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};

// 跳转的聊天页面
function chatClick() {
  console.log("点击了");
  // isChat.value = true;
  router.push("/chat");
}
</script>
<style lang="less" scoped>
.message {
  .left {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .msgContent {
    height: calc(100vh - 80px);
    overflow: auto;
    .item {
      display: flex;
      align-items: center;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #e1dede;

      .left {
        border-radius: 50%;
        height: 40px;
        width: 40px;
        overflow: hidden;
        margin-left: 5px;
        img {
          width: 90%;
          height: 90%;
        }
      }
      .center {
        & > div {
          height: 15px;
          margin-left: 10px;
        }
        height: 40px;
        line-height: 40px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        // background-color: pink;
        .name {
          font-size: 16px;
          height: 20px;
          line-height: 20px;
          margin-bottom: 5px;
        }
        .msg {
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          color: #797171;
        }
      }
      .right {
        width: 50px;
        font-size: 12px;
        color: #beb9b9;
      }
    }
  }
}
div::-webkit-scrollbar {
  width: 0;
}
</style>
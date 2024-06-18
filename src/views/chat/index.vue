<template>
  <div class="chat" v-show="!isPhoto">
    <!-- 头部导航 -->
    <navbar>
      <template #left>
        <div class="left" @click='onClickLeft'>
          <van-icon name="arrow-left" color="#fff" size="20" />
        </div>
      </template>
      <template #center>
        <div class="center">
          <div class="name"> 风</div>
          <div class="state">在线</div>
        </div>
      </template>
      <template #right>
        <van-icon name="phone" color="#fff" size="22" />
        &nbsp;
        <van-icon name="contact" color="#fff" size="22" />
      </template>
    </navbar>
    <!-- 聊天界面 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list :finished="finished" finished-text="没有更多了">
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <div class="content_box" id="box" ref="scrollBox">
          <div class="timer">2024-6-15 20.55</div>
          <div :class="item.position == 'left' ? 'userbox2' : 'userbox'" v-for="(item, index) in chatList" :key="index">
            <div :class="item.position == 'left' ? 'nameInfo2' : 'nameInfo'">
              <div :class="item.position == 'left' ? 'contentText2' : 'contentText'">
                {{    item.content }}
              </div>
            </div>
            <div>
              <van-image round width="45px" height="45px" :src="item.url" />
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>

    <!-- <div class="content_box" id="box" ref="scrollBox">
      <div class="timer">2024-6-15 20.55</div>
      <div :class="item.position == 'left' ? 'userbox2' : 'userbox'" v-for="(item, index) in chatList" :key="index">
        <div :class="item.position == 'left' ? 'nameInfo2' : 'nameInfo'">
          <div :class="item.position == 'left' ? 'contentText2' : 'contentText'">
            {{    item.content }}
          </div>
        </div>
        <div>
          <van-image round width="45px" height="45px" :src="item.url" />
        </div>
      </div>
    </div> -->

    <div class="bottom">

      <!-- 可以使用 CellGroup 作为容器 -->
      <div class="search">
        <div class="input">
          <van-cell-group inset>
            <van-field v-model="inputValue" rows="1" :autosize="{ maxHeight: 100, minHeight: 25 }" type="textarea" />
          </van-cell-group>
        </div>

        <van-button type="primary" size="small" color="#34b2fd">发 &nbsp;送</van-button>
      </div>

      <div class="icon">
        <van-image width="20" height="20" fit="contain" :src="view" />
        <!-- 上传图片 -->
        <van-uploader v-model="fileList" :after-read="afterRead">
          <van-icon size="25" name="photo" color="#999" />
        </van-uploader>

        <van-image width="20" height="20" fit="contain" :src="videotape" />
        <van-icon size="25" name="photograph" color="#999" @click="photoClick" />
        <van-icon size="25" name="bill" color="#999" />
        <van-image width="20" height="20" fit="contain" :src="gif" />

        <van-icon size="25" name="smile-o" color="#999" />
        <van-icon size="25" name="add-o" color="#999" />
      </div>

    </div>
  </div>
  <div class="mainimage" v-show="isPhoto">
    <div class="close">
      <van-icon name="close" size="35" color="#f7f8fa" @click="colseClick" />
    </div>
    <!-- 画笔控件 用来拍照 -->
    <canvas style="display: none" ref="canvasDom" />
    <!-- 播放器，用来播放拍摄的视频 -->
    <video v-if="!imgurl" class="camera_video" ref="videoDom" />
    <!--  显示照片  -->
    <img v-else :src="imgurl" />
    <br />
    <div class="btn">
      <van-button type="primary" @click="takePhoto">{{ imgurl ? "重拍" : "拍照" }}</van-button>

    </div>

  </div>
</template>
<script setup>
import view from "@/assets/img/chat-tabar/view.png";
import videotape from "@/assets/img/chat-tabar/videotape.png";
import gif from "@/assets/img/chat-tabar/gif.png";

// videotape
import navbar from "@/components/navbar/navbar.vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const inputValue = ref("");
//聊天数据
const chatList = reactive([
  {
    url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    username: "张三",
    content: "吃饭了吗",
    position: "left",
  },
  {
    url: "https://img01.yzcdn.cn/vant/cat.jpeg",
    username: "李四",
    content: "还没有",
    position: "right",
  },
  {
    url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    username: "张三",
    content: "一起去吗",
    position: "left",
  },
  {
    url: "https://img01.yzcdn.cn/vant/cat.jpeg",
    username: "李四",
    content: "等我几分钟",
    position: "right",
  },
  {
    url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    username: "张三",
    content: "好的",
    position: "left",
  },
  {
    url: "https://img01.yzcdn.cn/vant/cat.jpeg",
    username: "李四",
    content: "大约要5分钟",
    position: "right",
  },
  {
    url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    username: "张三",
    content: "那5分钟之后见",
    position: "left",
  },
  {
    url: "https://img01.yzcdn.cn/vant/cat.jpeg",
    username: "李四",
    content: "好的",
    position: "right",
  },
  {
    url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    username: "张三",
    content: "ok",
    position: "left",
  },
  {
    url: "https://img01.yzcdn.cn/vant/cat.jpeg",
    username: "李四",
    content: "模拟数据123模拟数据",
    position: "right",
  },
  {
    url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    username: "张三",
    content: "模拟数据123",
    position: "left",
  },
  {
    url: "https://img01.yzcdn.cn/vant/cat.jpeg",
    username: "李四",
    content: "模拟数据123模拟数据",
    position: "right",
  },
  {
    url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    username: "张三",
    content: "模拟数据123",
    position: "left",
  },
  {
    url: "https://img01.yzcdn.cn/vant/cat.jpeg",
    username: "李四",
    content: "模拟数据123模拟数据",
    position: "right",
  },
]);
//滚动条距离顶部距离
const scrollTop = ref(0);
// 获取dom元素
const scrollBox = ref(null);
onMounted(() => {
  setPageScrollTo();
  //创建监听内容部分滚动条滚动
  console.log("scrollBox", scrollBox);
  scrollBox.value.addEventListener("scroll", srTop());
});
//滚动条到达顶部
function srTop() {
  //判断：当滚动条距离顶部为0时代表滚动到顶部了
  if (scrollBox.scrollTop == 0) {
    //逻辑简介：
    //到顶部后请求后端的方法，获取第二页的聊天记录，然后插入到现在的聊天数据前面。
    //如何插入前面：可以先把获取的数据保存在 A 变量内，然后 this.chatList=A.concat(this.chatList)把数组合并进来就可以了

    //拿聊天记录逻辑:
    //第一次调用一个请求拉历史聊天记录，发请求时参数带上页数 1 传过去，拿到的就是第一页的聊天记录，比如一次拿20条。你显示出来
    //然后向上滚动到顶部时，触发新的请求，在请求中把分页数先 +1 然后再请求，这就拿到了第二页数据，然后通过concat合并数组插入进前面，依次类推，功能完成！
    console.log("到顶了，滚动条位置 :", scrollBox.scrollTop);
  }
}
//滚动条默认滚动到最底部
function setPageScrollTo(s, c) {
  //获取中间内容盒子的可见区域高度
  scrollTop.value = document.querySelector("#box").offsetHeight;
  setTimeout((res) => {
    //加个定时器，防止上面高度没获取到，再获取一遍。
    if (scrollTop.value != scrollBox.value.offsetHeight) {
      scrollTop.value = document.querySelector("#box").offsetHeight;
    }
  }, 100);
  //scrollTop：滚动条距离顶部的距离。
  //把上面获取到的高度座位距离，把滚动条顶到最底部
  scrollBox.value.scrollTop = scrollTop.value;
}
//返回
function onClickLeft() {
  console.log("返回");
  router.push("/message");
}
//更多
function onClickRight() {
  console.log("按钮");
}
function sendOut() {
  console.log("发送成功");
}
// 图片上传
const fileList = ref([]);

const afterRead = (file) => {
  file.status = "uploading";
  file.message = "上传中...";

  setTimeout(() => {
    file.status = "failed";
    file.message = "上传失败";
  }, 1000);
};

// canvas控件对象
const canvasDom = ref(null);
// video 控件对象
const videoDom = ref(null);
// 照片路径
const imgurl = ref(null);

const openCamera = () => {
  // 检测浏览器是否支持mediaDevices
  if (navigator.mediaDevices) {
    navigator.mediaDevices
      // 开启视频，关闭音频
      .getUserMedia({ audio: false, video: true })
      .then((stream) => {
        // 将视频流传入viedo控件
        videoDom.value.srcObject = stream;
        // 播放
        videoDom.value.play();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    window.alert("该浏览器不支持开启摄像头，请更换最新版浏览器");
  }
};
const isPhoto = ref(false);
function photoClick() {
  console.log("打开摄像头");
  isPhoto.value = true;
  openCamera();
}
// 拍照
const takePhoto = () => {
  // 如果已经拍照了就重新启动摄像头
  if (imgurl.value) {
    imgurl.value = null;
    openCamera();
    return;
  }

  // 设置画布大小与摄像大小一致
  canvasDom.value.width = videoDom.value.videoWidth;
  canvasDom.value.height = videoDom.value.videoHeight;
  // 执行画的操作
  canvasDom.value.getContext("2d").drawImage(videoDom.value, 0, 0);
  // 将结果转换为可展示的格式
  imgurl.value = canvasDom.value.toDataURL("image/webp");
  // 关闭摄像头
  stop();
};

// 关闭摄像头
const stop = () => {
  let stream = videoDom.value.srcObject;
  if (!stream) return;
  let tracks = stream.getTracks();
  tracks.forEach((x) => {
    x.stop();
  });
};

function colseClick() {
  stop();
  isPhoto.value = false;
}
// 打开摄像头
// onMounted(() => {
//   openCamera();
// });
// 下拉刷新
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

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
</script>
<style lang="less" scoped>
.mainimage {
  width: 100vw;
  height: 100vh;
  margin: auto auto;
  position: relative;
  .close {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .btn {
    background-color: pink;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 100px;
  }
}

.camera_video {
  // width: 100vw;
  // height: 100vh;
  // border: 2px black solid;
}
.chat {
  // height: 100%;

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: #fff;
    .name {
    }
    .state {
      font-size: 10px;
    }
  }
  .content_box {
    /* 
  中间栏计算高度，110是包含了上下固定的两个元素高度90
  这里padding：10px造成的上下够加了10，把盒子撑大了，所以一共是20要减掉
  然后不知道是边框还是组件的原因，导致多出了一些，这里再减去5px刚好。不然会出现滚动条到顶或者底部的时候再滚动的话就会报一个错，或者出现滚动条变长一下的bug
  */
    height: calc(100vh - 140px);
    overflow: auto;
    padding: 10px;
    background-color: #ecedf1;
    // background-color: pink;
    .timer {
      text-align: center;
      color: #c2c2c2;
    }
    .userbox {
      width: 100%;
      display: flex;
      margin-bottom: 10px;
    }
    .nameInfo {
      /* 用flex：1把盒子撑开 */
      flex: 1;
      margin-right: 10px;
      /* 用align-items把元素靠右对齐 */
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .contentText {
      background-color: #34b2fd;
      color: #fff;
      /* 把内容部分改为行内块元素，因为盒子flex：1把盒子撑大了，所以用行内块元素让内容宽度不根据父盒子来 */
      display: inline-block;
      border-radius: 5px;
      /* 最大宽度限定内容输入到百分61换行 */
      max-width: 61%;
      padding: 5px 10px;
      /* 忽略多余的空白，只保留一个空白 */
      white-space: normal;
      /* 换行显示全部字符 */
      word-break: break-all;
      margin-top: 10px;
      font-size: 14px;
    }

    /* 接收的信息样式 */
    /* 
左边消息思路解释：跟上面一样，就是换一下位置，首先通过把最外层大盒子的排列方式通过flex-direction: row-reverse;属性翻转，也就是头像和文字盒子换位置
然后删除掉尾部对齐方式，因为不写这个默认是左对齐的。我们写的左边就没必要再写了。
*/
    .userbox2 {
      // background-color: pink;
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      margin-bottom: 10px;
    }
    .nameInfo2 {
      /* 用flex：1把盒子撑开 */
      flex: 1;
      margin-left: 10px;
    }
    .contentText2 {
      background-color: #fff;
      /* 把内容部分改为行内块元素，因为盒子flex：1把盒子撑大了，所以用行内块元素让内容宽度不根据父盒子来 */
      display: inline-block;
      border-radius: 5px;
      /* 最大宽度限定内容输入到百分61换行 */
      max-width: 61%;
      padding: 5px 10px;
      /* 忽略多余的空白，只保留一个空白 */
      white-space: normal;
      /* 换行显示全部字符 */
      word-break: break-all;
      margin-top: 10px;
      font-size: 14px;
    }
  }
  .bottom {
    // min-height: 50px;
    width: 100%;
    border-top: 1px solid #eaeaea;
    position: fixed;
    // bottom: 40;
    background-color: #ecedf1;
    .search {
      display: flex;
      align-items: center;
      .input {
        width: 85%;
      }
    }
    .icon {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 10px 0;
    }
  }
}
// 清清除滚动条
div::-webkit-scrollbar {
  width: 0;
}
:deep(.van-cell) {
  padding: 0;
  height: 30px;
  line-height: 30px;
}
</style>
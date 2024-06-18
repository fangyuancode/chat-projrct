
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 重置整体样式
import './assets/css/reset.css'
import "normalize.css"
// 导入视频播放组件
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueVideoPlayer)

app.mount('#app')

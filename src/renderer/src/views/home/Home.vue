<script setup lang="ts">
import CodeClipboard from './components/CodeClipboard.vue'
import { ref } from 'vue'
// ref绑定数据到页面
const pathRef = ref('')
const progress = ref(0)
window.api.onDownloadProgress((value) => {
  const type = value.split(':')[0]
  const progressData = value.split(':')[1]
  console.log(value, type, progressData)
  if (type == 'rate') {
    progress.value = parseInt(progressData)
  } else {
    progress.value = parseInt(progressData)
  }
})
const testBtn = async () => {
  console.log(window)
  // 下载文件
  const path =
    // 'http://dkboss.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/DKB0001/1708496774238-第十七课时诗词微舞《赋得古原草送别》.mp4'
    'http://dkboss.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/DKB0001/1702026157198-丁玲直播.mp4'
  // 'https://i1.hdslb.com/bfs/banner/39169663e68dbfd0e8ecd17ba3aafb65ee23c299.png@976w_550h_1c_!web-home-carousel-cover.avif'
  // window.electron.ipcRenderer.send('download', path)
  const resData = await window.api.download(path)
  console.log(resData)
  pathRef.value = resData.split(',')[0]
}
</script>

<template>
  <div class="w-full h-full p-12">
    <div>
      <div>输入xml坐标</div>
      <div><CodeClipboard /></div>
      <div><Button @click="testBtn">选择目录</Button></div>
      <div>{{ progress }}</div>
      <div>{{ pathRef }}</div>
    </div>
  </div>
</template>

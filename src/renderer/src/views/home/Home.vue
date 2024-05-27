<script setup lang="ts">
import CodeClipboard from './components/CodeClipboard.vue'
import { ref, computed } from 'vue'
// ref绑定数据到页面
const path = ref('')
const progress = ref(0)

const progressShow = computed(() => {
  if (progress.value > 0) {
    if (progress.value == 100) {
      console.log('下载完成')
    }
    return true
  } else return false
})

// 监听下载进度
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
const installBtn = async () => {
  progress.value = 0
  // 下载文件
  const url =
    // 'http://dkboss.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/DKB0001/1708496774238-第十七课时诗词微舞《赋得古原草送别》.mp4'
    'http://dkboss.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/DKB0001/1702026157198-丁玲直播.mp4'
  // 'https://i1.hdslb.com/bfs/banner/39169663e68dbfd0e8ecd17ba3aafb65ee23c299.png@976w_550h_1c_!web-home-carousel-cover.avif'
  // window.electron.ipcRenderer.send('download', path)
  const resData = await window.api.download(url)
  console.log(resData)
  pathRef.value = resData.split(',')[0]
}
</script>

<template>
  <div class="w-full h-full p-12">
    <div>
      <div class="text-xl flex items-center gap-2 mb-4">
        <Badge status="purple" /><span>输入xml坐标</span>
        <Icon type="md-code-download" size="28" />
      </div>
      <div><CodeClipboard /></div>
      <div class="flex justify-between mt-1 items-center text-sm">
        <div class="flex items-center gap-1">
          <span class="mr-1"><Icon class="mr-1" type="ios-folder" size="16" />Jar包路径:</span
          ><Input v-model="path" style="width: 250px" /><Icon type="md-open" size="16" />
        </div>
        <span class="flex items-center gap-1">
          <span>安装后JAR</span>
          <Switch size="large">
            <template #open>
              <span>保留</span>
            </template>
            <template #close>
              <span>清除</span>
            </template>
          </Switch>
          <Button class="ml-4" @click="installBtn">安装</Button>
        </span>
      </div>
      <div v-if="progressShow">{{ progress }}</div>
    </div>

    <hr class="my-4" />
    <div>
      <div class="text-xl flex items-center gap-2">
        <Badge status="purple" /><span>本地Jar安装</span>
        <Icon type="ios-folder-open" size="18" />
      </div>
      <div class="flex justify-center my-4">
        <div class="w-60">
          <Upload type="drag">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或拖拽Jar包以安装</p>
            </div>
          </Upload>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
:deep(.ivu-input) {
  height: 22px;
}
:deep(.ivu-upload-drag) {
  opacity: 0.7;
}
</style>

<script setup lang="ts">
//引入ipcRenderer
const testBtn = () => {
  console.log(window)
  window.api.test()
  // window.electron.ipcRenderer.send('test')
}
</script>

<template><Button @click.prevent="testBtn">aa</Button></template>

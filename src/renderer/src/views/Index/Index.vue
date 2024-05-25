<script setup lang="ts">
import { Content } from 'view-ui-plus'
import FooterLaber from './components/FooterLabel.vue'
</script>

<template>
  <Layout class="w-svw h-svh">
    <Sider class="bg-white">
      <Layout class="h-full">
        <Content>
          <Menu class="h-full" active-name="home" width="auto">
            <MenuItem name="home" to="/home">
              <Icon type="md-home" size="19" />
              <span>主页</span>
            </MenuItem>
            <MenuItem name="config" to="/config">
              <Icon type="md-settings" size="17" />
              <span>设置</span>
            </MenuItem>
          </Menu>
        </Content>
        <Footer class="bg-white"><FooterLaber /> </Footer>
      </Layout>
    </Sider>
    <Content class="content"><RouterView /></Content>
  </Layout>
</template>

<style scoped lang="less">
.content {
  background-image: url('../../assets/wavy-lines.svg');
  background-size: 100% 100%;
}
</style>

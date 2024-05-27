// electron-store的存取额操作
// import Store from 'electron-store'
import { ipcMain as IPC } from 'electron'

/* 
const store = new Store()

// 注册一个IPC消息处理程序，用于接收来自渲染进程的请求
IPC.handle('store-get', (event, key) => {
  // 从store中获取指定key的值
  const value = store.get(key)

  // 返回获取到的值
  return value
})

IPC.handle('store-set', (event, key, value) => {
  // 将value存储到store中，以key为键
  store.set(key, value)

  // 返回存储后的值
  return value
})
 */

console.log('store run ')
IPC.on('test', () => {
  console.log('test')
})

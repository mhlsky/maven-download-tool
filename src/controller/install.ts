import path from 'path'
import { ipcMain, dialog, BrowserWindow } from 'electron'
import axios from 'axios'
import fs from 'fs'
import url from 'url'
export function downloadFile(mainWin: BrowserWindow) {
  ipcMain.handle('downloadFile', async (_e, arg) => {
    // 打开系统弹窗 选择文件下载位置
    const { filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    console.log('ipcMain-on download:' + filePaths[0])
    console.log('download url:' + arg)

    // 在 node.js 用GET请求获取远程图片
    axios({
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: arg,
      responseType: 'stream',
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
          console.log(`progress: ${percentCompleted}%`)
          mainWin.setProgressBar(percentCompleted / 100)
        } else {
          console.log(`progress(total:undefined): ${progressEvent.loaded}`)
        }
      }
    })
      .then((response) => {
        // 下载完成
        response.data.on('end', () => {
          console.log('download success')
          mainWin.setProgressBar(-1)
        })
        const { data, headers } = response
        // 获取文件名
        const parsed = url.parse(arg)
        let filePath = ''
        if (headers['Content-Type'] && typeof headers['Content-Type'] === 'string') {
          filePath = 'download.' + headers['Content-Type'].split('/')[1]
        }
        if (parsed.pathname) {
          console.log(path.basename(parsed.pathname))
          filePath = path.basename(parsed.pathname)
        }
        const writer = fs.createWriteStream(filePaths[0] + '\\' + filePath)
        data.pipe(writer)
      })
      .catch((error) => {
        console.error('download faild:', error)
      })

    return filePaths[0] + ',' + arg
  })
}

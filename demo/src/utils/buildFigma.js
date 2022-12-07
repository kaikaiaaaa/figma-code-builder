const { exec } = require('child_process');

// const token = "figd_wQnvl9MDT5xTSZPvBHlcZeGDY_cdyUosJfJfZp0p"
const token = "figd_MI4wsYlLqHBSWJx2eDcJOXzkaNL6uEwRm1ouYeal"

const fileUrl = "https://api.figma.com/v1/files/skLmzMB7kGkXFozRBHDM6S?id=970%3A9763"

// 读取Figma资源写入本地
const getFigmaFile = () => {
  const cmd = `curl -sH 'X-Figma-Token:${token}' '${fileUrl}'`
  console.log(cmd)
  const workerProcess = exec(cmd, { maxBuffer: 1024 * 1024 * 1024 * 1024 }, (error, stdout, stderr) => {
    if (error) {
      console.warn(error);
      console.log(stderr)
    }
    // 保存到本地
    const fs = require('fs')
    // 获取当前时间当文件名
    const time = new Date().getTime()
    const fileName = `../assets/figma/${time}.json`
    fs.writeFile(fileName, stdout, (err) => {
        if (err) {
            console.log('文件写入失败', err)
        }
    })
  });
  console.log('pid:', workerProcess.pid)
  workerProcess.on('close', (code) => {
    console.log('close:', code)
  })


}
getFigmaFile();



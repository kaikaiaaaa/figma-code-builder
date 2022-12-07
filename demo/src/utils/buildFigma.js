const { exec } = require('child_process');

const token = "figd_wQnvl9MDT5xTSZPvBHlcZeGDY_cdyUosJfJfZp0p"
// const token = "figd_MI4wsYlLqHBSWJx2eDcJOXzkaNL6uEwRm1ouYeal"

const fileUrl = "https://www.figma.com/file/MkGUgTLpMonPa4RdOgnOj2/Untitled?t=skCN0kOEkTszFnUB-1"
// const fileUrl = "https://api.figma.com/v1/files/skLmzMB7kGkXFozRBHDM6S?id=970%3A9763"

const getFigmaFile = () => {
  const cmd = `curl -sH 'X-Figma-Token:${token}' '${fileUrl}'`
  console.log(cmd)
  const workerProcess = exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.warn(error);
      console.log(stderr)
    }
    console.log(stdout)
  });
  console.log('pid:', workerProcess.pid)
  workerProcess.on('close', (code) => {
    console.log('close:', code)
  })


}
getFigmaFile()



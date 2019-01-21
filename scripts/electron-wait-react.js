import net from 'net'
import child from 'child_process'
import boxen from 'boxen'
const port = process.env.PORT || 3000

process.env.ELECTRON_START_URL = `http://localhost:${port}`

const client = new net.Socket()
let startedElectron = false

// 检测 renderer 是否渲染
const tryConnection = () => {
  client.connect(
    {
      port,
    },
    () => {
      client.end()
      if (!startedElectron) {
        startedElectron = true
        child.exec('npm start')
        console.log(
          boxen('renderer process', {
            padding: 1,
          }),
        )
      }
    },
  )
}

tryConnection()
client.on('error', () => {
  setTimeout(tryConnection, 1000)
})

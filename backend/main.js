import { WebSocketServer } from 'ws'
import { appendFileSync } from 'fs'

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', function connection(ws) {
  ws.on('error', console.error)

  ws.on('message', function message(data) {
    console.log(`received: ${data}`)

    appendFileSync('audio_data.webm', data)
  })
})

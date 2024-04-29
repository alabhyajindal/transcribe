navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  console.log(stream)
  const socket = new WebSocket('ws://localhost:8080')

  socket.onopen = () => {
    console.log('WS open')
  }

  socket.onerror = () => {
    alert('oops! we messed up.')
  }

  const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0 && socket.readyState == WebSocket.OPEN) {
      socket.send(event.data)
      console.log('audio data sent')
    }
  }

  mediaRecorder.start(100)

  socket.onclose = () => {
    console.log('WS closed')
    mediaRecorder.stop()
  }
})

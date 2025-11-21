const net = require('net')
const HRPC = require('./spec/hrpc')

const PORT = 3000

function createServer() {
  const server = net.createServer((socket) => {
    console.log('Client connected')

    const rpc = new HRPC(socket)

    // Handle ping requests
    rpc.onPing((data) => {
      console.log('Received ping:', data)

      const response = {
        message: `Pong! Echo: ${data.message}`,
        timestamp: data.timestamp,
        serverTime: Date.now()
      }

      console.log('Sending pong:', response)
      return response
    })

    socket.on('close', () => {
      console.log('Client disconnected')
    })

    socket.on('error', (err) => {
      console.error('Socket error:', err.message)
    })
  })

  server.listen(PORT, () => {
    console.log(`Ping server listening on port ${PORT}`)
  })

  server.on('error', (err) => {
    console.error('Server error:', err)
  })

  return server
}

if (require.main === module) {
  createServer()
}

module.exports = { createServer }

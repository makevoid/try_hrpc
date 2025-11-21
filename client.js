const net = require('net')
const HRPC = require('./spec/hrpc')

const PORT = 3000
const HOST = 'localhost'

async function sendPing(message) {
  return new Promise((resolve, reject) => {
    const socket = net.connect(PORT, HOST, async () => {
      console.log('Connected to server')

      const rpc = new HRPC(socket)

      try {
        const request = {
          message: message || 'Hello from client!',
          timestamp: Date.now()
        }

        console.log('Sending ping:', request)
        const response = await rpc.ping(request)
        console.log('Received pong:', response)

        const roundTripTime = Date.now() - request.timestamp
        console.log(`Round-trip time: ${roundTripTime}ms`)

        socket.end()
        resolve(response)
      } catch (err) {
        console.error('Error during ping:', err)
        socket.end()
        reject(err)
      }
    })

    socket.on('error', (err) => {
      console.error('Connection error:', err.message)
      reject(err)
    })
  })
}

async function main() {
  const message = process.argv[2] || 'Hello from client!'

  try {
    await sendPing(message)
    process.exit(0)
  } catch (err) {
    console.error('Failed to ping server:', err.message)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = { sendPing }

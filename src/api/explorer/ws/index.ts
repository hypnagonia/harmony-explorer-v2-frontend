import { io } from 'socket.io-client'

const socket = io('ws://localhost:3001', {transports: ['websocket']})

socket.connect()

export const transport = (method: string, params: any[]) => {
  return new Promise((resolve, reject) => {
    socket.emit(method, params, (res: any) => {
      const payload = JSON.parse(res.payload)

      if (res.event === 'Response') {
        resolve(payload)
      } else {
        reject(payload)
      }
    })
  })
}

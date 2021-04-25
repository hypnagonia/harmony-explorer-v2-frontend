import { io } from 'socket.io-client'

const socket = io('http://64.227.121.223:3001')

socket.connect()

export const call = (method: string, params: any[]) => {
  socket.emit(method, params)
}
import express from 'express'
import http from 'http'
import {Server, Socket} from 'socket.io'
import {OpusEncoder} from '@discordjs/opus'
import {broadcastAudio} from "./lib/brodcast_audio";

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const encoder = new OpusEncoder(48000, 2)

const PORT = 3001

let clients: Socket[] = []

io.on('connection', (socket) => {
  console.log('client connected ->', socket.id)
  clients.push(socket)

  socket.on('audio-data', (data) => {
    broadcastAudio(encoder, clients, data, socket.id)
  })

  socket.on('disconnect', () => {
    console.log('client disconnected ->', socket.id)
    clients = clients.filter((client) => client.id !== socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`server running on -> http://localhost:${PORT}`)
})
import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import { ACTIONS } from "./lib/actions";
import { shareRooms } from "./lib/shareRooms";
import { joinRoom } from "./lib/joinRoom";
import {leaveRoom} from "./lib/leaveRoom";
import {relaySDP} from "./lib/relaySDP";
import {relayIce} from "./lib/relayIce";

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*:3000',
    methods: ["GET", "POST"],
    // transports: ['websocket', 'polling'],
    credentials: false,
  }
})
// const encoder = new OpusEncoder(48000, 2)

const PORT = 3001

// let clients: Socket[] = []


io.on('connection', (socket) => {
  console.log('client connected ->', socket.id)
  // clients.push(socket)

  /**
   * Get all rooms -> io.sockets.adapter.rooms
   * room = socket id
   */
  io.emit(ACTIONS.SHARE_ROOMS, shareRooms(io, socket))

  /**
   * Connect to some room
   */
  socket.on(ACTIONS.ROOM_JOIN, joinRoom(io, socket))

  /**
   * Disconnect from all rooms
   */
  socket.on(ACTIONS.ROOM_LEAVE, leaveRoom(io, socket))


  /**
   * ...
   */
  socket.on(ACTIONS.ROOM_RELAY_SDP, relaySDP(io, socket))

  /**
   * ...
   */
  socket.on(ACTIONS.ROOM_RELAY_ICE, relayIce(io, socket))

  socket.on(ACTIONS.SHARE_DISCONNECT, () => {
    console.log('client disconnected ->', socket.id)
    // clients = clients.filter((client) => client.id !== socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`server running on -> http://localhost:${PORT}`)
})
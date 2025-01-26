import { Server } from 'socket.io'

export function getAllRooms(io: Server) {
  return io.sockets.adapter.rooms
}
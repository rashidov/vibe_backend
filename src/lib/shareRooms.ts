import { Server, Socket } from 'socket.io'
import { getAllRooms } from "./getAllRooms";

export function shareRooms(io: Server, socket: Socket) {
  return { rooms: Array.from(getAllRooms(io).keys()).filter((roomId) => socket.id !== roomId) }
}
import { Server, Socket } from 'socket.io'
import { getAllRooms } from "./getAllRooms";
import { ACTIONS } from "./actions";
import { shareRooms } from "./shareRooms";

export function leaveRoom(io: Server, socket: Socket) {
  return () => {
    const { rooms: joinedRooms } = socket

    // mb this need filter?
    Array.from(joinedRooms).forEach((roomId) => {
      const clients = Array.from(getAllRooms(io).get(roomId) || [])
      clients.filter((clientId) => {
        io.to(clientId).emit(ACTIONS.ROOM_REMOVE_PEER, {
          peerId: socket.id,
        })

        socket.emit(ACTIONS.ROOM_REMOVE_PEER, {
          peerId: clientId,
        })
      })

      socket.leave(roomId)
    })

    io.emit(ACTIONS.SHARE_ROOMS, shareRooms(io, socket))
  }
}
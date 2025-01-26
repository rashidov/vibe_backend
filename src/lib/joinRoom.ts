import { Server, Socket } from 'socket.io'
import { getAllRooms } from "./getAllRooms";
import { ACTIONS } from "./actions";
import { shareRooms } from "./shareRooms";

export function joinRoom(io: Server, socket: Socket) {
  return (config: any) => {
    const { room: roomId } = config
    const { rooms: joinedRooms } = socket

    if (Array.from(joinedRooms).includes(roomId)) {
      return console.warn(`Already joined to ${roomId}`)
    }

    const clients = Array.from(getAllRooms(io).get(roomId) || [])

    /**
     * No create offer
     * from other users -> to connected user
     */
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ROOM_ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
      })

      /**
       * Create offer
       * from connected user -> to other users
       */
      socket.emit(ACTIONS.ROOM_ADD_PEER, {
        peerId: clientId,
        createOffer: true,
      })
    })

    socket.join(roomId)
    io.emit(ACTIONS.SHARE_ROOMS, shareRooms(io, socket))
  }
}
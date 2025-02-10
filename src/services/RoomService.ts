import { roomRepository } from '../entities/Rooms'
import { roomUsersRepository } from '../entities/RoomUsers'
import { CreateRoom } from '../types/rooms'

class RoomService {
  createRoom(payload: CreateRoom) {
    const room = roomRepository.createRoom(payload)
    const roomUsersRelation = roomUsersRepository.addRoom({
      room_id: room.id,
      users: payload?.maintainer ? [payload?.maintainer] : [],
    })
    return { ...room, users: roomUsersRelation.users }
  }
}

export const roomService = new RoomService()

import RoomsEntity from "../entities/Rooms";
import RoomUsersEntity from "../entities/RoomUsers";
import { CreateRoom } from "../types/rooms";

class RoomService {
  roomsRepository: RoomsEntity
  roomUsersRepository: RoomUsersEntity

  constructor() {
    this.roomsRepository = new RoomsEntity()
    this.roomUsersRepository = new RoomUsersEntity()
  }

  createRoom(payload: CreateRoom) {
    const room = this.roomsRepository.createRoom(payload)
    const roomUsersRelation = this.roomUsersRepository.addRoom({
      room_id: room.id,
      users: payload?.maintainer ? [payload?.maintainer] : []
    })
    return { ...room, users: roomUsersRelation.users }
  }
}

const roomService = new RoomService()
export { roomService }
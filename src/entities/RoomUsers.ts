import {RoomUsersRelation, RoomUsersRemovePayload} from "../types/rooms";

class RoomUsersEntity {
  rooms: Map<RoomUsersRelation['room_id'], RoomUsersRelation>

  constructor() {
    this.rooms = new Map()
  }

  getRoom(roomId: string) {
    return this.rooms.get(roomId)
  }

  getAllRooms() {
    return Array.from(this.rooms).map(([,room]) => room)
  }

  addRoom(newRoom: RoomUsersRelation) {
    if (this.rooms.has(newRoom.room_id)) return this.getRoom(newRoom.room_id)!
    this.rooms.set(newRoom.room_id, newRoom)
    return this.getRoom(newRoom.room_id)!
  }

  addUser(room: RoomUsersRelation) {
    if (!this.rooms.has(room.room_id)) return this.addRoom(room)
    const users = [...this.rooms.get(room.room_id)!.users, ...room.users]
    this.rooms.set(room.room_id, { room_id: room.room_id, users })
    return this.getRoom(room.room_id)
  }

  removeUser(payload: RoomUsersRemovePayload) {
    if (!this.rooms.has(payload.room_id)) return undefined
    const users = this.rooms.get(payload.room_id)!.users.filter((userId) => userId !== payload.user_id)
    this.rooms.set(payload.room_id, { room_id: payload.room_id, users })
    return this.getRoom(payload.room_id)
  }

  removeRoom(room_id: string) {
    if (!this.rooms.has(room_id)) return false
    this.rooms.delete(room_id)
    return true
  }
}

export default RoomUsersEntity
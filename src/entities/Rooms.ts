import {uid} from "uid";

type RoomCandidate = {
  room_id: string
  user_id: string
}

type Room = {
  name: string
  id: string
  users: string[]
}

class RoomsEntity {
  rooms: Map<string, Room>

  constructor() {
    this.rooms = new Map()
  }

  createRoom(room: Omit<Room, 'id'>) {
    const id = uid(6)
    this.rooms.set(id, { id, ...room })
  }

  removeRoom(id: string) {
    this.rooms.delete(id)
  }

  addUserToRoom(payload: RoomCandidate) {
    if (!this.rooms.has(payload.room_id)) return
    const oldRoom = this.rooms.get(payload.room_id)!
    this.rooms.set(payload.room_id, { ...oldRoom, users: [...oldRoom.users, payload.user_id] })
  }

  removeUserFromRoom(payload: RoomCandidate) {
    if (!this.rooms.has(payload.room_id)) return
    const oldRoom = this.rooms.get(payload.room_id)!
    const users = oldRoom.users.filter((id) => id !== payload.user_id)
    this.rooms.set(payload.room_id, { ...oldRoom, users })
  }
}

export default RoomsEntity
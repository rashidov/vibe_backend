import {uid} from "uid";

type Room = {
  maintainer?: string
  name: string
  id: string
}

class RoomsEntity {
  rooms: Map<string, Room>

  constructor() {
    this.rooms = new Map()
  }

  getRoom(id: string) {
    return this.rooms.get(id)
  }

  createRoom(room: Omit<Room, 'id'>) {
    const id = uid(6)
    this.rooms.set(id, { id, ...room })
    return this.getRoom(id)
  }

  removeRoom(id: string) {
    if (!this.rooms.has(id)) return false
    this.rooms.delete(id)
    return true
  }
}

export default RoomsEntity
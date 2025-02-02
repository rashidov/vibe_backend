type RemoveRoomPayload = {
  user_id: string
  room_id: string
}

type UserRoom = {
  user_id: string
  rooms: string[]
}

class UserRooms {
  users: Map<string, UserRoom>

  constructor() {
    this.users = new Map()
  }

  getUser(id: string) {
    return this.users.get(id)
  }

  getUserRooms(id: string) {
    if (!this.users.has(id)) return []
    return this.users.get(id)!.rooms
  }

  getAllUsers() {
    return Array.from(this.users).map(([, user]) => user)
  }

  addUser(newUser: UserRoom) {
    if (this.users.has(newUser.user_id)) return this.getUser(newUser.user_id)
    this.users.set(newUser.user_id, newUser)
    return this.getUser(newUser.user_id)
  }

  addRooms(user: UserRoom) {
    if (!this.users.has(user.user_id)) return this.addUser(user)!.rooms
    const rooms = [...this.users.get(user.user_id)!.rooms, ...user.rooms]
    this.users.set(user.user_id, { ...this.getUser(user.user_id)!, rooms })
  }

  removeRoom(payload: RemoveRoomPayload) {
    if (!this.users.has(payload.user_id)) return []
    const rooms = this.getUserRooms(payload.room_id).filter((roomId) => roomId !== payload.room_id)
    this.users.set(payload.user_id, { ...this.getUser(payload.user_id)!, rooms })
    return this.getUserRooms(payload.room_id)
  }

  removeUser(id: string) {
    return this.users.delete(id)
  }
}

export default UserRooms
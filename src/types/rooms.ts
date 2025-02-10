export type Room = {
  // user -> id
  maintainer?: string
  name: string
  id: string
}

export type RoomUsersRelation = {
  room_id: string
  users: string[]
}
export type RoomUsersRemovePayload = {
  room_id: string
  user_id: string
}

export type CreateRoom = Omit<Room, 'id'>
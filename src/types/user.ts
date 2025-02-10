export type User = {
  id: string
  login: string
  socket_id: string | null
}

export type UserRoomRelation = {
  user_id: string
  rooms: string[]
}
export type UserRoomRelationRemovePayload = {
  user_id: string
  room_id: string
}


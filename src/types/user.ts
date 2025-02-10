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

export type UserChannelRelation = {
  user_id: string
  channels: string[]
}
export type UserChannelRelationRemovePayload = {
  user_id: string
  channel_id: string
}

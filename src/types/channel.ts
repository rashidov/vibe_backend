export type Channel = {
  id: string
  maintainer: string
}

export type ChannelRoomRelation = {
  channel_id: string
  rooms: string[]
}
export type ChannelRoomRelationRemovePayload = {
  channel_id: string
  room_id: string
}

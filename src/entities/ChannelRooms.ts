
type RemoveRoomPayload = {
  channel_id: string
  room_id: string
}

type ChannelRoom = {
  channel_id: string
  rooms: string[]
}

class ChannelRooms {
  channels: Map<ChannelRoom['channel_id'], ChannelRoom>

  constructor() {
    this.channels = new Map()
  }

  addChannel(newChannel: ChannelRoom) {
    this.channels.set(newChannel.channel_id, newChannel)
  }

  addRoom(channel: ChannelRoom) {
    if (!this.channels.has(channel.channel_id)) {
      return this.addChannel(channel)
    }
    const rooms = [...this.channels.get(channel.channel_id)!.rooms, ...channel.rooms]
    this.channels.set(channel.channel_id, { channel_id: channel.channel_id, rooms })
  }

  removeRoom(payload: RemoveRoomPayload) {
    if (!this.channels.has(payload.channel_id)) return
    const rooms = this.channels.get(payload.channel_id)!.rooms.filter((roomId) => roomId !== payload.room_id)
    this.channels.set(payload.channel_id, { channel_id: payload.channel_id, rooms })
  }

  removeChannel(channelId: string) {
    this.channels.delete(channelId)
  }
}

export default ChannelRooms

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

  getChannel(id: string) {
    return this.channels.get(id)
  }

  getAllChannels() {
    return Array.from(this.channels).map(([, channel]) => channel)
  }

  addChannel(newChannel: ChannelRoom) {
    this.channels.set(newChannel.channel_id, newChannel)
    return this.getChannel(newChannel.channel_id)
  }

  addRoom(channel: ChannelRoom) {
    if (!this.channels.has(channel.channel_id)) return this.addChannel(channel)
    const rooms = [...this.channels.get(channel.channel_id)!.rooms, ...channel.rooms]
    this.channels.set(channel.channel_id, { channel_id: channel.channel_id, rooms })
    return this.getChannel(channel.channel_id)
  }

  removeRoom(payload: RemoveRoomPayload) {
    if (!this.channels.has(payload.channel_id)) return false
    const rooms = this.channels.get(payload.channel_id)!.rooms.filter((roomId) => roomId !== payload.room_id)
    this.channels.set(payload.channel_id, { channel_id: payload.channel_id, rooms })
    return this.getChannel(payload.channel_id)
  }

  removeChannel(channelId: string) {
    if (!this.channels.has(channelId)) return false
    this.channels.delete(channelId)
    return true
  }
}

export default ChannelRooms
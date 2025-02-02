
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

  getChannelRooms(id: string) {
    return this.channels.get(id)?.rooms || []
  }

  getAllChannels() {
    return Array.from(this.channels).map(([, channel]) => channel)
  }

  addChannel(newChannel: ChannelRoom) {
    if (this.channels.has(newChannel.channel_id)) return this.getChannel(newChannel.channel_id)
    this.channels.set(newChannel.channel_id, newChannel)
    return this.getChannel(newChannel.channel_id)
  }

  addRooms(channel: ChannelRoom) {
    if (!this.channels.has(channel.channel_id)) return this.addChannel(channel)!.rooms
    const rooms = [...this.channels.get(channel.channel_id)!.rooms, ...channel.rooms]
    this.channels.set(channel.channel_id, { channel_id: channel.channel_id, rooms })
    return this.getChannelRooms(channel.channel_id)
  }

  removeRoom(payload: RemoveRoomPayload) {
    if (!this.channels.has(payload.channel_id)) return []
    const rooms = this.channels.get(payload.channel_id)!.rooms.filter((roomId) => roomId !== payload.room_id)
    this.channels.set(payload.channel_id, { channel_id: payload.channel_id, rooms })
    return this.getChannelRooms(payload.channel_id)
  }

  removeChannel(channelId: string) {
    this.channels.delete(channelId)
  }
}

export default ChannelRooms
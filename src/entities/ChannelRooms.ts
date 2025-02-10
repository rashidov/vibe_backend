import { ChannelRoomRelation, ChannelRoomRelationRemovePayload } from "../types/channel";

class ChannelRoomsEntity {
  channels: Map<ChannelRoomRelation['channel_id'], ChannelRoomRelation>

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

  addChannel(newChannel: ChannelRoomRelation) {
    if (this.channels.has(newChannel.channel_id)) return this.getChannel(newChannel.channel_id)
    this.channels.set(newChannel.channel_id, newChannel)
    return this.getChannel(newChannel.channel_id)
  }

  addRooms(channel: ChannelRoomRelation) {
    if (!this.channels.has(channel.channel_id)) return this.addChannel(channel)!.rooms
    const rooms = [...this.channels.get(channel.channel_id)!.rooms, ...channel.rooms]
    this.channels.set(channel.channel_id, { channel_id: channel.channel_id, rooms })
    return this.getChannelRooms(channel.channel_id)
  }

  removeRoom(payload: ChannelRoomRelationRemovePayload) {
    if (!this.channels.has(payload.channel_id)) return []
    const rooms = this.channels.get(payload.channel_id)!.rooms.filter((roomId) => roomId !== payload.room_id)
    this.channels.set(payload.channel_id, { channel_id: payload.channel_id, rooms })
    return this.getChannelRooms(payload.channel_id)
  }

  removeChannel(channelId: string) {
    this.channels.delete(channelId)
  }
}

export const channelRoomsRepository = new ChannelRoomsEntity()
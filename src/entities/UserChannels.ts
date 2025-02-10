import { UserChannelRelation, UserChannelRelationRemovePayload } from "../types/user";

class UserChannelsEntity {
  users: Map<string, UserChannelRelation>

  constructor() {
    this.users = new Map()
  }

  getUser(id: string) {
    return this.users.get(id)
  }

  getUserChannels(id: string) {
    return this.users.get(id)?.channels || []
  }

  getAllUsers() {
    return Array.from(this.users).map(([, user]) => user)
  }

  addUser(newUser: UserChannelRelation) {
    if (this.users.has(newUser.user_id)) return this.getUser(newUser.user_id)
    this.users.set(newUser.user_id, newUser)
    return this.getUser(newUser.user_id)
  }

  addChannels(user: UserChannelRelation) {
    if (!this.users.has(user.user_id)) return this.addUser(user)!.channels
    const channels = [...this.users.get(user.user_id)!.channels, ...user.channels]
    this.users.set(user.user_id, { user_id: user.user_id, channels })
    return this.getUserChannels(user.user_id)
  }

  removeUserChannel(payload: UserChannelRelationRemovePayload) {
    if (!this.users.has(payload.user_id)) return []
    const channels = this.users.get(payload.user_id)!.channels.filter((channelId) => channelId !== payload.channel_id)
    this.users.set(payload.user_id, { user_id: payload.user_id, channels })
    return this.getUserChannels(payload.user_id)
  }

  removeUser(id: string) {
    if (!this.users.has(id)) return false
    this.users.delete(id)
    return true
  }
}

export const userChannelsRepository = new UserChannelsEntity()
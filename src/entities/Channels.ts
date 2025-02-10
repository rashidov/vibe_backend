import {uid} from "uid";

type Channel = {
  id: string
  maintainer: string
}

class ChannelsEntity {
  channels: Map<string, Channel>

  constructor() {
    this.channels = new Map()
  }

  get(id: string) {
    this.channels.get(id)
  }

  create(maintainer: string) {
    const id = uid(4)
    this.channels.set(id, { id, maintainer })
    return this.get(id)
  }

  remove(id: string) {
    if (!this.channels.has(id)) return false
    this.channels.delete(id)
    return true
  }
}

export default ChannelsEntity
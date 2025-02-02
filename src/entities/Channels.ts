import {uid} from "uid";

type Channel = {
  id: string
  maintainer: string
}

class Channels {
  channels: Map<string, Channel>

  constructor() {
    this.channels = new Map()
  }

  create(maintainer: string) {
    const id = uid(4)
    this.channels.set(id, { id, maintainer })
  }

  remove(id: string) {
    this.channels.delete(id)
  }
}

export default Channels
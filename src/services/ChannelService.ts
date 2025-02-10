import Channels from "../entities/Channels";

class ChannelService {
  channelRepository: Channels

  constructor(channelRepository: Channels) {
    this.channelRepository = channelRepository
  }
}
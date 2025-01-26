import { Server, Socket } from 'socket.io'
import {ACTIONS} from "./actions";

type Payload = {
  peerId: string
  iceCandidate: RTCIceCandidate
}

export function relayIce(io: Server, socket: Socket) {
  return ({ peerId, iceCandidate }: Payload) => {
    io.to(peerId).emit(ACTIONS.ROOM_ICE_CANDIDATE, {
      peerId: socket.id,
      iceCandidate
    })
  }
}
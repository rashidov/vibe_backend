import { Server, Socket } from 'socket.io'
import {ACTIONS} from "./actions";

type Payload = {
  peerId: string
  sessionDescription: RTCSessionDescriptionInit
}

export function relaySDP(io: Server, socket: Socket) {
  return ({ peerId, sessionDescription }: Payload) => {
    io.to(peerId).emit(ACTIONS.ROOM_SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription
    })
  }
}
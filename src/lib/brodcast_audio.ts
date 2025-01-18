import {Socket} from "socket.io";
import {OpusEncoder} from "@discordjs/opus";
import {mixAudio} from "./mix_audio";

// Рассылка микшированного аудиопотока всем клиентам
export function broadcastAudio(encoder: OpusEncoder, clients: Socket[], data: any, senderId: string) {
  const decoded = encoder.decode(data); // Декодируем аудио
  const mixedAudio = mixAudio([decoded]); // Микшируем аудио (функция ниже)
  const encoded = encoder.encode(mixedAudio, 480); // Кодируем обратно в Opus

  clients.forEach((client) => {
    if (client.id !== senderId) {
      client.emit("audio-data", encoded);
    }
  });
}
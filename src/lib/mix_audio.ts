// Простая функция микширования аудио
export function mixAudio(audioStreams:any[]) {
  const output = Buffer.alloc(audioStreams[0].length);

  for (let i = 0; i < output.length; i++) {
    let sample = 0;
    audioStreams.forEach((stream) => {
      sample += stream[i];
    });
    sample = Math.min(Math.max(sample, -32768), 32767); // Ограничиваем значения
    output.writeInt16LE(sample, i);
  }

  return output;
}
const music = (prefix, ownerBot, botName) => {
  return `
  │◪ *COMANDOS MUSICAIS* ◪│
  
◪ *Buscar músicas*
│
├─ ❏ ${prefix}play
├─ ❏ ${prefix}joox
├─ ❏ ${prefix}lirik
└─ ❏ ${prefix}chord

◪ *Transformar texto em audio*
│
├─ ❏ ${prefix}tts
└─ ❏ ${prefix}gtts

`
}
exports.music = music

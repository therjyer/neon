const menu = (prefix) => {
return `
│◪ *MENUS DA NEON* ◪│
│
❏ *${prefix}therjyer*
└─ Comandos para o dono do bot

❏ *${prefix}admin*
└─ Comandos administrativos

❏ *${prefix}anime*
└─ Buscador de animes

❏ *${prefix}downloader*
└─ Comandos para download

❏ *${prefix}education*
└─ Comandos para entretenimento

❏ *${prefix}fun*
└─ Comandos para entretenimento

❏ *${prefix}getafk*
└─ Comandos para afk

❏ *${prefix}getfig*
└─ Comandos de figurinha

❏ *${prefix}imgmkr*
└─ Criador de imagens

❏ *${prefix}lgmkr*
└─ Criador de logos

❏ *${prefix}memes*
└─ Buscador de memes

❏ *${prefix}music*
└─ Buscador de músicas

❏ *${prefix}pacific*
└─ Comandos pacíficos

❏ *${prefix}other*
└─ Outros comandos

❏ *${prefix}prfl*
└─ Buscador de perfil

❏ *${prefix}quests*
└─ Perguntas aleatórias

❏ *${prefix}search*
└─ Buscador geral

`
}

const admin = (prefix) => {
return `
│◪ *COMANDOS ADMINISTRATIVOS* ◪│

◪ *Comandos de informação*
│
├─ ❏ ${prefix}info
├─ ❏ ${prefix}blocklist
├─ ❏ ${prefix}chatlist
├─ ❏ ${prefix}ping
└─ ❏ ${prefix}bugreport

◪ *Comandos para abrir e fechar o grupo*
│
├─ ❏ ${prefix}opengc
├─ ❏ ${prefix}abrirgp
├─ ❏ ${prefix}closegc
└─ ❏ ${prefix}fechargp

◪ *Comandos para adicionar*
│
├─ ❏ *${prefix}add*
└─ ❏ *${prefix}adicionar*

◪ *Comandos para remover*
│
├─ ❏ *${prefix}kick*
├─ ❏ *${prefix}ban*
└─ ❏ *${prefix}banir*

◪ *Comandos para promover*
│
├─ ❏ *${prefix}promote*
├─ ❏ *${prefix}promover*
└─ ❏ *${prefix}upar*

◪ *Comandos para rebaixar*
│
├─ ❏ *${prefix}demote*
└─ ❏ *${prefix}rebaixar*

◪ *Comandos para fazer link*
│
├─ ❏ *${prefix}linkgroup*
└─ ❏ *${prefix}linkdogrupo*

◪ *Comandos para remover o bot do grupo*
│
├─ ❏ *${prefix}leave*
└─ ❏ *${prefix}sair*

◪ *Comandos para listar os administradores*
│
├─ ❏ *${prefix}listadmins*
├─ ❏ *${prefix}adms*
├─ ❏ *${prefix}administradores*
└─ ❏ *${prefix}listaradms*

◪ *Comandos para listar os membros*
├─ ❏ *${prefix}tagall*
├─ ❏ *${prefix}tagall2*
└─ ❏ *${prefix}tagall3*

◪ *Comando para ativar o simih*
└─ ❏ *${prefix}simih*
`
}

module.exports = {menu, admin}
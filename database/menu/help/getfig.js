const getfig = (prefix) => {
	return `
│◪ *COMANDOS DE FIGURINHA* ◪│

◪ *Criador de figurinha*
├─ ❏ *${prefix}s*
├─ ❏ *${prefix}f*
├─ ❏ *${prefix}fig*
├─ ❏ *${prefix}sticker*
└─ ❏ *${prefix}figurinha*

◪ *Conversor de sticker para imagem*
│
├─ ❏ *${prefix}tg*
├─ ❏ *${prefix}prig*
├─ ❏ *${prefix}toimg*
├─ ❏ *${prefix}primg*
└─ ❏ *${prefix}paraimg*

	Obs.: Ele pode transformar video e gif em figurinha, mas ele *NÃO* converte sticker animado em imagem.

◪ *Renomeador de figurinha*
│
├─ ❏ *${prefix}rnm*
├─ ❏ *${prefix}rename*
└─ ❏ *${prefix}renomear*

`
}

exports.getfig = getfig
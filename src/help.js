const help = (prefix) => {
	return `> *Comandos do bot* <
Comando: *${prefix}sticker*
Descrição: Converte uma imagem, video ou gif em sticker
Modo de uso: Responda ou envie uma imagem, video ou gif com a legenda ${prefix}sticker\n\n
Comando: *${prefix}sticker nobg*
Descrição: Converte uma imagem em sticker enquanto remove seu plano de fundo.
Modo de uso: Responda ou envie uma imagem com a legenda ${prefix}sticker nobg\n\n
Comando: *${prefix}toimg*
Descrição: Converte um sticker em uma imagem
Modo de uso: Responda um sticker com a legenda ${prefix}toimg\n\n
Comando: *${prefix}tsticker*
Descrição: Converte um bloco de texto em sticker
Modo de uso: *${prefix}tsticker [texto para conversão]*\n\n\n\n
> *Comandos de Memes* <
Comando: *${prefix}meme*
Descrição: Memes aleatórios [Em inglês (por enquanto :/)]
Modo de uso: Apenas envie o comando ${prefix}meme\n\n\n\n
> *Outros comandos* <
Comando: *${prefix}tp*
Descrição: Criador de texto ou logo a partir da textpro.me
Modo de uso: *${prefix}tp [seu] [texto]*\nexemplo: *${prefix}tp 1 SeuTexto*
Nota: *${prefix}tp list* ( for show all theme )\n\n
Comando: *${prefix}ep*
Descrição: Criador de texto ou logo a partir da ephoto360.com
Modo de uso: *${prefix}ep [seu] [texto]*\n\nexemplo: *${prefix}ep 1 SeuTexto*
Nota: *${prefix}ep list* ( for show all theme )\n\n
Comando: *${prefix}tahta*
Descrição: Harta Tahta .....
Modo de uso: *${prefix}tahta [texto]*\n\nexemplo: *${prefix}tahta SeuTexto*\n\n
Comando: *${prefix}gtts*
Descrição: Converte text to speech/audio
Modo de uso: *${prefix}gtts [legenda] [texto]*\n\nexemplo: *${prefix}gtts ja On2-chan*\n\n
Comando: *${prefix}url2img*
Descrição: Bate print da internet
Modo de uso: *${prefix}url2img [tipo da imagem] [url]*\n\n
Comando: *${prefix}simi*
Descrição: Sua mensagem será respondida pelo simi
Modo de uso: *${prefix}simi sua mensagem*\n\n
Comando: *${prefix}ocr*
Descrição: Capture o texto de uma imagem
Modo de uso: Responda ou envie uma imagem com essa legenda\n\n
Comando: *${prefix}wait*
Descrição: Procure um anime a partir de sua imagem
Modo de uso: Responda ou envie uma imagem com essa legenda\n\n
Comando: *${prefix}setprefix*
Descrição: troca o prefixo de ativação do bot
Modo de uso: *${prefix}setprefix [texto|opcional]*\n\nexemplo: *${prefix}setprefix [?]*
Nota: Esse comando só pode ser usado pelo dono do bot\n\n
> *Comandos de Grupo* <
Comando: *${prefix}add*
Descrição: Adiciona um membro ao grupo
Modo de uso: *${prefix}add 99 99999-9999*\n\n
Nota: Esse comando só pode ser usado se o bot for um administrador, caso contrário, irá ocasionar em um erro!\n\n
Comando: *${prefix}kick*
Descrição: Remove membros do grupo
Modo de uso: *${prefix}kick @menção_do_membro*\n\n
Nota: Esse comando só pode ser usado se o bot for um administrador, caso contrário, irá ocasionar em um erro!\n\n
Comando: *${prefix}promote*
Descrição: Promove um membro a administrador do grupo
Modo de uso: *${prefix}promote @tagmember*\n\n
Nota: Esse comando só pode ser usado se o bot for um administrador, caso contrário, irá ocasionar em um erro!\n\n
Comando: *${prefix}demote*
Descrição: Rebaixa um administrador a membro do grupo
Modo de uso: *${prefix}demote @tagmember*\n\n
Nota: Esse comando só pode ser usado se o bot for um administrador, caso contrário, irá ocasionar em um erro!\n\n
Comando: *${prefix}linkgroup*
Descrição: Gera um link de convite para o grupo
Modo de uso: Apenas envie o comando
Nota: Esse comando só pode ser usado se o bot for um administrador, caso contrário, irá ocasionar em um erro!\n\n
Comando: *${prefix}leave*
Descrição: Faz o bot sair do grupo
Modo de uso: Apenas envie o comando
Nota: Só pode ser usado ou pelo dono do bot, ou pelo grupo de administradores\n\n
Comando: *${prefix}tagall*
Descrição: Menciona todos os membros do grupo
Modo de uso: Apenas envie o comando
Nota: Esse comando só pode ser usado se o bot for um administrador, caso contrário, irá ocasionar em um erro!\n\n
Comando: *${prefix}simih*
Descrição: Ativa o simi no grupo
Modo de uso: *${prefix}simih 1* para ativar o modo simi e *${prefix}simih 0* para o desativar
Nota: Esse comando só pode ser usado se o bot for um administrador, caso contrário, irá ocasionar em um erro!\n`
}

exports.help = help

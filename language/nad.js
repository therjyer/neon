exports.wait = () => {
	return`*Aguarde Estou Fazendo...*`
}

exports.succes = () => {
	return`*「 SUCESSO 」*`
}

exports.lvlon = () => {
	return`*「🐊」Nível ativo*`
}

exports.lvloff = () => {
	return`*「🐊」Nível desativado*`
}

exports.lvlnul = () => {
	return`*「🐊」Sem nível*`
}

exports.lvlnoon = () => {
	return`*「🐊」Modo nível off*`
}

exports.noregis = () => {
	return`*「🐊」SEM REGISTRO*\n*Para se registrar use ${prefix}daftar nome|idade* \n\n*exemplo ${prefix}daftar Gabriel|18*`
}

exports.baned = () => {
	return`*Esse usuário foi banido de utilizar o menu e alguns comandos do DrSatie-Bot!*`
}

exports.premium = () => {
	return`*Somente usuários premium podem utilizar*`
}

exports.rediregis = () => {
	return`*「 JÁ POSSUI REGISTRO 」*\n\n*Oi gata você já possui registro...*`
}

exports.stikga = () => {
	return`*「 🐊 」Ocorreu um erro*`
}

exports.linkga = () => {
	return`*「🐊」Link invalido*`
}

exports.groupo = () => {
	return`*「🐊」Somente em grupos...*`
}

exports.ownerb = () => {
	return`*Somente o dono do bot pode utilizar esses comandos.*`
}

exports.ownerg = () => {
	return`*「🐊」Só o dono do grupo pode usar...*`
}

exports.admin = () => {
	return`*「🐊」Só ADMs...*`
}

exports.badmin = () => {
	return`*「🐊」O BOT precisa ser ADM*`
}

exports.nsfwoff = () => {
	return`*「🐊」NSFW ESTA ATIVO*`
}

exports.bug = () => {
	return`*O problema foi relatado ao Gabriel🐊*`
}

exports.wrongf = () => {
	return`*Coloque o texto*\n\n*Exemplo: !efeitin2 DrSatie/Teste*`
}

exports.clears = () => {
	return`*「🚮」Limpei tudo com sucesso*`
}

exports.pc = () => {
	return`*「🐊」CADASTRO*\n\nPara saber se você se cadastrou, verifique a mensagem que enviei\n\nNOTA:\n*Se você não entendeu a mensagem, significa que você não salvou o número do bot*`
}

exports.registered = (namaUser, umurUser, serialUser, time, sender, botName) => {
	return`*「 REGISTRO 」*\Usuário :\n\n*➸ Nome : ${namaUser}*\n*➸ Número : wa.me/${sender.split("@")[0]}*\n*➸ Idade : ${umurUser}*\n*➸ Hora do Registro : ${time}*\n\n*「SN」: ${serialUser}*\n_NOTA : Salva o número do Gabriel🐊 ai_`
}

exports.cmdnf = (prefix, command) => {
	return`Esse comando *${prefix}${command}* não existe use *${prefix}menu* para ver as opções`
}

exports.owneresce = (pushname) => {
	return`* Ei ${pushname} só o dono pode fazer isso*`
}
exports.levelup = (pushname, sender, getLevelingXp,  getLevel, getLevelingLevel) => {
	return`
*「 UP 」*
➸ *Nome* : ${pushname}
➸ *Número* : wa.me/${sender.split("@")[0]}
➸ *Grana* : ${getLevelingXp(sender)}
➸ *Level* : ${getLevel} ➸ ${getLevelingLevel(sender)}
`}
 
exports.limitend = (pushname) => {
	return`*Ei ${pushname} O limite de hoje acabou*\n*O limite é zerado a cada hora 24:00*`
}

exports.limitcount = (limitCounts) => {
	return`
*「 LIMITE CONTA 」*\n
Limite : ${limitCounts}
`
}

exports.satukos = () => {
	return`*Parâmetro Adicionar 1/habilitar ou 0/desabilitar`
}

exports.uangkau = (pushname, sender, uangkau) => {
	return`┏━━━━━━━♡ *ATM* ♡━━━━━━━┓\n┃╭───────────────────\n┃│➸ NOME: ${pushname}\n┃│➸ NÚMERO: ${sender.split("@")[0]}\n┃│➸ DINHEIRO: ${uangkau}\n┃╰───────────────────\n┗━━━━━━━━━━━━━━━━━━━━┛`
}

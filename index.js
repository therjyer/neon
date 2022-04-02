// Conexão com o baileys

const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')

// Chamada dos requerimentos

const { removeBackgroundFromImageFile } = require('remove.bg')
const { exec } = require('child_process')
const moment = require('moment-timezone')
//const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const fetch = require('node-fetch')
const fs = require('fs')

// Menu do banco de dados

const {
	color,
	bgcolor
} = require('./database/menu/color')
const {
	shalom
} = require('./database/menu/mensagens/shalom')
const {
	msg
} = require('./database/menu/mensagens/msg')
const {
	sayday,
	sayafter,
	saynight
} = require('./database/menu/mensagens/say')
const {
	wait,
	simih,
	getBuffer,
	h2k,
	generateMessageID,
	getGroupAdmins,
	getRandom,
	banner,
	start,
	info,
	success,
	close
} = require('./database/menu/functions')
const {
	fetchJson,
	fetchText
} = require('./database/menu/fetcher')
const {
	recognize
} = require('./database/menu/ocr')

// Menus do bot

const {
	admin
} = require('./database/menu/help/admin')
const {
	anime
} = require('./database/menu/help/anime')
const {
	downloader
} = require('./database/menu/help/downloader')
const {
	education
} = require('./database/menu/help/education')
const {
	fun
} = require('./database/menu/help/fun')
const {
	getafk
} = require('./database/menu/help/getafk')
const {
	getfig
} = require('./database/menu/help/getfig')
const {
	imgmkr
} = require('./database/menu/help/imgmkr')
const {
	lgmkr
} = require('./database/menu/help/lgmkr')
const {
	memes
} = require('./database/menu/help/memes')
const {
	menu
} = require('./database/menu/help/menu')
const {
	music
} = require('./database/menu/help/music')
const {
	other
} = require('./database/menu/help/other')
const {
	pacific
} = require('./database/menu/help/pacific')
const {
	prfl
} = require('./database/menu/help/prfl')
const {
	quests
} = require('./database/menu/help/quests')
const {
	search
} = require('./database/menu/help/search')
const {
	therjyer
} = require('./database/menu/help/therjyer')

// JSON do banco de dados

const welkom = JSON.parse(fs.readFileSync('./database/json/welkom.json'))
const samih = JSON.parse(fs.readFileSync('./database/json/simi.json'))
const setting = JSON.parse(fs.readFileSync('./database/json/settings.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/json/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/json/level.json'))

prefix = setting.prefix
blocked = []

const getLevelingXp = (userId) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].xp
	}
}

const getLevelingLevel = (userId) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].level
	}
}

const getLevelingId = (userId) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].jid
	}
}

const addLevelingXp = (userId, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].xp += amount
		fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
	}
}

const addLevelingLevel = (userId, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].level += amount
		fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
	}
}

const addLevelingId = (userId) => {
	const obj = {jid: userId, xp: 1, level: 1}
	_level.push(obj)
	fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
}

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color('Escaneie o código QR abaixo'))
	})

	fs.existsSync('./neon.json') && client.loadAuthInfo('./neon.json')
	client.on('connecting', () => {
		start('2', 'Conectando...')
	})
	client.on('open', () => {
		success('2', 'Conectado!')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./neon.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Paz do Senhor meu sancto @${num.split('@')[0]} 👋\nBem vindo ao *${mdata.subject}*.\nO objetivo do grupo é fazermos amizades, falar do amor de Deus e tudo mais!\n\nPor favor, queira fazer o favor de se apresentar com\n• Foto (opcional) 📷\n• Nome ☂️\n• Idade 👶\n• Igreja ⛪\n\nDemais regras na descrição do grupo.\nCaso queria saber quem são os adms do grupo, basta mandar o comando .listadmins`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Que a paz do Senhor fique convosco @${num.split('@')[0]}👋`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = setting.apiKey // contact me on whatsapp wa.me/6285892766102
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: 'Neon está carregando ⌛',
				success: 'Sucesso ✔️',
				levelon: '*O sistema de level foi habilitado* ✔️',
				leveloff: '*O sistema de level for desabilitado* ❌',
				levelnoton: '*O sistema de level ainda não foi ativo* ❌',
				levelnol: '*Level 0*',
				error: {
					stick: 'Ocorreu um erro. ❌\nTente novamente.',
					Iv: 'O link fornecido é inválido ❌'
				},
				only: {
					group: 'Acesso negado, comando de grupo ❌',
					ownerG: 'Acesso negado, você não é o dono do grupo ❌',
					ownerB: 'Acesso negado, você não é o dono do Neon ❌',
					admin: 'Acesso negado, você não é um administrador ❌',
					Badmin: 'Acesso negado, Neon não é um administrador ❌'
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`] // replace this with your number
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isLevelingOn = isGroup ? _leveling.includes(groupId) : false
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
						const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			if (isGroup && isLevelingOn) {
				const currentLevel = getLevelingLevel(sender)
				const checkId = getLevelingId(sender)
				try {
					if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
					const amountXp = Math.floor(Math.random() * 10) + 500
					const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
					const getLevel = getLevelingLevel(sender)
					addLevelingXp(sender, amountXp)
					if (requiredXp <= getLevelingXp(sender)) {
						addLevelingLevel(sender, 1)
						await reply(`*「 Você passou de Level! 」*\n\n➸ *Nome:* @${sender}\n➸ *Experiência*: ${getLevelingXp(sender)}\n➸ *Level*: ${getLevel} -> ${getLevelingLevel(sender)}\n\nContinue conversando para continuar subindo! 😁😁`)
					}
				} catch (err) {
					console.error(err)
				}
			}
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			let authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined	
			if (authorname != undefined) { } else { authorname = groupName }	
			
			function addMetadata(packname, author) {	
				if (!packname) packname = 'Neon BOT'; if (!author) author = 'Therjyer';
				author = author.replace(/[^a-zA-Z0-9]/g, '');
				let name = `${author}_${packname}`
				if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {	
					return `./src/stickers/${name}.exif`	
				})	

			}
			switch(command) {
				case 'adm': case 'admin':
					client.sendMessage(from, admin(prefix, sender), text, {quoted: mek})
				break
				case 'anime':
					client.sendMessage(from, anime(prefix, sender), text, {quoted: mek})
				break
				case 'dl': case 'downloader':
					client.sendMessage(from, downloader(prefix, sender), text, {quoted: mek})
				break
				case 'edu': case 'education':
					client.sendMessage(from, education(prefix, sender), text, {quoted: mek})
				break
				case 'fun':
					client.sendMessage(from, fun(prefix, sender), text, {quoted: mek})
				break
				case 'getafk':
					client.sendMessage(from, getafk(prefix, sender), text, {quoted: mek})
				break
				case 'getfig':
					client.sendMessage(from, getfig(prefix, sender), text, {quoted: mek})
				break
				case 'imgmkr':
					client.sendMessage(from, imgmkr(prefix, sender), text, {quoted: mek})
				break
				case 'lgmkr':
					client.sendMessage(from, lgmkr(prefix, sender), text, {quoted: mek})
				break
				case 'memes':
					client.sendMessage(from, memes(prefix, sender), text, {quoted: mek})
				break
				case 'ajuda': case 'comandos': case 'help': case 'menu':
					client.sendMessage(from, menu(prefix, sender), text, {quoted: mek})
				break
				case 'msc': case 'music':
					client.sendMessage(from, music(prefix, sender), text, {quoted: mek})
				break
				case 'other':
					client.sendMessage(from, other(prefix, sender), text, {quoted: mek})
				break
				case 'pacific':
					client.sendMessage(from, pacific(prefix, sender), text, {quoted: mek})
				break
				case 'prfl': case 'perfil': case 'profile':
					client.sendMessage(from, prfl(prefix, sender), text, {quoted: mek})
				break
				case 'quests':
					client.sendMessage(from, quests(prefix, sender), text, {quoted: mek})
				break
				case 'srch': case 'search': case 'google': case 'buscar': case 'buscador':
					client.sendMessage(from, search(prefix, sender), text, {quoted: mek})
				break
				case 'therjyer':
					client.sendMessage(from, therjyer(prefix, sender), text, {quoted: mek})
				break
				case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `*Nome do bot*: ${me.name}\n*Número do bot*: @${me.jid.split('@')[0]}\n*Prefixo de comando*: ${prefix}\n*Total de contatos bloqueados*: ${blocked.length}\n*O bot está ativo em* : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'bot':
					client.sendMessage(from, msg(prefix, sender), text, {quoted: mek})
					break
				case 'shalom': case 'shalon':
					client.sendMessage(from, shalom(prefix, sender), text, {quoted: mek})
					break
				case 'timesetday':
					client.sendMessage(from, sayday(prefix, sender), text, {quoted: mek})
				break
				case 'timesetafter':
					client.sendMessage(from, sayafter(prefix, sender), text, {quoted: mek})
				break
				case 'timesetnight':
					client.sendMessage(from, saynight(prefix, sender), text, {quoted: mek})
				break
				case 'blocklist':
					teks = 'Essa é a lista de números bloqueados:\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total: ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
				case 'f': case 'fig': case 'figurinha':	case 's':	case 'sticker':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('Neon BOT', authorname)} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(mess.error.stick)
									client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
								/*client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)*/
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Não foi possível converter ${tipe} em sticker`)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('Neon BOT', authorname)} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(mess.error.stick)
									client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)
									fs.unlinkSync(ran)
								})
								/*client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)*/
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'CGZLmLCr2J7ojBYJLGUKrcFQ'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Ocorreu um erro, tente novamente mais tarde.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								exec(`webpmux -set exif ${addMetadata('Neon BOT', authorname)} ${ranw} -o ${ranw}`, async (error) => {
									if (error) return reply(mess.error.stick)
									client.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
									fs.unlinkSync(ranw)
								})
								//client.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
							})
						})
					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.on('start', function (cmd) {
								console.log('Started :', cmd)
							})
							.on('error', function (err) {
								fs.unlinkSync(media)
								console.log('Error :', err)
							})
							.on('end', function () {
								console.log('Finish')
								fs.unlinkSync(media)
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)*/
					} else {
						reply(`Marque uma imagem com o comando *${prefix}fig*.\nCaso seja vídeo, apenas 10 segundos são suportados.\nObs.: Para se mover, o vídeo ou gif deve ter menos de 1mb`)
					}
					break
				case 'setprefix':
					if (args.length < 1) return
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					setting.prefix = prefix
					fs.writeFileSync('./src/settings.json', JSON.stringify(setting, null, '\t'))
					reply(`Prefixo alterado com sucesso para: ${prefix}`)
					break
					case 'tagall':
						if (!isGroup) return reply(mess.only.group)
						if (!isGroupAdmins) return reply(mess.only.admin)
						members_id = []
						teks = (args.length > 1) ? body.slice(8).trim() : ''
						teks += '\n\n'
						for (let mem of groupMembers) {
							teks += `*#* @${mem.jid.split('@')[0]}\n`
							members_id.push(mem.jid)
						}
						mentions(teks, members_id, true)
						break
						case 'tagall2':
						members_id = []
						teks = (args.length > 1) ? body.slice(8).trim() : ''
						teks += '\n\n'
						for (let mem of groupMembers) {
							teks += `╠➥ @${mem.jid.split('@')[0]}\n`
							members_id.push(mem.jid)
						}
						reply(teks)
						break
						case 'tagall3':
						members_id = []
						teks = (args.length > 1) ? body.slice(8).trim() : ''
						teks += '\n\n'
						for (let mem of groupMembers) {
							teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
							members_id.push(mem.jid)
						}
						client.sendMessage(from, teks, text, {detectLinks: false, quoted: mek})
						break
				case 'clearall':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('Conversa limpa com sucesso 😘')
					break
				case 'bc':
					if (!isOwner) return reply('Quem é Você? 🧐')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[Iniciando transmissão]\n\n${body.slice(4)}`})
						}
						reply('Sucesso na transmissão')
					}
					break
					case 'promover':
					case 'upar':
                    case 'promote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Promovido com sucesso 🤴\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(from, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`@${mentioned[0].split('@')[0]} foi promovido(a) a administrador(a) do grupo! 🤴`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
				case 'rebaixar':
				case 'demote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Rebaixado com sucesso 👶\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`@${mentioned[0].split('@')[0]} foi rebaixado(a) a membro do grupo! 👶`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'adicionar':
				case 'add':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('Preciso do número de quem você deseja adicionar, sem nenhuma pontuação 🧞‍♀️')
					if (args[0].startsWith('08', '91', '21', '11')) return reply('Eita, você se esqueceu do código do país 🔧')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error:', e)
						reply('Não consegui adicionar esse contato, talvez seja um contato privado 🏺')
					}
					break
				case 'ban':
				case 'banir':
				case 'kick':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Opa, algo deu errado! 😬\nPor favor, verifique se você marcou corretamente a pessoa.')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'É uma pena que as coisas tenham que ser assim...\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Espero que você pense melhor nos seus atos @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				case 'adms':
				case 'administradores':
				case 'listaradms':
				case 'listadmins':
					if (!isGroup) return reply(mess.only.group)
					teks = `Lista de administradores do grupo *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'linkdogrupo':
				case 'linkgrupo':
                case 'linkgroup':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    linkgc = await client.groupInviteCode(from)
                    reply('https://chat.whatsapp.com/'+linkgc)
                    break
				case 'sair':
                case 'leave':
                    if (!isGroup) return reply(mess.only.group)
                    if (isGroupAdmins || isOwner) {
                    	client.groupLeave(from)
                    } else {
                        reply(mess.only.admin)
                    }
                    break
				case 'tg':	case 'prig': case 'toimg': case 'primg': case 'paraimg':
					if (!isQuotedSticker) return reply('Você não marcou um sticker 🤷')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Não conseguir converter esse sticker em imagem ❌\nMas tente de novo! 🕹')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '>//<'})
						fs.unlinkSync(ran)
					})
					break
				case 'bemvindo':
				case 'boasvindas':
				case 'welcome':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Se quiser alterar disto, mande esse mesmo código com um 0 para desativar ou um 1 para ativar 🧐')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('As boas vindas já estão ativas nesse grupo 😅')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('O recurso de boas-vindas foi ativo com sucesso neste grupo ✔️')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('O recurso de boas-vindas foi dasativado com sucesso neste grupo ✔️')
					} else {
						reply('1 para ativar, 0 para desativar')
					}
                break
				case 'clone':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Mencione o alvo o qual deseja copiar a foto de perfil 🥷')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Mencione o contato 🥷')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`A foto de perfil do @${id.split('@')[0]} foi clonada com sucesso 🤫`, [jid], true)
					} catch (e) {
						reply('Não foi possível clonar essa foto de perfil 😪\nMas tente de novo 😏')
					}
					break
				case 'level':
					if (!isLevelingOn) return reply(mess.levelnoton)
					if (!isGroup) return reply(mess.only.group)
					const userLevel = getLevelingLevel(sender)
					const userXp = getLevelingXp(sender)
					if (userLevel === undefined && userXp === undefined) return reply(mess.levelnol)
					sem = sender.replace('@s.whatsapp.net','')
					resul = `◪ *LEVEL*\n  ├─ ❏ *Nome:* @${sender}\n  ├─ ❏ *Quantidade de Experiência:* ${userXp}\n  └─ ❏ *Seu level:* ${userLevel}`
					client.sendMessage(from, resul, text, { quoted: mek})
					.catch(async (err) => {
							console.error(err)
							await reply(`Error!\n${err}`)
						})
					break
					case 'l':
						if (!isGroup) return reply(mess.only.group)
						if (!isGroupAdmins) return reply(mess.only.admin)
						if (args.length < 1) return reply('Digite 1 para ativar o recurso')
						if (args[0] === '1') {
							if (isLevelingOn) return reply('*o recurso de nível já estava ativo antes*')
							_leveling.push(groupId)
							fs.writeFileSync('./database/json/leveling.json', JSON.stringify(_leveling))
							 reply(mess.levelon)
						} else if (args[0] === '0') {
							_leveling.splice(groupId, 1)
							fs.writeFileSync('./database/json/leveling.json', JSON.stringify(_leveling))
							 reply(mess.leveloff)
						} else {
							reply(` *Digite o comando 1 para ativar, 0 para desativar *\n * Exemplo: ${prefix}l 1*`)
						}
					break
				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						return //console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
							}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
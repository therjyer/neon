const { removeBackgroundFromImageFile } = require('remove.bg')
const { exec } = require('child_process')
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')

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

const fig = async (prefix, sender, text) => {
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
				reply(`Poxa, não consegui converter o ${tipe} em sticker, mas tente de novo 🥺`)
			})
			.on('end', function () {
				console.log('Finish')
				exec(`webpmux -set exif ${addMetadata('BOT', authorname)} ${ran} -o ${ran}`, async (error) => {
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
		keyrmbg = 'Your-ApiKey'
		await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}).then(res => {
			fs.unlinkSync(media)
			let buffer = Buffer.from(res.base64img, 'base64')
			fs.writeFileSync(ranp, buffer, (err) => {
				if (err) return reply('Ocorreu um erro, mas tente novamente, por obséquio 🤠')
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
		reply(`Envie ou mencione uma foto com a legenda ${prefix}sticker para fazer a figurinha 🤗\nPorém caso seja um vídeo, o tempo máximo suportado é de 10 segundos 😅`)
	}
}

exports.fig = fig
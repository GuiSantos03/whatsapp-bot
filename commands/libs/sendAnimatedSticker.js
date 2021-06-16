const { decryptMedia } = require("@open-wa/wa-decrypt")

module.exports = async function sendAnimatedSticker(client, message, config, now) {
	const messageDuration = isQuoted(message) ? message.quotedMsgObj.duration : message.duration
	if (messageDuration >= 11) { 
		return client.reply(message.from, "Tamanho máximo: 10 segundos", message.id)  
	} else {
		client.reply(message.from, "_Gerando..._", message.id)
    
		const mediaData = isQuoted(message) ? await decryptMedia(message.quotedMsgObj, config.userAgent) : await decryptMedia(message, config.userAgent)

		try {
			await client.sendMp4AsSticker(message.from, mediaData, { }, { author: `Solicitado por: ${message.sender.pushname}`, pack: config.packageName })
			console.log("\x1b[32m",`[DEBUG] Sticker gerado em ${Date.now() - now}ms`)
		} catch (error) {
			client.reply(message.from, "Erro", message.id)
			console.log("\x1b[31m", "Sticker não enviado")
		}
	}
}

function isQuoted(message) {
	if(message.quotedMsgObj) {
		return true
	}
	return false
}
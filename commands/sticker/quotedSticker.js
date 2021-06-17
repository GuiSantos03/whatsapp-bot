const { decryptMedia } = require("@open-wa/wa-decrypt")
const sendAnimatedSticker = require("../libs/sendAnimatedSticker")

module.exports = async function(client, message, now, config) {
	if (message.body !== undefined && message.body.startsWith(`${config.prefix}sticker`) && message.quotedMsgObj) {
		if (message.quotedMsgObj.type === "image") {
			const media = await decryptMedia(message.quotedMsgObj, config.userAgent)
			await client.sendImageAsSticker(message.from, `data:image/jpeg;base64,${media.toString("base64")}`, { author: `Solicitado por: ${message.sender.pushname}`, pack: config.packageName })
			console.log("\x1b[32m",`[DEBUG] Sticker gerado em ${Date.now() - now}ms`)
		} 

		else if (message.quotedMsgObj.type === "video/mp4" || message.quotedMsgObj.type === "image/gif" || message.quotedMsgObj.type === "video") {
			sendAnimatedSticker(client, message, config, now)
		}
	}
}

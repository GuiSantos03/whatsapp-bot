const { decryptMedia } = require("@open-wa/wa-decrypt")
const config = require("../config.json")

sticker = async function(client, message, now) { 
    const media = await decryptMedia(message, config.userAgent)
    await client.sendImageAsSticker(message.from, `data:image/jpeg;base64,${media.toString("base64")}`, { author: `Solicitado por: ${message.sender.pushname}`, pack: config.packageName });
    console.log(`[DEBUG] Sticker was generated in ${Date.now() - now}ms`);
}

quotedSticker = async function(client, message, now) {
    const media = await decryptMedia(message.quotedMsgObj, config.userAgent)
    await client.sendImageAsSticker(message.from, `data:image/jpeg;base64,${media.toString("base64")}`, { author: `Solicitado por: ${message.sender.pushname}`, pack: config.packageName })
    console.log(`[DEBUG] Sticker was generated in ${Date.now() - now}ms`)
}

animatedSticker = async function(client, message, now) {
    if (message.mimetype === "video/mp4" || message.mimetype === "image/gif" || message.type === "video") {

        if (message.duration >= 10) {
            return client.reply(message.from, "Vídeo muito longo, tamanho máximo: 10 segundos", message.id)  
        }

        client.reply(message.from, "_Gerando..._", message.id)
        const mediaData = await decryptMedia(message, config.userAgent)
        try {
            await client.sendMp4AsSticker(message.from, mediaData, { }, { author: `Solicitado por: ${message.sender.pushname}`, pack: config.packageName })
            console.log(`[DEBUG] Sticker was generated in ${Date.now() - now}ms`)
        } catch (error) {
            console.log(message.from, "Erro", message.id)
        }
    }
}

module.exports = {
    sticker,
    quotedSticker,
    animatedSticker
}
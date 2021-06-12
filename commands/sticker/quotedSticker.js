const { decryptMedia } = require("@open-wa/wa-decrypt")

module.exports = async function(client, message, now, config) {
    if (message.body === `${config.prefix}sticker` && message.quotedMsgObj) {
        if (message.quotedMsgObj.type === "image") {
            const media = await decryptMedia(message.quotedMsgObj, config.userAgent)
            await client.sendImageAsSticker(message.from, `data:image/jpeg;base64,${media.toString("base64")}`, { author: `Solicitado por: ${message.sender.pushname}`, pack: config.packageName })
            console.log(`[DEBUG] Sticker gerado em ${Date.now() - now}ms`)
        } 

        else if (message.quotedMsgObj.type === "video/mp4" || message.quotedMsgObj.type === "image/gif" || message.quotedMsgObj.type === "video") {

            if (message.duration >= 15) {
                return client.reply(message.from, "Tamanho máximo: 15 segundos", message.id)  
            }

            client.reply(message.from, "_Gerando..._", message.id)
            const mediaData = await decryptMedia(message.quotedMsgObj, config.userAgent)
            try {
                await client.sendMp4AsSticker(message.from, mediaData, { }, { author: `Solicitado por: ${message.sender.pushname}`, pack: config.packageName })
                console.log(`[DEBUG] Sticker gerado em ${Date.now() - now}ms`)
            } catch (error) {
                console.log(message.from, "Erro", message.id)
            }
        }
    }
}

const { decryptMedia } = require("@open-wa/wa-decrypt")

module.exports = async function(client, message, now, config) {
    if (message.caption === `${config.prefix}sticker` && message.isMedia) {
        if (message.mimetype === "video/mp4" || message.mimetype === "image/gif" || message.type === "video") {
            animatedMediaToSticker(client, message, now)
        }
    }

    async function animatedMediaToSticker(client, message, now) {
        if (message.duration >= 10) {
            return client.reply(message.from, "Tamanho máximo: 10 segundos", message.id)  
        }

        client.reply(message.from, "_Gerando..._", message.id)
        const mediaData = await decryptMedia(message, config.userAgent)

        try {
            await client.sendMp4AsSticker(message.from, mediaData, { }, { author: `Solicitado por: ${message.sender.pushname}`, pack: config.packageName })
            console.log(`[DEBUG] Sticker gerado em ${Date.now() - now}ms`)
        } catch (error) {
            console.log(message.from, "Erro", message.id)
        }
    }
}
const { decryptMedia } = require("@open-wa/wa-decrypt")


module.exports = async (client, message, now, config) => {
    if (message.caption === `${config.prefix}sticker` && message.isMedia && message.type === "image") {
        const media = await decryptMedia(message, config.userAgent)
        await client.sendImageAsSticker(message.from, `data:image/jpeg;base64,${media.toString("base64")}`, { author: `Solicitado por: ${message.sender.pushname}`, pack: config.packageName });
        console.log(`[DEBUG] Sticker gerado em ${Date.now() - now}ms`);
    }
}

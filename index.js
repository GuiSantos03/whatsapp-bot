const wa = require("@open-wa/wa-automate")
const { decryptMedia } = require("@open-wa/wa-decrypt");
const config = require("./config.json")

const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

wa.create().then(client => start(client))

async function start(client) {
    client.onMessage(async (message) => {
        const now = Date.now();
        if (message.caption === `${config.prefix}sticker` && message.isMedia && message.type === "image") {
            const media = await decryptMedia(message, uaOverride);
            await client.sendImageAsSticker(message.from, `data:image/jpeg;base64,${media.toString("base64")}`, { author: `Solicitado por: ${message.sender.pushname}`, pack: config.packageName });
            console.log(`[DEBUG] Sticker was generated in ${Date.now() - now}ms`);
        }
            else if (message.body === `${config.prefix}sticker` && message.quotedMsgObj && message.quotedMsgObj.type === "image") {
            const media = await decryptMedia(message.quotedMsgObj, uaOverride);
            await client.sendImageAsSticker(message.from, `data:image/jpeg;base64,${media.toString("base64")}`, { author: `Solicitado por: ${message.sender.pushname}`, pack: config.packageName });
            console.log(`[DEBUG] Sticker was generated in ${Date.now() - now}ms`);
        }
            else if (message.caption === `${config.prefix}sticker` && message.isMedia) {
                if (message.mimetype === "video/mp4" || message.mimetype === "image/gif" || message.type === "video") {
                    if (message.duration >= 10) return client.reply(message.from, "Vídeo muito longo, tamanho máximo: 10 segundos", message.id); {
                        client.reply(message.from, "_Espera ai amor..._", message.id);
                        const mediaData = await decryptMedia(message, uaOverride);
                        try {
                            await client.sendMp4AsSticker(message.from, mediaData, { }, { author: `Solicitado por: ${message.sender.pushname}`, pack: config.packageName })
                            console.log(`[DEBUG] Sticker was generated in ${Date.now() - now}ms`)
                        } catch (error) {
                            console.log(message.from, "Erro", message.id);
                        }
                    }
                }
            }
        }
    )
}
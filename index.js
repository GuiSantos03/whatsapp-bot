const wa = require("@open-wa/wa-automate")
const { sticker, quotedSticker, animatedSticker } = require("./commands/sticker.js")
const googleImageSearch = require("./commands/googleImageSearch.js")

const config = require("./config.json")

wa.create().then(client => start(client))

async function start(client) {
    client.onMessage(async (message) => {

        const now = Date.now()

        if (message.caption === `${config.prefix}sticker` && message.isMedia && message.type === "image") {
            sticker(client, message, now)
        } 

        else if (message.body === `${config.prefix}sticker` && message.quotedMsgObj && message.quotedMsgObj.type === "image") {
            quotedSticker(client, message, now)
        }

        else if (message.caption === `${config.prefix}sticker` && message.isMedia) {
            animatedSticker(client, message, now)
        }

        else if (message.body != undefined && message.body.indexOf(`${config.prefix}pesquisar`) != -1) {
            googleImageSearch(client, message, now)
        }
    })
}
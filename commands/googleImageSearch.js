const GoogleImages = require('google-images')

const credentials = require("../credentials.json")
const imageSearch = new GoogleImages(credentials.searchEngineId, credentials.apiKey)

googleImageSearch = async function (client, message, now) {
    try {
        imageSearch.search(message.body.slice(11))
            .then( async image => {
                try {
                    await client.sendImage(message.from, `${image[0].url}`, "", `Resultado da pesquisa de *${message.sender.pushname}*: \n\n_${image[1].description}_`)
                    console.log(`Imagem enviada com descrição em: ${Date.now() - now}ms`)
                } catch {                    
                    if (thumbnailNotUndefined == true) {
                        await client.sendImage(message.from, `${image[0].thumbnail.url}`, "", `Resultado da pesquisa de *${message.sender.pushname}*`)
                        console.log(`thumbnail enviada em: ${Date.now() - now}ms`)
                    } else {
                        await client.reply(message.from, `Nenhum resultado encontrado para: ${message.body.slice(11)}`, message.id)
                        console.log("Imagem não enviada")
                    }
                }})
    } catch {
        await client.reply(message.from, `Nenhum resultado encontrado para: ${message.body.slice(11)}`, message.id)
        console.log("Imagem não enviada")
    }
}

thumbnailNotUndefined = function(image) {
    if (image[0].thumbnail.url != undefined) {
        return true
    }
}

module.exports = googleImageSearch
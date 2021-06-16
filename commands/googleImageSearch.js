const GoogleImages = require("google-images")

const credentials = require("../credentials.json")
const imageSearch = new GoogleImages(credentials.searchEngineId, credentials.apiKey)



module.exports = async (client, message, now, config) => {
	if (message.body != undefined && message.body.indexOf(`${config.prefix}pesquisar`) != -1) {

		imageSearch.search(message.body.slice(11))
			.then( async image => {
				try {
					await client.sendImage(message.from, `${image[0].url}`, "", `Resultado da pesquisa de *${message.sender.pushname}*: \n\n_${image[1].description}_`)
					console.log("\x1b[32m", `[DEBUG] Imagem enviada com descrição em: ${Date.now() - now}ms`)
				} catch {                    
					if (thumbnailNotUndefined(image)) {
						await client.sendImage(message.from, `${image[0].thumbnail.url}`, "", `Resultado da pesquisa de *${message.sender.pushname}*`)
						console.log("\x1b[33m",`[DEBUG] thumbnail enviada em: ${Date.now() - now}ms`)
					} else {
						await client.reply(message.from, `Nenhum resultado encontrado para: ${message.body.slice(11)}`, message.id)
						console.log("\x1b[31m","[DEBUG] Imagem não econtrada")
					}
				}})
			.catch(async (error) => {
				await client.reply(message.from, `Nenhum resultado encontrado para: ${message.body.slice(11)}`, message.id)
				console.error(error)
				console.log("\x1b[31m","[DEBUG] Imagem não encontrada")
					
			})

	}
}

function thumbnailNotUndefined(image) {
	if (image[0].thumbnail.url !== undefined) {
		return true
	}
	return false
}


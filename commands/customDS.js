/* eslint-disable no-useless-escape */
const fetch = require("node-fetch")
const stringFormatter = require("./libs/stringFormatter.js")

module.exports = async (client, message, now, config) => {
	if (message.body !== undefined && message.body.indexOf(`${config.prefix}ds`) !== -1) {
		const messageTrim = message.body.slice(4).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		const filter = /^[\w|\w_ ]||[#||?||%\w#||?||%|#||?||%\w#||?||%]*$/gi
		if (messageTrim.length <= 40 && messageTrim.match(filter)) { //permitir apenas letras
			const top = messageTrim.split("|")[0]
			const bottom = messageTrim.split("|")[1]
			const person = messageTrim.split("|")[2]
			const meme = await custom(top, bottom, person)
			client.sendFile(message.from, meme.url, "image.png", "", null, true)
			console.log("\x1b[32m",`[DEBUG] Meme gerado em ${Date.now() - now}ms`)
		} else {
			client.reply(message.from, "Texto grande ou inválido", message.id)
		}
	}
}

function custom(top, bottom, person) {
	return new Promise((resolve, reject) => {
		const topText = stringFormatter(top)
		const bottomText = stringFormatter(bottom)
		const personText = stringFormatter(person)

		fetch(`https://api.memegen.link/images/ds/${topText}/${bottomText}/${personText}`)
			.then((result) => resolve(result))
			.catch((error) => {
				console.error(error)
				reject(error)
			})
	})
}

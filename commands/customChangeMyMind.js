/* eslint-disable no-useless-escape */
const fetch = require("node-fetch")
const stringFormatter = require("./libs/stringFormatter.js")


module.exports = async (client, message, now, config) => {
	if (message.body !== undefined && message.body.startsWith(`${config.prefix}cmm`)) {
		if (message.body.length <= 40) {
			const meme = await custom(message.body.slice(5).normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
			client.sendFile(message.from, meme.url, "image.png", "", null, true)
			console.log("\x1b[32m",`[DEBUG] Meme gerado em ${Date.now() - now}ms`)
		} else {
			client.reply(message.from, "Texto grande ou inválido", message.id)
		}
	}
}  
  
function custom(textRaw) { 
	return new Promise((resolve, reject) => {
		const text = stringFormatter(textRaw)

		fetch(`https://api.memegen.link/images/cmm/${text}`)
			.then((result) => resolve(result))
			.catch((error) => {
				console.error(error)
				reject(error)
			})
	})
}

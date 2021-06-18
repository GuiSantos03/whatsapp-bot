const fs = require("fs")
const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1")
const { IamAuthenticator } = require("ibm-watson/auth")
const credentials = require("../credentials.json")

module.exports = async (client, message, now, config) => {
	if (message.body !== undefined && message.body.startsWith(`${config.prefix}tts`)) {
		speech(client, message, now)
	}
}

function speech(client, message, now) {
	const textToSpeech = new TextToSpeechV1({
		authenticator: new IamAuthenticator({ apikey: credentials.textToSpeech }),
		serviceUrl: credentials.ibmServiceUrl
	})

	textToSpeech
		.synthesize({
			text: message.body.slice(5),
			voice: "pt-BR_IsabelaVoice",
			accept: "audio/wav"
		})
		.then(async response => {
			const audio =  response.result
			return await textToSpeech.repairWavHeaderStream(audio)
		})
		.then(async repairedFile => {
			fs.writeFileSync("temp/audio.mp3", repairedFile)
			console.log("\x1b[33m",`[DEBUG] Speech salvo em: ${Date.now() - now}ms`)
			await client.sendFile(message.from, "temp/audio.mp3", message.id, null, true, false, true)
			console.log("\x1b[32m",`[DEBUG] Speech enviado em: ${Date.now() - now}ms`)
		})
		.catch(error => {
			console.log(error)
			console.log("\x1b[31m","[DEBUG] Speech não enviado")
		})
}


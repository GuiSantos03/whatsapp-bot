const fs = require("fs");
const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const credentials = require("../../credentials.json");

function speech(client, message, now) {
    if (message.body.length <= 1000) {
        const textToSpeech = new TextToSpeechV1({
            authenticator: new IamAuthenticator({ apikey: credentials.textToSpeech }),
            serviceUrl: credentials.ibmServiceUrl
        });

        const isQuoted = Boolean(message.quotedMsg);
        const quotedPath = isQuoted ? "quotedAudio" : "audio";

        textToSpeech
            .synthesize({
                text: isQuoted ? message.quotedMsg.body : message.body.slice(5),
                voice: "pt-BR_IsabelaVoice",
                accept: "audio/wav"
            })
            .then(async response => {
                const audio = response.result;
                return textToSpeech.repairWavHeaderStream(audio);
            })
            .then(async repairedFile => {
                fs.writeFileSync(`${process.cwd()}/src/temp/${quotedPath}.mp3`, repairedFile);
                console.log("\x1b[33m", `[LOG] Speech salvo em: ${Date.now() - now}ms`);
                await client.sendFile(message.from, `${process.cwd()}/src/temp/${quotedPath}.mp3`, message.id, null, true, false, true);
                console.log("\x1b[32m", `[LOG] Speech enviado em: ${Date.now() - now}ms`);
            })
            .catch(error => {
                console.log(error);
                console.log("\x1b[31m", "[LOG] Speech não enviado");
            });
        return;
    }

    client.reply(message.from, "Texto muito longo", message.id);
}
exports.speech = speech;

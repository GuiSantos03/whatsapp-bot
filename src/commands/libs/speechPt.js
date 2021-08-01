const AWS = require("aws-sdk");
const Fs = require("fs");
const credentials = require("../../credentials.json");

function speechPt(client, message, now) {
    if (message.body.length <= 1000) {
        const creds = new AWS.Credentials(
            credentials.accessKeyId,
            credentials.secretAccessKey
        );

        const isQuoted = Boolean(message.quotedMsg);
        const quotedPath = isQuoted ? "quotedAudioPt" : "audioPt";


        const Polly = new AWS.Polly({
            credentials: creds,
            signatureVersion: "v4",
            region: "us-east-1"
        });

        const params = {
            Text: isQuoted ? message.quotedMsg.body : message.body.slice(6),
            OutputFormat: "mp3",
            VoiceId: "Cristiano"
        };

        Polly.synthesizeSpeech(params, (error, data) => {
            if (error) {
                console.log(error.code);
            } else if (data) {
                if (data.AudioStream instanceof Buffer) {
                    Fs.writeFile(`${process.cwd()}/src/temp/${quotedPath}.mp3`, data.AudioStream, async error => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log("\x1b[33m", `[LOG] Speech PT salvo em: ${Date.now() - now}ms`);
                        await client.sendFile(message.from, `${process.cwd()}/src/temp/${quotedPath}.mp3`, message.id, null, true, false, true);
                        console.log("\x1b[32m", `[LOG] Speech PT enviado em: ${Date.now() - now}ms`);
                    });
                }
            }
        });

        return;
    }


    client.reply(message.from, "Texto muito longo", message.id);
}

module.exports = speechPt;

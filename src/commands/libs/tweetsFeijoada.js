/* eslint-disable camelcase */
const Twitter = require("node-tweet-stream");
const credentials = require("../../credentials.json");

function tweetsFeijoada(client) {
    const t = new Twitter({
        consumer_key: credentials.consumer_key,
        consumer_secret: credentials.consumer_secret,
        token: credentials.token,
        token_secret: credentials.token_secret
    });

    const feijoadaID = "1028353328806285312";
    const groupID = "5511975600950-1616680363@g.us";
    const disabledTimes = [4, 5, 6, 7, 8, 9, 10];

    t.follow(feijoadaID);

    t.on("tweet", async tweet => {
        const now = Date.now();
        const hourUTC = new Date().getUTCHours();
        if (tweet.user.id_str === feijoadaID && !disabledTimes.includes(hourUTC)) {
            try {
                await client.sendImage(groupID, tweet.entities.media[0].media_url);
                console.log("\x1b[32m", `[LOG] Post enviado em: ${Date.now() - now}ms`);
            } catch (error) {
                console.log(
                    "\x1b[31m",
                    error.message.includes("Cannot read property '0' of undefined")
                        ? "" // If tweet does not contain an image
                        : error.message
                );
            }
        }
    });

    t.on("error", error => {
        console.log(error.message);
    });
}

module.exports = tweetsFeijoada;

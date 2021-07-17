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
    const faccinlandiaID = "553196114580-1583521340@g.us";

    t.follow(feijoadaID);

    t.on("tweet", async tweet => {
        const now = Date.now();
        const hourUTC = new Date().getUTCHours();
        console.log(hourUTC);
        if (tweet.user.id_str === feijoadaID && hourUTC >= 10) {
            try {
                await client.sendImage(faccinlandiaID, tweet.entities.media[0].media_url);
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

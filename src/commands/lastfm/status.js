const LastFm = require("lastfm-node-client");
const credentials = require("../../credentials.json");
const LastfmRepo = require("../../repositories/lastfm");

module.exports = async (client, message, now, config) => {
    if (message.body.startsWith(`${config.prefix}status`)) {
        const lastFm = new LastFm(
            credentials.lastfmApiKey,
            credentials.lastfmSecret
        );

        try {
            const lastfmUsername = await LastfmRepo.searchById(message.sender.id);

            try {
                const response = await lastFm.userGetRecentTracks({
                    user: `${lastfmUsername}`,
                    limit: 5
                });

                if (response) {
                    const tracks = response.recenttracks;
                    const nowPlaying = Boolean(tracks.track[0]["@attr"]?.nowplaying);
                    const totalScroobles = tracks["@attr"].total;

                    await client.sendImage(
                        message.from,
                        `${tracks.track[0].image[3]["#text"]}`,
                        "",
                        `\n*${message.sender.pushname}* ${
                            nowPlaying ? "está ouvindo:" : "estava ouvindo:"
                        }` +
                            `\n*🎧${tracks.track[0].name}* - ${tracks.track[0].album["#text"]}` +
                            `\n\nRecentes:` +
                            `\n*🎵 ${tracks.track[1].name}* - ${tracks.track[1].album["#text"]}` +
                            `\n*🎵 ${tracks.track[2].name}* - ${tracks.track[2].album["#text"]}` +
                            `\n*🎵 ${tracks.track[3].name}* - ${tracks.track[3].album["#text"]}` +
                            `\n*🎵 ${tracks.track[4].name}* - ${tracks.track[4].album["#text"]}` +
                            `\n\n(Total de scroobles: ${totalScroobles})`
                    );
                }
            } catch (err) {
                await client.reply(
                    message.from,
                    "Username inválido",
                    message.id
                );
            }
        } catch (err) {
            await client.reply(
                message.from,
                "Use !set para registrar seu username",
                message.id
            );
            console.error(err);
        }
    }
};

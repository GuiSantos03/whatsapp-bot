const LastFm = require("lastfm-node-client");
const connection = require("../../database/connection");
const LastfmRepo = require("../../repositories/lastfm");

module.exports = async (client, message, now, config) => {
    if (message.body.startsWith(`${config.prefix}set`)) {
        const lastfmUsername = await LastfmRepo.searchById(message.sender.id);

        if (lastfmUsername) {
            client.reply(
                message.from,
                `Você já registrou o username: ${lastfmUsername}`,
                message.id
            );
            return;
        }

        if (message.body.slice(5) === "") {
            client.reply(message.from, "Digite um username válido", message.id);
            return;
        }

        const user = {
            userId: message.sender.id,
            lastfmUsername: message.body.slice(5)
        };

        const userRegistered = await LastfmRepo.addUser(user);

        client.reply(message.from, `${userRegistered.lastfmUsername} registrado com sucesso!`, message.id);
    }
};

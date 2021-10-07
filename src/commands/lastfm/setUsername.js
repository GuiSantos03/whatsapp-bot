const LastFm = require("lastfm-node-client");
const LastfmRepo = require("../../repositories/lastfm");

module.exports = async (client, message, now, config) => {
    if (message.body.startsWith(`${config.prefix}set`)) {
        const lastfmUsername = await LastfmRepo.searchById(message.sender.id);

        const handleUsername = message.body.slice(5);

        if (lastfmUsername) {
            client.reply(
                message.from,
                `Você já registrou o username: ${lastfmUsername}`,
                message.id
            );
            return;
        }

        if (handleUsername === "") {
            client.reply(message.from, "Digite um username válido", message.id);
            return;
        }

        const user = {
            userId: message.sender.id,
            lastfmUsername: handleUsername
        };

        const userRegistered = await LastfmRepo.addUser(user);

        if (userRegistered) {
            client.reply(message.from, `${handleUsername} registrado com sucesso!`, message.id);
        }
    }
};

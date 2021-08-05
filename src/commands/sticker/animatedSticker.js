const sendAnimatedSticker = require("../libs/sendAnimatedSticker");

module.exports = async (client, message, now, config) => {
    if (message.body.startsWith(`${config.prefix}sticker`) && message.isMedia) {
        if (message.mimetype === "video/mp4" || message.mimetype === "image/gif" || message.type === "video") {
            sendAnimatedSticker(client, message, config, now);
        }
    }
};

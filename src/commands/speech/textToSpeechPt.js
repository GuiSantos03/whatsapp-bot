const speechPt = require("../libs/speechPt");

module.exports = async (client, message, now, config) => {
    if (!message.quotedMsg && message.body.startsWith(`${config.prefix}ptts`)) {
        speechPt(client, message, now);
    }
};


const { readFile } = require("fs")

module.exports = (client, message, now, config) => {
	if (message.body !== undefined && message.body.startsWith(`${config.prefix}menu`)) {

		readFile("./commands/libs/utils/commands.txt", "utf-8", (error, data) => {
			client.reply(message.from, data, message.id)    
			if (error) console.error(error)
		})
		
	}
}

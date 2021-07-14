

// module.exports = async (client, message, now, config) => {
// 	if (message.body !== undefined && message.body.startsWith(`${config.prefix}rt`) && message.quotedMsgObj) {
// 		const number = parseInt(message.body.slice(4))
// 		for (let i = 0; i < number; i++) {
// 			console.log(message.body.slice(4))
// 			console.log(i)
// 			console.log(message.quotedMsgObj.content)
// 			await client.sendText(message.from, message.quotedMsgObj.content)
// 		}
// 	}
// }

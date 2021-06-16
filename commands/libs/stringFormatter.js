/* eslint-disable no-useless-escape */

function stringFormatter(string) { 
	if(string !== undefined) {
		const stringFormatted = string.trim()
			.replace(/\s/g, "_")
			.replace(/\?/g, "~q")
			.replace(/\%/g, "~p")
			.replace(/\#/g, "~h")
			.replace(/\//g, "~s")
		return stringFormatted
	} else {
		return " "
	}
}

module.exports = stringFormatter
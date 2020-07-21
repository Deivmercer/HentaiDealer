// Send a description and the usage for all the available commands

const messageTemplate = require("../messageTemplate.js");

module.exports = {

	name: "!hhelp",
	description: "Shows all commands and their usage.",
	aliases: ["!hh", "!hcommands"],
	cooldown: 10,
	execute(msg, args) {

		let { commands } = msg.client;
		let res = messageTemplate.getNewEmebedMessage();
		commands.map(command => {
			let description = command.description;
			if(command.usage)
				description += "\n" + command.usage;
			if(command.aliases)
				description += "\nAliases: " + command.aliases.toString();
			res.addField(command.name, description, false)
		});
		msg.channel.send(res)
			.catch(err => console.log(err));
	}
};

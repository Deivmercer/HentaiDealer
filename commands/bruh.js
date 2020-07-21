// This command was just a test, but it's funny so I'll keep it

const messageTemplate = require("../messageTemplate.js");

module.exports = {

    name: "!bruh",
    description: "OwO what\'s this?",
    cooldown: 10,
    execute(msg, args) {

        msg.channel.send(messageTemplate.getNewEmebedMessage().setDescription("My name's Jeff"))
            .catch(err => console.log(err));
    }
};

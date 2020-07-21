// Sends a random hentai

const nHentaiAPI = require("nhentai-api-js");
const messageTemplate = require("../messageTemplate.js");

const nHentai = new nHentaiAPI();

module.exports = {

    name: "!hr",
    description: "Finds a random hentai",
    aliases: ["!hrandom"],
    cooldown: 10,
    execute(msg, args) {

        nHentai.random()
            .then(res => {
                let message = messageTemplate.createEmbedMessage(res);
                msg.channel.send(message)
                    .catch(err => console.log(err));
            })
            .catch(err => {
                msg.channel.send("Bot machine broke")
                    .catch(err => console.log(err));
                console.log(err);
            });
    }
};

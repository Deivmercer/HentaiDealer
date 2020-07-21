// Sends a random hentai, chosen using the specified filters

const nHentaiAPI = require("nhentai-api-js");
const messageTemplate = require("../messageTemplate.js");

const nHentai = new nHentaiAPI();

module.exports = {

    name: "!hrfilter",
    description: "Finds a random hentai with the specified options",
    usage: "Usage: !hrf [title] -t:[tags] -l:[languages] -a:[artist] -g:[group] -c:[character] -p:[parody]",
    aliases: ["!hrf", "!hrandomfilter"],
    cooldown: 10,
    execute(msg, args) {

        if(!args.length) {
            msg.channel.send("Insufficient arguments")
                .catch(err => console.log(err));
            return;
        }

        let searchString = "", sort;
        args.map(arg => {
            arg = arg.trim();
            console.log(arg);

            if(searchString)
                searchString += " ";
            if (/^(tags|t):.+/.test(arg))
                searchString += "tags:" + arg.split(':')[1];
            else if (/^(languages|l):.+/.test(arg))
                searchString += "languages:" + arg.split(':')[1];
            else if (/^(artist|a):.+/.test(arg))
                searchString += "artist:" + arg.split(':')[1];
            else if (/^(group|g):.+/.test(arg))
                searchString += "group:" + arg.split(':')[1];
            else if (/^(character|c):.+/.test(arg))
                searchString += "character:" + arg.split(':')[1];
            else if (/^(parody|p):.+/.test(arg))
                searchString += "parody:" + arg.split(':')[1];
            else
                searchString += arg;
        });
        
        console.log("Searching " + searchString);
        nHentai.search(searchString, 1, sort)
            .then(res => {
                if (res && res.results.length > 1) {
                    let a = Math.floor((Math.random() * res.num_pages + 1));
                    nHentai.search(searchString, a, sort)
                        .then(res => {
                            if (res && res.results.length > 1) {
                                nHentai.g(res.results[Math.floor((Math.random() * res.results.length + 1))].id)
                                    .then(res => {
                                        let message = messageTemplate.createEmbedMessage(res);
                                        msg.channel.send(message)
                                            .catch(err => console.log(err));
                                    });
                            }
                        })
                        .catch(err => {
                            msg.channel.send(err.message)
                                .catch(err => console.log(err));
                            console.log(err);
                        });
                }
                else
                    msg.channel.send("Nothing found :(")
                        .catch(err => console.log(err));
            })
            .catch(err => {
                msg.channel.send(err.message)
                    .catch(err => console.log(err));
                console.log(err);
            });
    }
};

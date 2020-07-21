require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.login(process.env.TOKEN)
    .catch(err => console.log(err));

client.on("ready", () => {

    console.log(`Logged in as ${client.user.tag}!`);
});

// https://github.com/Tsuk1ko/nhentai-api-js

client.on("message", msg => {

    if (msg.author.id === client.user.id) return;
    let args = msg.content.toLowerCase().split(/-/);
    let command = args.shift().trim();
    console.info(`Received command: ${command}`);

    try {
        let cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
        if (cmd) {
            cmd.execute(msg, args);
            console.info(`Received command: ${command}`);
            command.trim();
        }
    } catch (err) {
        console.error(err);
        msg.channel.send("Bot machine broke.")
            .catch(err => console.log(err));
    }
});

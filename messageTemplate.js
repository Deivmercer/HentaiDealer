const { MessageEmbed } = require("discord.js");

module.exports = {

	getNewEmebedMessage: function () {

		return new MessageEmbed()
			.setColor('#0099ff');
	},

	createEmbedMessage: function (res) {

		let map = new Map();
		res.tags.map(tag => {
			let tagName = "";
			if(map.has(tag.type))
				tagName = map.get(tag.type) + ", ";
			tagName += tag.name;
			map.set(tag.type, tagName);
		})
		let message = this.getNewEmebedMessage()
			.setTitle(res.title.pretty)
			.addField("Pages", res.num_pages, true);
		for (let metaTag of map.keys()) {
			let tags = map.get(metaTag);
			message.addField(metaTag, map.get(metaTag), tags.length < 40);
		}

		message.addField("Link", `https://nhentai.net/g/${res.id}`);
		message.addField("Download", `https://nhentai.net/g/${res.id}/download`);
		let extension;
		if (res.images.cover.t === 'j')
			extension = "jpg";
		else if (res.images.cover.t === 'p')
			extension = "png";
		message.setImage(`https://i.nhentai.net/galleries/${res.media_id}/1.${extension}`);
		return message;
	}
}

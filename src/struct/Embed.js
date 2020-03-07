const Discord = require("discord.js");
const COLORS = {
    error: 0xE74C3C,
    dev: 0xF1C40F,
    notice: 0x3498DB,
    success: 0x2ECC71,
    embedRandom: "#" + ((1 << 24) * Math.random() | 0).toString(16),
}

module.exports = {
    error: (channel, description) => {
        var embed = new Discord.MessageEmbed()
            .setColor(COLORS.error)
            .setDescription(description);

        return channel.send(embed);
    },
    dev: (channel) => {
        var embed = new Discord.MessageEmbed()
            .setColor(COLORS.dev)
            .setDescription("Sorry, this command can only be run by the owner of the bot");

        return channel.send(embed);
    },
    notice: (channel, description) => {
        var embed = new Discord.MessageEmbed()
            .setColor(COLORS.notice)
            .setDescription(description);

        return channel.send(embed);
    },
    success: (channel, description, title, image) => {
        var embed = new Discord.MessageEmbed()
            .setColor(COLORS.success)
            .setTitle(title || "")
            .setDescription(description || "")
            .setImage(image || "");

        return channel.send(embed);
    },
    uni: (channel, description, title, contents, image, thumbnail, color) => {
        var embed = new Discord.MessageEmbed()
            .setColor(color || 0x7289DA)
            .setTitle(title || "")
            .setDescription(description || "")
            .setThumbnail(thumbnail || "")
            .setImage(image || "")
            .setTimestamp();

        if (contents && (typeof contents !== "undefined" || contents !== [])) {
            contents.forEach((element) => {
                embed.addField(element[0], element[1], element[2]);
            });
        }
        return channel.send(embed);
    }
}
module.exports = {
    name: "command.emojiinfo.name",
    description: "command.emojiinfo.description",
    usage: "command.emojiinfo.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        const moment = require("moment");
        
        let emote = message.guild.emojis.find(emoji => emoji.name === args.join(" "));

        if (args.join(" ") !== "") {
            if (!emote) {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.emojiinfo.emojiNotExist"));
            }
            if (emote) {
                let isAnimated = "";

                if (emote.animated) {
                    isAnimated = await client.string(message.guild.id, "command.emojiinfo.isAnimated.yes")
                } else {
                    isAnimated = await client.string(message.guild.id, "command.emojiinfo.isAnimated.no")
                }

                let contents = [
                    [
                        await client.string(message.guild.id, "command.emojiinfo.embed.name"),
                        emote.name,
                        false
                    ],
                    [
                        await client.string(message.guild.id, "command.emojiinfo.embed.id"),
                        emote.id,
                        false
                    ],
                    [
                        await client.string(message.guild.id, "command.emojiinfo.animated"),
                        isAnimated,
                        false
                    ],
                    [
                        await client.string(message.guild.id, "command.emojiinfo.createdAt"),
                        moment(emote.createdAt).format("dddd, Do MMMM YYYY, HH:mm:ss"),
                        false
                    ]
                ]
                return Embeds.uni(message.channel, "", "", contents, "", emote.url, 0x7289DA);
            }
        } else {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.emojiinfo.emojiRequired"));
        }
    }
}
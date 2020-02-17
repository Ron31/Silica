module.exports = {
    name: "command.emoji.name",
    description: "command.emoji.description",
    usage: "command.emoji.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        if (args.join(" ") !== "") {
            const emote = message.guild.emojis.find(emoji => emoji.name === args.join(" "));
            if (emote) {
                return message.channel.send(emote.url);
            } else {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.emoji.emojiNotExist"));
            }
        } else {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.emoji.emojiRequired"));
        }
    }
}
module.exports = {
    name: "command.devmessage.name",
    description: "command.devmessage.description",
    usage: "command.devmessage.usage",
    args: true,
    dm: true,
    cooldown: 10,
    async execute(message, args, client, Embeds) {
        if (args.join(" ") !== "") {
            client.users.cache.get(client.config.owner).send(`You recieved a message from ${message.author.tag}: ` + args.join(" "));
            return Embeds.success(message.channel, await client.string(message.guild.id, "command.devmessage.sent"));
        } else {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.devmessage.messageRequired"));
        }
    }
}
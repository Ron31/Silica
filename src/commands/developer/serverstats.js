module.exports = {
    name: "command.serverstats.name",
    description: "command.serverstats.description",
    usage: "command.serverstats.usage",
    args: true,
    dm: true,
    owner: true,
    cooldown: 2,
    async execute(message, args, client, Embeds) {
        if (args.join(" ") !== "") {
            try {
                let serverstats = client.guilds.cache.get(client.guilds.cache.find(server => server.name === args.join(" ")).id);
                let contents = [
                    [
                        await client.string(message.guild.id, "command.serverstats.ID"),
                        serverstats.id,
                        false
                    ],
                    [
                        await client.string(message.guild.id, "command.serverstats.Owner"),
                        serverstats.owner.user.tag,
                        false
                    ],
                    [
                        await client.string(message.guild.id, "command.serverstats.Humans"),
                        serverstats.members.cache.filter(members => !members.user.bot).size,
                        false
                    ],
                    [
                        await client.string(message.guild.id, "command.serverstats.Bots"),
                        serverstats.members.cache.filter(members => members.user.bot).size,
                        false
                    ]
                ]
                return Embeds.uni(message.channel, "", serverstats.name, contents, "", serverstats.iconURL(), 0x7289DA);
            } catch (e) {
                return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
            }
        } else {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.serverstats.serverRequired"));
        }
    }
}
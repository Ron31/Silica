module.exports = {
    name: "command.list.name",
    description: "command.list.description",
    usage: "command.list.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        let compare = (a, b) => {
            if (a.position > b.position) return -1;
            if (a.position < b.position) return 1;
            return 0;
        }

        let items = ["roles", "emojis", "channels"]

        if (args.join(" ") !== "") {
            if (!items.includes(args.join(" "))) {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.list.validItem"));
            }
            if (args.join(" ") === "roles") {
                return Embeds.uni(message.channel, message.guild.roles.cache.sort(compare).map(roles => roles).join(",\n").substr(0, 2000), (await client.string(message.guild.id, "command.list.roles")).replace("$roles", message.guild.roles.cache.size), "", "", "", 0x7289DA);
            } else if (args.join(" ") === "emojis") {
                return Embeds.uni(message.channel, message.guild.emojis.cache.sort(compare).map(emojis => emojis).join("").substr(0, 2000), (await client.string(message.guild.id, "command.list.emojis")).replace("$emojis", message.guild.emojis.cache.size), "", "", "", 0x7289DA);
            } else if (args.join(" ") === "channels") {
                return Embeds.uni(message.channel, message.guild.channels.cache.sort(compare).map(channels => channels).join(",\n").substr(0, 2000), (await client.string(message.guild.id, "command.list.channels")).replace("$channels", message.guild.channels.cache.size), "", "", "", 0x7289DA);
            }
        } else {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.list.validItem"));
        }
    }
}
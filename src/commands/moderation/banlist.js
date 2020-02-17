module.exports = {
    name: "command.banlist.name",
    description: "command.banlist.description",
    usage: "command.banlist.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        let compare = (a, b) => {
            if (a.position > b.position) return -1;
            if (a.position < b.position) return 1;
            return 0;
        }

        if (message.guild.me.hasPermission("BAN_MEMBERS")) {
            if (message.member.hasPermission("BAN_MEMBERS") || message.author.id === client.config.owner) {
                try {
                    message.guild.fetchBans().then(async banned => {
                        let list = banned.sort(compare).map(user => user.tag).join("\n");

                        if (list.length >= 1950) {
                            list = `${list.slice(0, 1948)}...`
                        }
                        return Embeds.uni(message.channel, list, (await client.string(message.guild.id, "command.banlist.list")).replace("$users", banned.size), "", "", "", 0x7289DA);
                    });
                } catch (e) {
                    return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
                }
            } else {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.banlist.permsErrorUser"));
            }
        } else {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.banlist.permsErrorBot"));
        }
    }
}
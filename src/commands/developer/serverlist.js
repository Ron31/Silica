module.exports = {
    name: "command.serverlist.name",
    description: "command.serverlist.description",
    usage: "command.serverlist.usage",
    args: true,
    dm: true,
    owner: true,
    cooldown: 2,
    async execute(message, args, client, Embeds) {
        let compare = (a, b) => {
            if (a.position > b.position) return -1;
            if (a.position < b.position) return 1;
            return 0;
        }
        return Embeds.success(message.channel, client.guilds.sort(compare).map(server => `\`\`${server.name}\`\`\n`).join("\n").substr(0, 2000), await client.string(message.guild.id, "command.serverlist.currentServers") + client.guilds.cache.size);
    }
}
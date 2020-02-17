module.exports = {
    name: "command.invite.name",
    description: "command.invite.description",
    usage: "command.invite.usage",
    args: true,
    dm: true,
    owner: true,
    cooldown: 2,
    async execute(message, args, client, Embeds) {
        if (message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) {
            if (args.join(" ") !== "") {
                try {
                    client.guilds.get(client.guilds.find(server => server.name === args.join(" ")).id).channels.filter(channels => channels.type == "text").first().createInvite().then(invite => {
                        return Embeds.success(message.channel, invite.url);
                    });
                } catch (e) {
                    return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
                }
            } else {
                return Embeds.notice(message.channel, await client.string(message.guild.id, "command.invite.serverRequired"));
            }
        } else {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.invite.permsErrorBot"));
        }
    }
}
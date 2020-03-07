module.exports = {
    name: "command.kick.name",
    description: "command.kick.description",
    usage: "command.kick.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ");

        try {
            if (message.guild.me.hasPermission("KICK_MEMBERS")) {
                if (message.member.hasPermission("KICK_MEMBERS") || message.author.id === client.config.owner) {
                    if (!args.join(" ")) {
                        return Embeds.notice(message.channel, await client.string(message.guild.id, "command.kick.userRequired"));
                    }
                    if (!target) {
                        return Embeds.error(message.channel, await client.string(message.guild.id, "command.kick.userNotExist"))
                    }
                    if (!target.kickable) {
                        return Embeds.error(message.channel, await client.string(message.guild.id, "command.kick.notKickable"))
                    }
                    if (target.id === client.config.owner) {
                        return Embeds.error(message.channel, await client.string(message.guild.id, "command.kick.notKickable"))
                    }
                    if (target) {
                        if (reason) {
                            target.kick(reason);
                            return Embeds.success(message.channel, (await client.string(message.guild.id, "command.kick.kicked")).replace("$user", `${target.user.tag} [${target.user}]`));
                        } else {
                            target.kick("No reason provided");
                            return Embeds.success(message.channel, (await client.string(message.guild.id, "command.kick.kicked")).replace("$user", `${target.user.tag} [${target.user}]`));
                        }
                    }
                } else {
                    return Embeds.error(message.channel, await client.string(message.guild.id, "command.kick.permsErrorUser"));
                }
            } else {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.kick.permsErrorBot"));
            }
        } catch (e) {
            return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
        }
    }
}
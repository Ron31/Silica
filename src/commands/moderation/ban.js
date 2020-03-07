module.exports = {
    name: "command.ban.name",
    description: "command.ban.description",
    usage: "command.ban.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ");

        try {
            if (message.guild.me.hasPermission("BAN_MEMBERS")) {
                if (message.member.hasPermission("BAN_MEMBERS") || message.author.id === client.config.owner) {
                    if (!args.join(" ")) {
                        return Embeds.notice(message.channel, await client.string(message.guild.id, "command.ban.userRequired"));
                    }
                    if (!target) {
                        return Embeds.error(message.channel, await client.string(message.guild.id, "command.ban.userNotExist"))
                    }
                    if (!target.bannable) {
                        return Embeds.error(message.channel, await client.string(message.guild.id, "command.ban.notBannable"))
                    }
                    if (target.id === client.config.owner) {
                        return Embeds.error(message.channel, await client.string(message.guild.id, "command.ban.notBannable"))
                    }
                    if (target) {
                        if (reason) {
                            target.ban(reason);
                            return Embeds.success(message.channel, (await client.string(message.guild.id, "command.ban.banned")).replace("$user", `${target.user.tag} [${target.user}]`));
                        } else {
                            target.ban("No reason provided");
                            return Embeds.success(message.channel, (await client.string(message.guild.id, "command.ban.banned")).replace("$user", `${target.user.tag} [${target.user}]`));
                        }
                    }
                } else {
                    return Embeds.error(message.channel, await client.string(message.guild.id, "command.ban.permsErrorUser"));
                }
            } else {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.ban.permsErrorBot"));
            }
        } catch (e) {
            return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
        }
    }
}
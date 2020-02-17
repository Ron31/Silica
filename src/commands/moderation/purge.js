module.exports = {
    name: "command.purge.name",
    description: "command.purge.description",
    usage: "command.purge.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            if (message.member.hasPermission("MANAGE_MESSAGES") || message.author.id === client.config.owner) {
                if (!args[0]) {
                    return Embeds.notice(message.channel, await client.string(message.guild.id, "command.purge.numberRequired"));
                }
                if (isNaN(args[0]) || args[0].includes("-")) {
                    return Embeds.notice(message.channel, await client.string(message.guild.id, "command.purge.NaN"));
                }
                let deleteCount = parseInt(args[0]);
                if (deleteCount > 99) {
                    return Embeds.notice(message.channel, await client.string(message.guild.id, "command.purge.numberLength"));
                }
                let deletedMessages = await message.channel.bulkDelete(deleteCount + 1).catch(e => {
                    return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
                });
                let deleted = await Embeds.success(message.channel, (await client.string(message.guild.id, "command.purge.deleted")).replace("$messages", deletedMessages.size - 1));
                setTimeout(async () => {
                    deleted.delete();
                }, 2000);
            } else {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.purge.permsErrorUser"));
            }
        } else {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.purge.permsErrorBot"));
        }
    }
}
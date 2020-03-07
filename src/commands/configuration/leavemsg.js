module.exports = {
    name: "command.leavemsg.name",
    description: "command.leavemsg.description",
    usage: "command.leavemsg.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        if (message.member.hasPermission("MANAGE_GUILD") || message.author.id === client.config.owner) {
            client.con.query("SELECT * FROM settings WHERE guildid = ?", [message.guild.id], async (e, r) => {
                if (!args[0]) {
                    if (r[0] && r[0].leavechannelid != null) {
                        let contents = [
                            [
                                await client.string(message.guild.id, "command.leavemsg.currentChannel"),
                                message.guild.channels.cache.get(r[0].leavechannelid),
                                true
                            ],
                            [
                                await client.string(message.guild.id, "command.leavemsg.currentMessage"),
                                r[0].leavemessage,
                                true
                            ]
                        ]
                        return Embeds.uni(message.channel, "", "", contents, "", "", 0x7289DA);
                    } else {
                        return Embeds.notice(message.channel, await client.string(message.guild.id, "command.leavemsg.channelRequired"));
                    }
                }
                if (args[0] == "delete") {
                    if (!r[0]) {
                        client.con.query("INSERT INTO settings(guildid, roleid, joinchannelid, joinmessage, leavechannelid, leavemessage) VALUES (?, null, null, null, null, null)", [message.guild.id, channel.id, leavemsg]);
                        return Embeds.success(message.channel, await client.string(message.guild.id, "command.leavemsg.Deleted"));
                    } else {
                        client.con.query("UPDATE settings SET leavechannelid = null, leavemessage = null WHERE guildid = ?", [message.guild.id]);
                        return Embeds.success(message.channel, await client.string(message.guild.id, "command.leavemsg.Deleted"));
                    }
                }
                let leavemsg = "";
                let channel = message.guild.channels.cache.find(channel => channel.name === args[0]) || message.guild.channels.cache.get(args[0]);
                if (!channel) {
                    return Embeds.error(message.channel, await client.string(message.guild.id, "command.leavemsg.channelNotExist"));
                }
                args.shift();
                if (args[0]) {
                    leavemsg = args.join(" ");
                } else if (args[0] == "reset") {
                    leavemsg = await client.string(message.guild.id, "command.leavemsg.message.default");
                } else {
                    leavemsg = "{user} left {guild}";
                }
                if (!r[0]) {
                    client.con.query("INSERT INTO settings(guildid, roleid, leavechannelid, leavemessage, joinchannelid, joinmessage) VALUES (?, null, ?, ?, null, null)", [message.guild.id, channel.id, leavemsg]);
                    return Embeds.success(message.channel, (await client.string(message.guild.id, "command.leavemsg.messageSet")).replace("$channel", channel));
                } else {
                    client.con.query("UPDATE settings SET leavechannelid = ?, leavemessage = ? WHERE guildid = ?", [channel.id, leavemsg, message.guild.id]);
                    return Embeds.success(message.channel, (await client.string(message.guild.id, "command.leavemsg.messageSet")).replace("$channel", channel));
                }
            });
        }
    }
}
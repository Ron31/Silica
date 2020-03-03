module.exports = {
    name: "command.joinmsg.name",
    description: "command.joinmsg.description",
    usage: "command.joinmsg.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        if (message.member.hasPermission("MANAGE_GUILD") || message.author.id === client.config.owner) {
            client.con.query("SELECT * FROM settings WHERE guildid = ?", [message.guild.id], async (e, r) => {
                if (!args[0]) {
                    if (r[0] && r[0].joinchannelid != null) {
                        let contents = [
                            [
                                await client.string(message.guild.id, "command.joinmsg.currentChannel"),
                                message.guild.channels.get(r[0].joinchannelid),
                                true
                            ],
                            [
                                await client.string(message.guild.id, "command.joinmsg.currentMessage"),
                                r[0].joinmessage,
                                true
                            ]
                        ]
                        return Embeds.uni(message.channel, "", "", contents, "", "", 0x7289DA);
                    } else {
                        return Embeds.notice(message.channel, await client.string(message.guild.id, "command.joinmsg.channelRequired"));
                    }
                }
                if (args[0] == "delete") {
                    if (!r[0]) {
                        client.con.query("INSERT INTO settings(guildid, roleid, joinchannelid, joinmessage, leavechannelid, leavemessage) VALUES (?, null, null, null, null, null)", [message.guild.id, channel.id, joinmsg]);
                        return Embeds.success(message.channel, await client.string(message.guild.id, "command.joinmsg.Deleted"));
                    } else {
                        client.con.query("UPDATE settings SET joinchannelid = null, joinmessage = null WHERE guildid = ?", [message.guild.id]);
                        return Embeds.success(message.channel, await client.string(message.guild.id, "command.joinmsg.Deleted"));
                    }
                }
                let joinmsg = "";
                let channel = message.guild.channels.find(channel => channel.name === args[0]) || message.guild.channels.get(args[0]);
                if (!channel) {
                    return Embeds.error(message.channel, await client.string(message.guild.id, "command.joinmsg.channelNotExist"));
                }
                args.shift();
                if (args[0]) {
                    joinmsg = args.join(" ");
                } else if (args[0] == "reset") {
                    joinmsg = await client.string(message.guild.id, "command.joinmsg.message.default");
                } else {
                    joinmsg = await client.string(message.guild.id, "command.joinmsg.message.default");
                }
                if (!r[0]) {
                    client.con.query("INSERT INTO settings(guildid, roleid, joinchannelid, joinmessage, leavechannelid, leavemessage) VALUES (?, null, ?, ?, null, null)", [message.guild.id, channel.id, joinmsg]);
                    return Embeds.success(message.channel, (await client.string(message.guild.id, "command.joinmsg.messageSet")).replace("$channel", channel));
                } else {
                    client.con.query("UPDATE settings SET joinchannelid = ?, joinmessage = ? WHERE guildid = ?", [channel.id, joinmsg, message.guild.id]);
                    return Embeds.success(message.channel, (await client.string(message.guild.id, "command.joinmsg.messageSet")).replace("$channel", channel));
                }
            });
        } else {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.joinmsg.permsErrorUser"));
        }
    }
}
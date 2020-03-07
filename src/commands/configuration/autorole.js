module.exports = {
    name: "command.autorole.name",
    description: "command.autorole.description",
    usage: "command.autorole.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        if (message.guild.me.hasPermission("MANAGE_ROLES")) {
            if (message.member.hasPermission("MANAGE_GUILD") || message.author.id === client.config.owner) {
                client.con.query("SELECT * FROM settings WHERE guildid = ?", [message.guild.id], async (e, r) => {
                    let role = message.guild.roles.cache.find(role => role.name === args.join(" ")) || message.guild.roles.cache.get(args[0]);

                    if (e) {
                        return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
                    }
                    if (args.join(" ") == "") {
                        if (r.length == 1) {
                            if (r[0].roleid == null) {
                                return Embeds.notice(message.channel, await client.string(message.guild.id, "command.autorole.roleRequired"));
                            }
                            return Embeds.success(message.channel, (await client.string(message.guild.id, "command.autorole.currentRole")).replace("$autorole", message.guild.roles.cache.get(r[0].roleid)));
                        } else {
                            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.autorole.roleRequired"));
                        }
                    }
                    if (r.length == 0) {
                        if (!role) {
                            return Embeds.error(message.channel, await client.string(message.guild.id, "command.autorole.roleNotExist"));
                        }
                        if (role) {
                            client.con.query("INSERT INTO settings(guildid, roleid, joinchannelid, joinmessage, leavechannelid, leavemessage) VALUES (?, ?, null, null, null, null)", [message.guild.id, role.id]);
                            return Embeds.success(message.channel, (await client.string(message.guild.id, "command.autorole.roleSet")).replace("$autorole", message.guild.roles.cache.get(r[0].roleid)));
                        }
                    } else if (args[0] == "delete") {
                        client.con.query("UPDATE settings SET roleid = ? WHERE guildid = ?", [null, message.guild.id]);
                        return Embeds.success(message.channel, await client.string(message.guild.id, "command.autorole.roleDeleted"));
                    } else if (r[0]) {
                        client.con.query("UPDATE settings SET roleid = ? WHERE guildid = ?", [role.id, message.guild.id]);
                        return Embeds.success(message.channel, (await client.string(message.guild.id, "command.autorole.roleSet")).replace("$autorole", message.guild.roles.cache.get(r[0].roleid)));
                    }
                });
            } else {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.autorole.permsErrorUser"));
            }
        } else {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.autorole.permsErrorBot"));
        }
    }
}
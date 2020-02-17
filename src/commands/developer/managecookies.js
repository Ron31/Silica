module.exports = {
    name: "command.managecookies.name",
    description: "command.managecookies.description",
    usage: "command.managecookies.usage",
    args: true,
    dm: false,
    owner: true,
    cooldown: 2,
    async execute(message, args, client, Embeds) {
        let target = message.mentions.members.first() || message.guild.members.get(args[0]);
        let option = args[1];
        let newCookies = parseInt(args[2]);

        if (!target) {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.managecookies.userRequired"));
        }
        client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [target.id], async (e, r) => {
            if (e) {
                return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
            }
            if (r.length == 1) {
                if (!option) {
                    return Embeds.notice(message.channel, await client.string(message.guild.id, "command.managecookies.validOption"));
                }
                if (!newCookies) {
                    return Embeds.notice(message.channel, await client.string(message.guild.id, "command.managecookies.validAmount"));
                }
                if (isNaN(args[2])) {
                    return Embeds.notice(message.channel, await client.string(message.guild.id, "command.managecookies.validAmount"));
                }
                if (args[1] == "-") {
                    client.con.query("UPDATE users SET cookies = ? WHERE userid = ?", [r[0].cookies - newCookies, target.id]);
                    return Embeds.success(message.channel, await client.string(message.guild.id, "command.managecookies.setCookies")).replace("$user", target.user.tag);
                } else {
                    client.con.query("UPDATE users SET cookies = ? WHERE userid = ?", [r[0].cookies + newCookies, target.id]);
                    return Embeds.success(message.channel, await client.string(message.guild.id, "command.managecookies.setCookies")).replace("$user", target.user.tag);
                }
            } else {
                if (target.user.bot == true) {
                    return Embeds.error(message.channel, await client.string(message.guild.id, "command.managecookies.isBot"));
                } else {
                    client.con.query("INSERT INTO users(userid, cookies) VALUES(?, ?)", [target.id, newCookies]);
                }
            }
        });
    }
}
module.exports = {
    name: "command.givecookies.name",
    description: "command.givecookies.description",
    usage: "command.givecookies.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let newCookies = parseInt(args[1]);

        client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [message.author.id], async (e1, r1) => {
            if (e1) {
                return Embeds.error(message.channel, "\`\`\`js\n" + e1 + "\`\`\`");
            }
            if (r1.length == 1) {
                if (!target) {
                    return Embeds.notice(message.channel, await client.string(message.guild.id, "command.givecookies.userRequired"));
                }
                if (target.user.bot == true) {
                    return Embeds.error(message.channel, await client.string(message.guild.id, "command.givecookies.isBot"));
                }
                if (target == message.member) {
                    return Embeds.error(message.channel, await client.string(message.guild.id, "command.givecookies.isUser"));
                }
                if (!newCookies) {
                    return Embeds.error(message.channel, await client.string(message.guild.id, "command.givecookies.cookiesRequired"));
                }
                if (isNaN(args[1]) || args[1].includes("-")) {
                    return Embeds.error(message.channel, await client.string(message.guild.id, "command.givecookies.cookiesRequired"));
                }
                if (r1[0].cookies < newCookies) {
                    return Embeds.error(message.channel, await client.string(message.guild.id, "command.givecookies.cookiesError"));
                } else {
                    client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [target.id], async (e2, r2) => {
                        if (e2) {
                            return Embeds.error(message.channel, "\`\`\`js\n" + e2 + "\`\`\`");
                        }
                        if (r2.length == 1) {
                            client.con.query("UPDATE users SET cookies = ? WHERE userid = ?", [r1[0].cookies - newCookies, message.author.id]);
                            client.con.query("UPDATE users SET cookies = ? WHERE userid = ?", [r2[0].cookies + newCookies, target.id]);
                            return Embeds.success(message.channel, (await client.string(message.guild.id, "command.givecookies.cookiesTransfered")).replace("$user", target.user.tag).replace("$cookies", newCookies).replace("$author", message.member.user.tag));
                        } else {
                            client.con.query("UPDATE users SET cookies = ? WHERE userid = ?", [r1[0].cookies - newCookies, message.author.id]);
                            client.con.query("INSERT INTO users(userid, cookies) VALUES(?, ?)", [target.id, newCookies]);
                            return Embeds.success(message.channel, (await client.string(message.guild.id, "command.givecookies.cookiesTransfered")).replace("$user", target.user.tag).replace("$cookies", newCookies).replace("$author", message.member.user.tag));
                        }
                    });
                }
            } else {
                client.con.query("INSERT INTO users(userid, cookies) VALUES(?, ?)", [message.author.id, 0]);
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.givecookies.cookiesError"));
            }
        });
    }
}
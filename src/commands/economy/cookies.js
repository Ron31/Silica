module.exports = {
    name: "command.cookies.name",
    description: "command.cookies.description",
    usage: "command.cookies.usage",
    args: true,
    dm: true,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        let target = (message.channel.type == "dm") ? message.author : (message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member).user;

        if (target.bot == true) {
            return Embeds.error(message.channel, "I can't register Bots");
        }

        client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [target.id], async (e, r) => {
            if (e) {
                return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
            }
            if (r.length == 1) {
                return Embeds.success(message.channel, (await client.string(message.guild.id, "command.cookies.currentCookies")).replace("$user", target.tag).replace("$cookies", r[0].cookies));
            } else {
                client.con.query("INSERT INTO users(userid, cookies) VALUES(?, ?)", [target.id, 0]);
                client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [target.id], async (e, r) => {
                    return Embeds.success(message.channel, await client.string(message.guild.id, "command.cookies.currentCookies") + `${target.tag}: ${r[0].cookies} :cookie:`);
                });
            }
        });
    }
}
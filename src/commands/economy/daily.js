module.exports = {
    name: "command.daily.name",
    description: "command.daily.description",
    usage: "command.daily.usage",
    args: true,
    dm: true,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        let newCookies = 50 + Math.round(Math.random() * 50);

        function addCookies(addedCookies) {
            client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [message.author.id], async (e, r) => {
                if (e) {
                    return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
                }
                if (r.length == 1) {
                    client.con.query("UPDATE users SET cookies = ? WHERE userid = ?", [r[0].cookies + addedCookies, message.author.id]);
                    return Embeds.success(message.channel, (await client.string(message.guild.id, "command.daily.getReward")).replace("$cookies", addedCookies));
                } else {
                    client.con.query("INSERT INTO users(userid, cookies) VALUES (?, ?)", [message.author.id, addedCookies]);
                    return Embeds.success(message.channel, (await client.string(message.guild.id, "command.daily.getReward")).replace("$cookies", addedCookies));
                }
            });
        }

        client.con.query("SELECT * FROM cooldowns WHERE userid = ? LIMIT 1;", [message.author.id], async (e, r) => {
            if (e) {
                return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
            }
            if (r.length == 1) {
                let dateFromDatabase = r[0].datedaily;
                let difference = new Date() - dateFromDatabase;

                if (difference <= 86400000) {
                    let timeLeft;
                    let differenceDate = new Date(86400000 - difference)
                    if (differenceDate.getUTCHours() == 0) {
                        timeLeft = differenceDate.getUTCMinutes() + "m " + differenceDate.getUTCSeconds() + "s ";
                    } else {
                        timeLeft = differenceDate.getUTCHours() + "h " + differenceDate.getUTCMinutes() + "m " + differenceDate.getUTCSeconds() + "s ";
                    }
                    return Embeds.error(message.channel, (await client.string(message.guild.id, "command.daily.claimedReward")).replace("$timeleft", timeLeft));
                } else {
                    client.con.query("UPDATE cooldowns SET datedaily = ? WHERE userid = ?", [new Date(), message.author.id]);
                    return addCookies(newCookies);
                }
            } else {
                client.con.query("INSERT INTO cooldowns(userid, datedaily) VALUES(?, ?)", [message.author.id, new Date()]);
                return addCookies(newCookies);
            }
        });
    }
}
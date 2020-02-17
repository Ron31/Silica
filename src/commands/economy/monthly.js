module.exports = {
    name: "command.monthly.name",
    description: "command.monthly.description",
    usage: "command.monthly.usage",
    args: true,
    dm: true,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        let newCookies = 500 + Math.round(Math.random() * 500);

        function addCookies(addedCookies) {
            client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [message.author.id], async (e, r) => {
                if (e) {
                    return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
                }
                if (r.length == 1) {
                    client.con.query("UPDATE users SET cookies = ? WHERE userid = ?", [r[0].cookies + addedCookies, message.author.id]);
                    return Embeds.success(message.channel, (await client.string(message.guild.id, "command.monthly.getReward")).replace("$cookies", addedCookies));
                } else {
                    client.con.query("INSERT INTO users(userid, cookies) VALUES (?, ?)", [message.author.id, addedCookies]);
                    return Embeds.success(message.channel, (await client.string(message.guild.id, "command.monthly.getReward")).replace("$cookies", addedCookies));
                }
            });
        }

        client.con.query("SELECT * FROM cooldowns WHERE userid = ? LIMIT 1;", [message.author.id], async (e, r) => {
            if (e) {
                return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
            }
            if (r.length == 1) {
                let dateFromDatabase = r[0].datemonthly;
                let difference = new Date() - dateFromDatabase;

                if (difference <= 2628000000) {
                    let timeLeft;
                    let differenceDate = new Date(2628000000 - difference)
                    if (differenceDate.getUTCDate() - 1 == 0) {
                        timeLeft = differenceDate.getUTCHours() + "h " + differenceDate.getUTCMinutes() + " m " + differenceDate.getUTCSeconds() + "s ";
                    } else if (differenceDate.getUTCHours() == 0) {
                        timeLeft = differenceDate.getUTCMinutes() + "m " + differenceDate.getUTCSeconds() + "s ";
                    } else {
                        timeLeft = differenceDate.getUTCDate() - 1 + "d "  + differenceDate.getUTCHours() + "h " + differenceDate.getUTCMinutes() + "m " + differenceDate.getUTCSeconds() + "s ";
                    }
                    return Embeds.error(message.channel, (await client.string(message.guild.id, "command.monthly.claimedReward")).replace("$timeleft", timeLeft));
                } else {
                    client.con.query("UPDATE cooldowns SET datemonthly = ? WHERE userid = ?", [new Date(), message.author.id]);
                    return addCookies(newCookies);
                }
            } else {
                client.con.query("INSERT INTO cooldowns(userid, datemonthly) VALUES(?, ?)", [message.author.id, new Date()]);
                return addCookies(newCookies);
            }
        });
    }
}
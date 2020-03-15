module.exports = {
    name: "command.leaderboard.name",
    description: "command.leaderboard.description",
    usage: "command.leaderboard.usage",
    args: true,
    dm: true,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        client.con.query("SELECT userid, cookies FROM users ORDER BY cookies DESC LIMIT 10;", [], async (e, r) => {
            let list = "";
            for (let result of r) {
                let user = await client.users.cache.find(i => i.id === result.userid);
                if (user) {
                    list += `${user.tag}: \`\`${result.cookies} 🍪\`\`\n`
                } else {
                    list += `Unknown#0000: \`\`${result.cookies} 🍪\`\`\n`
                }
            }
            if (e) {
                return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
            }
            return Embeds.uni(message.channel, list, (await client.string(message.guild.id, "command.leaderboard.title")), "", "", "", 0x7289DA);
        });
    }
}
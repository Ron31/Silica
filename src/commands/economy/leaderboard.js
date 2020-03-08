module.exports = {
    name: "command.leaderboard.name",
    description: "command.leaderboard.description",
    usage: "command.leaderboard.usage",
    args: true,
    dm: true,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        client.con.query("SELECT userid, cookies FROM users ORDER BY cookies DESC LIMIT 10;", [], async (e, r) => {
            if (e) {
                return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
            }
            return Embeds.uni(message.channel, `${r.map(u => `${client.users.cache.find(i => i.id === u.userid).tag}: ` + `\`\`${u.cookies} 🍪\`\``).join(`\n`)}`, (await client.string(message.guild.id, "command.leaderboard.title")), "", "", "", 0x7289DA);
        });
    }
}
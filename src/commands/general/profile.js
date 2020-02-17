module.exports = {
    name: "command.profile.name",
    description: "command.profile.description",
    usage: "command.profile.usage",
    args: true,
    dm: true,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        let target = (message.channel.type == "dm") ? message.author : (message.mentions.members.first() || message.guild.members.get(args[0]) || message.member).user;

        if (target.bot == true) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.profile.isBot"));
        }

        client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [target.id], async (e, r) => {
            if (e) {
                Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
            }
            if (r.length == 1) {
                let contents = [
                    [
                        `${client.emojis.get("660226455451598858")} Switch Friendcode`,
                        r[0].switchfc,
                        true
                    ],
                    [
                        `${client.emojis.get("660226454763732994")} BattleTag`,
                        r[0].battletag,
                        true
                    ],
                    [
                        `${client.emojis.get("660474442610114589")} Steam Username`,
                        r[0].steam,
                        true
                    ]
                ]
                return Embeds.uni(message.channel, r[0].description, target.tag, contents, "", target.avatarURL, r[0].color);
            } else {
                client.con.query("INSERT INTO users(userid) VALUES (?)", [target.id]);
                client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [target.id], async (e, r) => {
                    if (e) {
                        Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
                    }
                    let contents = [
                        [
                            `${client.emojis.get("660226455451598858")} Switch Friendcode`,
                            r[0].switchfc,
                            true
                        ],
                        [
                            `${client.emojis.get("660226454763732994")} BattleTag`,
                            r[0].battletag,
                            true
                        ],
                        [
                            `${client.emojis.get("660474442610114589")} Steam Username`,
                            r[0].steam,
                            true
                        ]
                    ]
                    return Embeds.uni(message.channel, r[0].description, target.tag, contents, "", target.avatarURL, r[0].color);
                });
            }
        });
    }
}
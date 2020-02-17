module.exports = {
    name: "command.language.name",
    description: "command.language.description",
    usage: "command.language.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        if (message.member.hasPermission("MANAGE_GUILD") || message.author.id === client.config.owner) {
            client.con.query("SELECT * FROM languages WHERE guildid = ?", [message.guild.id], async (e, r) => {

                let languages = ["en_us", "de_de"];

                if (e) {
                    return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
                }
                if (!languages.includes(args[0])) {
                    return Embeds.error(message.channel, await client.string(message.guild.id, "command.language.validLang"));
                }
                if (r[0]) {
                    client.con.query("UPDATE languages SET lang = ? WHERE guildid = ?", [args[0], message.guild.id]);
                    return Embeds.success(message.channel, (await client.string(message.guild.id, "command.language.set")).replace("$lang", args[0]));
                } else {
                    client.con.query("INSERT INTO languages(guildid, lang) VALUES(?, ?)", [message.guild.id, args[0]]);
                    return Embeds.success(message.channel, (await client.string(message.guild.id, "command.language.set")).replace("$lang", args[0]));
                }
            })
        } else {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.language.permsErrorUser"));
        }
    }
}
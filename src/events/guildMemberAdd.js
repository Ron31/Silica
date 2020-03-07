module.exports = async (client, member) => {
    const Embeds = require("../struct/Embed.js");

    client.con.query("SELECT * FROM settings WHERE guildid = ?", [member.guild.id], (e, r) => {
        if (!r[0] || r[0].joinchannelid == null) {
            return;
        } else {
            member.guild.channels.cache.get(r[0].joinchannelid).send(r[0].joinmessage.replace("{user}", `${member.user.tag} [${member}]`).replace("{guild}", member.guild.name));
        }
    });
    client.con.query("SELECT * FROM settings WHERE guildid = ?", [member.guild.id], (e, r) => {
        if (r.length == 0) {
            return;
        } else {
            member.roles.add(r[0].roleid).catch(e => {
                let owner = member.guild.owner;
                return Embeds.uni(owner, `I cannot add the role you set as autorole\nPlease give me a role that's higher than the autorole you've set`, "", "", "", 0xE74C3C);
            });
        }
    });
}
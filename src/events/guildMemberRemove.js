module.exports = async (client, member) => {
    client.con.query("SELECT * FROM settings WHERE guildid = ?", [member.guild.id], (e, r) => {
        if (!r[0] || r[0].leavechannelid == null) {
            return;
        } else {
            member.guild.channels.get(r[0].leavechannelid).send(r[0].leavemessage.replace("{user}", `${member.user.tag} [${member}]`).replace("{guild}", member.guild.name));
        }
    });
}
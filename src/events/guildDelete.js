module.exports = async (client, guild) => {
    const Embeds = require("../struct/Embed.js");

    let channel = client.channels.get("676179617362739227");
    let ServerIcon = "";

    if (guild.iconURL) {
        ServerIcon = guild.iconURL;
    }

    let contents = [
        [
            "Name",
            guild.name,
            true
        ],
        [
            "ID",
            guild.id,
            true
        ],
        [
            "Owner",
            guild.owner.user.tag,
            true
        ],
        [
            "Members",
            guild.members.size,
            true
        ],
        [
            "New Membercount",
            client.users.size,
            true
        ],
        [
            "New Servercount",
            client.guilds.size,
            true
        ]
    ]
    return Embeds.uni(channel, "Left Server", `${client.user.username} Logs`, contents, "", ServerIcon, 0xFF0000);
}
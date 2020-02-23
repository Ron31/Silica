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
    Embeds.uni(channel, "Joined Server", `${client.user.username} Logs`, contents, "", ServerIcon, 0x00FF00);


   return Embeds.uni(guild.channels.filter(channels => channels.type == "text").first(), `${client.user.username} is a bot made by ${client.users.get(client.config.owner).username}\nFor a list of all commands use \`\`s+help\`\`\n\nIf you want to change the language, then use the s+language command`, `${client.user.username} has been successfully added to this server`);
}
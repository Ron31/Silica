module.exports = {
    name: "command.serverinfo.name",
    description: "command.serverinfo.description",
    usage: "command.serverinfo.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds, Vars) {
        const moment = require("moment");

        let compare = (a, b) => {
            if (a.position > b.position) return -1;
            if (a.position < b.position) return 1;
            return 0;
        }

        let UserGotColor = "";
        let EmojisOnServer = "";
        let ServerIcon = "";
        let IconForEmbed = "";
        let SplashIcon = "";

        if (message.member.roles.highest.color == 0x000000) {
            UserGotColor = 0x7289DA;
        } else {
            UserGotColor = message.member.roles.highest.color;
        }
        if (message.guild.emojis.size > 0) {
            EmojisOnServer = message.guild.emojis.sort(compare).map(emojis => emojis).join("").substr(0, 1000);
        } else {
            EmojisOnServer = await client.string(message.guild.id, "command.serverinfo.noEmojis");
        }
        if (message.guild.iconURL()) {
            ServerIcon = message.guild.iconURL();
        }
        if (message.guild.iconURL()) {
            IconForEmbed = message.guild.iconURL();
        } else {
            IconForEmbed = await client.string(message.guild.id, "command.serverinfo.noServerIcon");
        }
        if (message.guild.splashURL()) {
            SplashIcon = message.guild.splashURL();
        } else {
            SplashIcon = await client.string(message.guild.id, "command.serverinfo.noSplashIcon");
        }

        let contents = [
            [
                await client.string(message.guild.id, "command.serverinfo.id"),
                message.guild.id,
                true
            ],
            [
                await client.string(message.guild.id, "command.serverinfo.owner"),
                message.guild.owner.user.tag,
                true
            ],
            [
                await client.string(message.guild.id, "command.serverinfo.verification"),
                message.guild.verificationLevel,
                true
            ],
            [
                await client.string(message.guild.id, "command.serverinfo.members"),
                message.guild.members.cache.size,
                true
            ],
            [
                await client.string(message.guild.id, "command.serverinfo.humans"),
                message.guild.members.cache.filter(members => !members.user.bot).size,
                true
            ],
            [
                await client.string(message.guild.id, "command.serverinfo.bots"),
                message.guild.members.cache.filter(members => members.user.bot).size,
                true
            ],
            [
                await client.string(message.guild.id, "command.serverinfo.textChannels"),
                message.guild.channels.cache.filter(channels => channels.type == "text").size,
                true
            ],
            [
                await client.string(message.guild.id, "command.serverinfo.voiceChannels"),
                message.guild.channels.cache.filter(channels => channels.type == "voice").size,
                true
            ],
            [
                await client.string(message.guild.id, "command.serverinfo.region"),
                message.guild.region,
                true
            ],
            [
                await client.string(message.guild.id, "command.serverinfo.createdAt"),
                moment(message.guild.createdAt).format("dddd, Do MMMM YYYY, HH:mm:ss"),
                false
            ],
            [
                await client.string(message.guild.id, "command.serverinfo.roles"),
                message.guild.roles.cache.sort(compare).map(roles => roles).join(", ").substr(0, 1000),
                false
            ],
            [
                await client.string(message.guild.id, "command.serverinfo.emojis"),
                EmojisOnServer,
                false
            ],
            [
                await client.string(message.guild.id, "command.serverinfo.iconURL"),
                IconForEmbed,
                false
            ],
            [
                await client.string(message.guild.id, "command.serverinfo.splashURL"),
                SplashIcon,
                false
            ]
        ]
        return Embeds.uni(message.channel, "", message.guild.name, contents, "", ServerIcon, UserGotColor);
    }
}